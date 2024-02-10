import dotenv from 'dotenv'
dotenv.config()

const cfg = {
    PORT: process.env.PORT || 3001,
}

export default cfg
