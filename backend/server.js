require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const usersRoutes = require('./routes/users');

const app = express();

// Увеличение лимита на загрузку аватаров/фонов
app.use(bodyParser.json({ limit: '2mb' }));

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
