const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;
const connectionParams = {
	useUnifiedTopology: true,
};

const dbConnect = () => {
	console.log(connectionString);
	mongoose
		.connect(connectionString, connectionParams)
		.then(() => console.log('Connected to MongoDB...'))
		.catch(err => {
			console.log(err);
			console.error('Could not connect to MongoDB...');
		});
};
module.exports = { dbConnect };
