import dotenv from 'dotenv'
dotenv.config()

const cfg = {
    REDIS_KEY: process.env.REDIS_KEY || 'build-queue',
}

export default cfg
