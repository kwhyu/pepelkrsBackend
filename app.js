require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const matakuliahRoutes = require('./routes/matakuliahRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://pepelkrs-production.up.railway.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.send('Selamat Datang OIOIIOIOIOIOIOIOI');
});

// Register routes
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/matakuliah', matakuliahRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
