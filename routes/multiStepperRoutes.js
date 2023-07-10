const express = require("express");
const router = express.Router();
const mockController = require("../controllers/multiController");
const verifyJWT = require("../middleware/verifyJWT");
const parser = require("../middleware/uploadImage");


router.post(
  "/",
  parser.fields([
    { name: "examIcon", maxCount: 1 },
    { name: "testIcon", maxCount: 1 },
  ]),
  mockController.createMockDetails
);

router.get("/", mockController.getAllMockDetails);


module.exports = router;
