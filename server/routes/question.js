import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res1) => {
        if (err) throw err
      if (res1.length === 0) {
        console.log(1);
        res.status(403).send({message:"error", contents:[]})
      } else {
        //console.log(res1);
        res.status(200).send({message:'success',contents:res1})
      }
 })
  // Question.find({}, res1 => {
  //   console.log(res1)
  //   if (res1.length === 0) {
  //     console.log(1);
  //     res.status(403).send({message:"error", contents:[]})
  //   } else {
  //     console.log(2);
  //     res.status(200).send({message:'success',contents:res1})
  //   }
  // }

    //)
}

exports.CheckAns = async (req, res) => {
  let myans = req.body.params.ans
  console.log(myans)
  var correct = 0;
  Answer.find().sort({ _id: 1 }).exec((err,res1) => {
    if(err) throw err
    if(res1.length === 0) {
      res.status(403).send({message:"error", score: -1})
    } else {
      for (var i = 0 ; i < res1.length ; ++i) {
        if (myans[i] === res1[i].answer) {
          correct ++;
        }
      }
      res.status(200).send({message:'success',score:correct})
      console.log(correct)
      console.log(res1);
    }
    
  })
  //console.log(req.query.ans)
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
}
