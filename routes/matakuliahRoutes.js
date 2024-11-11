const express = require('express');
const router = express.Router();
const matakuliahController = require('../controllers/matakuliahController');

router.get('/semester/:semester', matakuliahController.getMatakuliahBySemester);

module.exports = router;
