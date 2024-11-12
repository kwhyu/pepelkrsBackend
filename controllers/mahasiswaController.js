// const db = require('../config/db');

// exports.getAllMahasiswa = async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT m.nim, m.nama, m.jenis_kelamin, AVG(k.nilai) as ipk
//       FROM mahasiswa m
//       LEFT JOIN krs k ON m.nim = k.nim
//       GROUP BY m.nim
//     `);
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getMahasiswaKRS = async (req, res) => {
//   const { nim } = req.params;
//   try {
//     const [krs] = await db.query(`
//       SELECT tahun, semester, idMatakuliah, nilai, parameterNilai
//       FROM krs WHERE nim = ?
//     `, [nim]);

//     const [ips_ipk] = await db.query(`
//       SELECT
//         AVG(CASE WHEN semester = 1 THEN nilai END) as ips1,
//         AVG(CASE WHEN semester = 2 THEN nilai END) as ips2,
//         AVG(nilai) as ipk
//       FROM krs WHERE nim = ?
//       GROUP BY nim
//     `, [nim]);

//     res.json({ krs, ips_ipk });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const db = require("../config/db");

// Mengambil semua data mahasiswa beserta IPK mereka dari tabel ips_ipk
exports.getAllMahasiswa = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.nim, m.nama, m.jenis_kelamin, i.ipk
      FROM mahasiswa m
      LEFT JOIN (
        SELECT nim, MAX(ipk) AS ipk FROM ips_ipk GROUP BY nim
      ) i ON m.nim = i.nim
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengambil KRS mahasiswa berdasarkan NIM dan menampilkan IPS per semester dan IPK dari tabel ips_ipk
// exports.getMahasiswaKRS = async (req, res) => {
//   const { nim } = req.params;
//   try {
//     // Mengambil data KRS mahasiswa
//     const [krs] = await db.query(`
//       SELECT tahun, semester, idMatakuliah, nilai, parameterNilai
//       FROM krs WHERE nim = ?
//     `, [nim]);

//     // Mengambil IPS per semester dan IPK dari tabel ips_ipk
//     const [ips_ipk] = await db.query(`
//       SELECT semester, ips, ipk
//       FROM ips_ipk WHERE nim = ?
//       ORDER BY tahun, semester
//     `, [nim]);

//     res.json({ krs, ips_ipk });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getMahasiswaKRS = async (req, res) => {
  const { nim } = req.params;
  try {
    // Mengambil data KRS mahasiswa dengan join ke tabel matakuliah untuk mendapatkan namaMatakuliah
    const [krs] = await db.query(
      `
      SELECT k.tahun, k.semester, k.idMatakuliah, m.namaMatakuliah, k.nilai, k.parameterNilai
      FROM krs k
      LEFT JOIN matakuliah m ON k.idMatakuliah = m.idMatakuliah
      WHERE k.nim = ?
    `,
      [nim]
    );

    // Mengambil IPS per semester dan IPK dari tabel ips_ipk
    const [ips_ipk] = await db.query(
      `
      SELECT semester, ips, ipk
      FROM ips_ipk WHERE nim = ?
      ORDER BY tahun, semester
    `,
      [nim]
    );

    const krsWithNullDefaults = krs.map((row) => ({
      tahun: row.tahun || null,
      semester: row.semester || null,
      idMatakuliah: row.idMatakuliah || null,
      namaMatakuliah: row.namaMatakuliah || null,
      nilai: row.nilai || null,
      parameterNilai: row.parameterNilai || null,
    }));

    const ipsIpkWithNullDefaults = ips_ipk.length
      ? ips_ipk
      : [{ semester: null, ips: null, ipk: null }];

    res.json({ krs: krsWithNullDefaults, ips_ipk: ipsIpkWithNullDefaults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
