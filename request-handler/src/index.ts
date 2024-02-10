import express from 'express'
import { S3 } from 'aws-sdk'
import cfg from './cfg'

const app = express()

const s3 = new S3({
    accessKeyId: cfg.R2_ID,
    secretAccessKey: cfg.R2_SECRET,
    endpoint: cfg.R2_ENDPOINT,
})

app.get('/*', async (req, res) => {
    const host = req.hostname

    const id = host.split('.')[0]

    const filePath = req.path === '/' ? '/index.html' : req.path

    const contents = await s3
        .getObject({
            Bucket: cfg.R2_BUCKET,
            Key: `dist/${id}${filePath}`,
        })
        .promise()

    const type = filePath.endsWith('html')
        ? 'text/html'
        : filePath.endsWith('css')
        ? 'text/css'
        : 'application/javascript'

    res.set('Content-Type', type)
    res.send(contents.Body)
})

app.listen(cfg.PORT)
