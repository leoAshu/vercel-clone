import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'
import { resolve } from 'path'

import { cfg, generateUID, getAllFiles } from './utils'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/deploy', async (req, res) => {
    const uid = generateUID()
    const repoUrl = req.body.repoUrl
    const outPath = resolve(__dirname, 'output', uid)

    await simpleGit().clone(repoUrl, outPath)

    const files = getAllFiles(outPath)
    files.forEach((file) => {})

    res.status(200).json({ uid })
})

app.listen(cfg.PORT)
