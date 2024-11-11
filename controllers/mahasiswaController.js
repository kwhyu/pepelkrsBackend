const db = require('../config/db');

// Mendapatkan semua mahasiswa dan IPK-nya
exports.getAllMahasiswa = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.nim, m.nama, m.jenis_kelamin, AVG(k.nilai) as ipk
      FROM mahasiswa m
      LEFT JOIN krs k ON m.nim = k.nim
      GROUP BY m.nim
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan KRS dan IPS/IPK berdasarkan NIM mahasiswa
exports.getMahasiswaKRS = async (req, res) => {
  const { nim } = req.params;
  try {
    const [krs] = await db.query(`
      SELECT tahun, semester, idMatakuliah, nilai, parameterNilai
      FROM krs WHERE nim = ?
    `, [nim]);

    const [ips_ipk] = await db.query(`
      SELECT 
        AVG(CASE WHEN semester = 1 THEN nilai END) as ips1,
        AVG(CASE WHEN semester = 2 THEN nilai END) as ips2,
        AVG(nilai) as ipk
      FROM krs WHERE nim = ?
      GROUP BY nim
    `, [nim]);

    res.json({ krs, ips_ipk });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
