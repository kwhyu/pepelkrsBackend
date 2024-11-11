const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

router.get('/', mahasiswaController.getAllMahasiswa);
router.get('/:nim/krs', mahasiswaController.getMahasiswaKRS);

module.exports = router;
