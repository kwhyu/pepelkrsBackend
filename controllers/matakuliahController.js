const db = require('../config/db');

// Mendapatkan mata kuliah berdasarkan semester
exports.getMatakuliahBySemester = async (req, res) => {
  const { semester } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT idMatakuliah, namaMatakuliah, bobotSks
      FROM matakuliah WHERE semesterMatakuliah = ?
    `, [semester]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
