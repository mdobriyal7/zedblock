const mongoose = require("mongoose");
const { Schema } = mongoose;

const examCategorySchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "TestChoices",
    },
  ],
}).set('strictPopulate', false);;

const Exam = mongoose.model("ExamCategory",examCategorySchema);
module.exports = Exam;
