const express = require('express');
const router = express.Router();
const mockController = require('../controllers/multiController');
const verifyJWT = require('../middleware/verifyJWT');
const upload = require('../multerConfig');


router.post('/',verifyJWT,upload.fields([{ name: 'examIcon', maxCount: 1 }, { name: 'testIcon', maxCount: 1 }]), mockController.createMockDetails);

module.exports = router;
