import { S3 } from 'aws-sdk'
import { join, dirname } from 'path'
import fs from 'fs'
import cfg from './cfg'

const s3 = new S3({
    accessKeyId: cfg.R2_ID,
    secretAccessKey: cfg.R2_SECRET,
    endpoint: cfg.R2_ENDPOINT,
})

const downloadS3Folder = async (prefix: string) => {
    const allFiles = await s3
        .listObjectsV2({
            Bucket: cfg.R2_BUCKET,
            Prefix: prefix,
        })
        .promise()

    const allPromises =
        allFiles.Contents?.map(async ({ Key }) => {
            return new Promise(async (resolve) => {
                if (!Key) {
                    resolve('')
                    return
                }

                const finalOutputPath = join(__dirname, '..', Key)
                const outputFile = fs.createWriteStream(finalOutputPath)
                const dirName = dirname(finalOutputPath)

                if (!fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: true })
                }

                s3.getObject({
                    Bucket: cfg.R2_BUCKET,
                    Key,
                })
                    .createReadStream()
                    .pipe(outputFile)
                    .on('finish', () => {
                        resolve('')
                    })
            })
        }) || []

    await Promise.all(allPromises?.filter((x) => x !== undefined))
}

export { downloadS3Folder }
