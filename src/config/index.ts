import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your port
     */
    port: parseInt(process.env.PORT || '', 10),

    /**
     * That long string to database
     */
    databaseURL: process.env.MONGODB_URI || '',

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || 'secret',

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'tiny',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
