require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const clear = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    console.log('🗑️  Cleared all projects. Your portfolio is now empty and ready for your own projects!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Clear failed:', error.message);
    process.exit(1);
  }
};

clear();
