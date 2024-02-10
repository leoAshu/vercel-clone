import dotenv from 'dotenv'
dotenv.config()

const cfg = {
    PORT: process.env.PORT || 3001,

    R2_ROOT_FOLDER: process.env.R2_ROOT_FOLDER || 'output',
    R2_BUCKET: process.env.R2_BUCKET || '',
    R2_ID: process.env.R2_ID,
    R2_SECRET: process.env.R2_SECRET,
    R2_ENDPOINT: process.env.R2_ENDPOINT,
}

export default cfg
