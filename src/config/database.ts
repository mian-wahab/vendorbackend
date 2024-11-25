import mongoose from 'mongoose';
const dbConnector = async () => {
    try {
        console.log('Connecting to Mongo DB......');
        await mongoose.connect(process?.env?.MONGO_URI as string, {
            // We can add more option here if we needed
        });
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log(error?.message);
        console.log('Database connection failed');
    }
}

export default dbConnector;