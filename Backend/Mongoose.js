const mongoose = require('mongoose');
// Connect to MongoDB
const connectToMongo = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;