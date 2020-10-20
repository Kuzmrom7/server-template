import { logFailed } from './logger';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    logFailed('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((e: Error) => {
        console.error('Connection error', e.message);
    });

export default mongoose.connection;
