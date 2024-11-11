// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Root Route
router.get('/', (req, res) => {
    res.send("Welcom");
});

// GET all  and their GPA
router.get('/mahasiswa', (req, res) => {
    const query = `SELECT nim, nama, AVG(nilai) as ipk FROM mahasiswa LEFT JOIN krs ON mahasiswa.nim = krs.nim GROUP BY mahasiswa.nim;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET student KRS data by NIM, including GPA and semester GPA
router.get('/mahasiswa/:nim/krs', (req, res) => {
    const nim = req.params.nim;
    const query = `
        SELECT krs.tahun, krs.semester, krs.nilai, krs.idMatakuliah, m.namaMatakuliah
        FROM krs
        JOIN matakuliah m ON krs.idMatakuliah = m.idMatakuliah
        WHERE krs.nim = ?;
    `;
    db.query(query, [nim], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET courses by semester
router.get('/matakuliah/semester/:semester', (req, res) => {
    const semester = req.params.semester;
    const query = `SELECT * FROM matakuliah WHERE semesterMatakuliah = ?`;
    db.query(query, [semester], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
