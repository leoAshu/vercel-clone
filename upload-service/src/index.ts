import express from 'express'
import cors from 'cors'
import cfg from './cfg'

const app = express()

app.use(cors())

app.listen(cfg.PORT)
