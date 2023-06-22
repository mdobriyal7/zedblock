const mongoose = require("mongoose");
const { Schema } = mongoose;

const examPhasesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueSectionID: {  // Change from sectionArray to section
    type: Schema.Types.ObjectId,
    ref: "SectionArray",
  },
}).set('strictPopulate', false);

const ExamPhases = mongoose.model("ExamPhases", examPhasesSchema);
module.exports = ExamPhases;



