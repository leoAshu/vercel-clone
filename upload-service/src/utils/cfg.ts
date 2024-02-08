import dotenv from 'dotenv'
dotenv.config()

const cfg = {
    PORT: process.env.PORT || 3000,
    ID_LENGTH: Number(process.env.ID_LENGTH) || 5,
    ID_CHARS: process.env.ID_CHARS || '123456789abcdefghijklmnopqrstuvwxyz',
}

export default cfg
