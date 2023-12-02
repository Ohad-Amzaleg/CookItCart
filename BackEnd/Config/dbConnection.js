const mongoose = require('mongoose');

const dbConnect=()=>{
mongoose.connect('mongodb://localhost:27017/CookItCart')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));
}
module.exports = {dbConnect};