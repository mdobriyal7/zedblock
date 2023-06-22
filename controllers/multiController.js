const express = require("express");
const router = express.Router();
const Exam = require("../models/ExamCategory");
const Phases = require("../models/ExamPhases");
const Test = require("../models/TestChoices");
const Section = require("../models/SectionSchema");

const createMockDetails = async (req, res) => {
  try {
    const { examType, testType, paperType, sections } = req.body;
    const examIconPath =
      req.files && req.files["examIcon"] ? req.files["examIcon"][0].path : "";
    const testIconPath =
      req.files && req.files["testIcon"] ? req.files["testIcon"][0].path : "";

    // Check if all required fields exist
    if (!examType || !testType || !paperType || !sections) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find or create ExamCategory
    let exam = await Exam.findOne({ examType }).populate({
      path: "tests",
      populate: {
        path: "phases",
        populate: {
          path: "uniqueSectionID",
        },
      },
    });

    if (!exam) {
      // Create new ExamCategory if not found
      exam = await Exam.create({ examType, examIcon: examIconPath });
    }

    let test = exam.tests.find((t) => t.name === testType);
    if (!test) {
      // Create new TestChoices if not found
      test = await Test.create({ name: testType, testIcon: testIconPath });
    }

    let phase = test.phases.find((p) => p.name === paperType);
    if (!phase) {
      // Create new ExamPhases if not found
      phase = await Phases.create({ name: paperType });
    }

    const createdSections = [];

    for (const sectionData of sections) {
      if (sectionData.name) {
        let existingSection = null;

        const sectionArray = await Section.findById(phase.uniqueSectionID);
        console.log(sectionArray);
        if (sectionArray) {
          existingSection = sectionArray.sections.find(
            (section) => section.name === sectionData.name
          );
        }

        if (existingSection) {
          existingSection.duration = sectionData.duration;
          existingSection.negativeMarking = sectionData.negativeMarking;
          existingSection.noOfQuestions = sectionData.noOfQuestions;
          existingSection.noOfOptions = sectionData.noOfOptions;
          await sectionArray.save();
        } else if (!existingSection && phase.uniqueSectionID) {
          sectionArray.sections.push(sectionData);
          await sectionArray.save();
        } else {
          const newSection = await Section.create({ sections: [sectionData] });
          phase.uniqueSectionID = newSection._id;
          await newSection.save();
          createdSections.push(newSection);
        }
      }
    }

    // Save the phase
    await phase.save();

    // Save the test
    await test.save();

    // Save the exam
    await exam.save();

    res.status(201).json({ message: "Mock test created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create mock test" });
  }
};



const getAllMockDetails = async (req, res) => {
  try {
    const exams = await Exam.find({})
      .populate({
        path: "tests",
        populate: {
          path: "phases",
          populate: {
            path: "uniqueSectionID",
          },
        },
      });

    
    res.status(200).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve mock details" });
  }
};


module.exports = { createMockDetails, getAllMockDetails };
