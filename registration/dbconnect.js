const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://langravy:Helloworld123@ac-otg1r4w-shard-00-00.ocrxxns.mongodb.net:27017,ac-otg1r4w-shard-00-01.ocrxxns.mongodb.net:27017,ac-otg1r4w-shard-00-02.ocrxxns.mongodb.net:27017/cloud_native?ssl=true&replicaSet=atlas-1b8oyd-shard-0&authSource=admin&appName=MongoDBCluster');
    console.log('Registration Service: MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
