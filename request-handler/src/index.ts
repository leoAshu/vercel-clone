import express from 'express'
import cfg from './cfg'

const app = express()

app.get('/*', (req, res) => {
    const host = req.hostname
    const id = host.split('.')[0]

    const filePath = req.path
})

app.listen(cfg.PORT)
