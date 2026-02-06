const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey123';

// Middleware
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Нет токена' });
    const token = header.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Неверный токен' });
        req.userId = decoded.id;
        next();
    });
}

// Получить свой профиль
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user);
});

// Получить чужой профиль по ID
router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(user);
});

// Обновить профиль (username, description, avatar, background, theme)
router.put('/', auth, async (req, res) => {
    const { username, description, avatar, background, theme } = req.body;
    const update = { username, description, avatar, background, theme };
    await User.findByIdAndUpdate(req.userId, update, { new: true });
    res.json({ message: 'Профиль обновлён' });
});

module.exports = router;
