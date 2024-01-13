const mongoose = require("mongoose");

const testSeriesSchema = new mongoose.Schema({
  referenceExamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamCategory",
  },
  referenceTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestChoices",
  },
  referencePhaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamPhases",
  },
  testSeriesName: {
    type: String,
  },
  testPapers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestPaper",
    },
  ],
}).set("strictPopulate", false);

const TestSeries = mongoose.model("TestSeries", testSeriesSchema);

module.exports = TestSeries;
