const mongoose = require("mongoose");
const { Schema } = mongoose;

const testChoicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  testIcon: {
    type: String,
    required: true,
  },
  phases: [
    {
      type: Schema.Types.ObjectId,
      ref: "ExamPhases",
    },
  ],
}).set('strictPopulate', false);;

const Test = mongoose.model("TestChoices", testChoicesSchema);
module.exports = Test;
