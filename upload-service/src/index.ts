import express from 'express'
import cors from 'cors'
import { cfg, generateUID } from './utils'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/deploy', (req, res) => {
    const repoUrl = req.body.repoUrl
    console.log(repoUrl)

    res.status(200).json({})
})

app.listen(cfg.PORT)
