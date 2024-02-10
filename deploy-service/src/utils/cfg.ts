import dotenv from 'dotenv'
dotenv.config()

const cfg = {
    REDIS_KEY: process.env.REDIS_KEY || 'build-queue',
    REDIS_DB_KEY: process.env.REDIS_DB_KEY || 'status',

    R2_ROOT_FOLDER: process.env.R2_ROOT_FOLDER || 'output',
    R2_BUCKET: process.env.R2_BUCKET || '',
    R2_ID: process.env.R2_ID,
    R2_SECRET: process.env.R2_SECRET,
    R2_ENDPOINT: process.env.R2_ENDPOINT,
}

export default cfg
