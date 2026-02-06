const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey123';

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

// Поиск пользователей
router.get('/search', auth, async (req, res) => {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i');
    const users = await User.find({ $or: [{ username: regex }, { email: regex }] })
                            .select('username email avatar description background')
                            .limit(10);
    res.json(users);
});

module.exports = router;
