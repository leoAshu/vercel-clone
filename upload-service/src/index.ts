import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'
import { resolve } from 'path'

import { cfg, generateUID, getAllFiles, uploadFile } from './utils'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    const outPath = resolve(__dirname, cfg.R2_ROOT_FOLDER, 'icoju')
    const files = getAllFiles(outPath)
    res.status(200).json({ files })
})

app.post('/deploy', async (req, res) => {
    const uid = generateUID()
    const repoUrl = req.body.repoUrl
    const outPath = resolve(__dirname, cfg.R2_ROOT_FOLDER, uid)

    await simpleGit().clone(repoUrl, outPath)

    const files = getAllFiles(outPath)
    files.forEach(async (file) => {
        await uploadFile(file.slice(__dirname.length + 1), file)
    })

    res.status(200).json({ uid })
})

app.listen(cfg.PORT)
