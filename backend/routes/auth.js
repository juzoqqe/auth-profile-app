const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey123';

// Регистрация
router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Пользователь уже существует' });

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashed, username });
        await newUser.save();
        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

// Логин
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Неверный email или пароль' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Вход успешен', token });
});

module.exports = router;
