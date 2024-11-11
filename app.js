require('dotenv').config();
const express = require('express');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const matakuliahRoutes = require('./routes/matakuliahRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Root Route
app.get('/', (req, res) => {
  res.send('Selamat Datang');
});

// Register routes
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/matakuliah', matakuliahRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
require('dotenv').config();
const express = require('express');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const matakuliahRoutes = require('./routes/matakuliahRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Root Route
app.get('/', (req, res) => {
  res.send('Selamat Datang');
});

// Register routes
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/matakuliah', matakuliahRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
