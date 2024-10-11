import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {type:String ,required:true},
  options: [{type:String ,required:true}],
  answer: {type:String ,required:true},
})

const quizSchema = new mongoose.Schema({
  title:{type:String,required:true},
  questions: [questionSchema],
})

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz",quizSchema);