import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question
  const [check,setCheck] = useState([false,false,false,false])

  
  const next = () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    const countScore = async () => {
      const { data } = await instance.post('/checkAns', { params: { ans } });
      setScore(data.score);
    }
    if(current_question < contents.length - 1){
      setCurrentQuestion(current_question + 1);
      setCheck([false, false, false, false]);
    }
    else if(current_question == contents.length - 1){
      countScore();
      setComplete(true);
    }
  }
    

  const choose = (e) => {
    // TODO : update 'ans' for the option you clicked
    const tmp = e.target.id.split("q");
    const a = tmp[1].split("_");
    const q = parseInt(a[0]);
    const op = parseInt(a[1]);
    const arr = ans;
    arr[q - 1] = op;
    setAns(arr);
    let ifcheck = [];
    for(let i = 0; i < 4; i++){
      ifcheck[i] = (op === (i + 1))? true : false;
    }
    setCheck(ifcheck);

  }

  const getQuestions = () => {

    const temp = async () => {
      const {data} = await instance.get('/getContents')
      setContents(data.contents);

    } 
    temp();
    // TODO : get ques'tions from backend
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {contents[current_question].questionID} of {contents.length}
            </div>
          </div>

      {complete? (<div id="question-title">Your score:{score}/{contents.length}</div>):(<div id="question-title">
            {contents[current_question].question}
          </div>)
        }

          { complete ? (<div></div>):(<div id="options">
          <div className="each-option" >
          <input type="radio" onChange={choose} checked={check[0]} id = {`q${current_question + 1}_1`}/> <span>{contents[current_question].options[0]}</span>
          </div>
          <div className="each-option" >
          <input type="radio" onChange={choose} checked={check[1]} id = {`q${current_question + 1}_2`}/> <span>{contents[current_question].options[1]}</span>
          </div>
          <div className="each-option">
          <input type="radio" onChange={choose} checked={check[2]} id = {`q${current_question + 1}_3`}/> <span>{contents[current_question].options[2]}</span>
          </div>
          <div className="each-option">
          <input type="radio" onChange={choose} checked={check[3]} id = {`q${current_question + 1}_4`}/> <span>{contents[current_question].options[3]}</span>
          </div>
          </div>)
          }
          
         {complete ? (<div></div>):
          (<div id="actions" onClick={next}>
            NEXT
          </div>)
        }
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )

}

export default Question
