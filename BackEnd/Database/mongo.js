const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CookItCart')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

const usersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const users = mongoose.model('users', usersSchema);

module.exports = users;