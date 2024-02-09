import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'
import { resolve } from 'path'

import { cfg, generateUID, getAllFiles } from './utils'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/:id', (req, res) => {
    const id = req.params.id
    const files = getAllFiles(resolve(__dirname, 'output', id))

    res.json({ files })
})

app.post('/deploy', async (req, res) => {
    const uid = generateUID()
    const repoUrl = req.body.repoUrl

    await simpleGit().clone(repoUrl, resolve(__dirname, 'output', uid))

    res.status(200).json({ uid })
})

app.listen(cfg.PORT)
