import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'

import { cfg, generateUID } from './utils'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/deploy', async (req, res) => {
    const uid = generateUID()
    const repoUrl = req.body.repoUrl

    await simpleGit().clone(repoUrl, `./output/${uid}`)

    res.status(200).json({ uid })
})

app.listen(cfg.PORT)
