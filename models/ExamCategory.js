const mongoose = require("mongoose");

const examCategorySchema = new mongoose.Schema({
  examType: {
    type: String,
    required: true,
  },
  examIcon: {
    type: String,
    required: true,
  },
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestChoices",
    },
  ],
}).set('strictPopulate', false);;

const Exam = mongoose.model("ExamCategory",examCategorySchema);
module.exports = Exam;
