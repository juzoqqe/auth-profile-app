const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB подключена ✅'))
.catch(err => console.log('Ошибка подключения к MongoDB:', err));

module.exports = mongoose;
