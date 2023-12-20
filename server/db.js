const mongoose = require('mongoose');

const { URL } = require('./config');

const connectToDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`DB connection error: ${err}`);
  }
};

module.exports = connectToDb;