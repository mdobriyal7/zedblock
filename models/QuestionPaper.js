const mongoose = require('mongoose');



const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);

module.exports = QuestionPaper;
