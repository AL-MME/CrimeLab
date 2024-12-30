const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crimeLab';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
    maxPoolSize: 10
};

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, options);
        console.log('✅ MongoDB connection successful');

        mongoose.connection.on('error', (err: any) => {
            console.error('❌ MongoDB Connection Error :', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB Disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('✅ MongoDB disconnected through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};
