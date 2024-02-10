import { S3 } from 'aws-sdk'
import fs from 'fs'
import cfg from './cfg'

const s3 = new S3({
    accessKeyId: cfg.R2_ID,
    secretAccessKey: cfg.R2_SECRET,
    endpoint: cfg.R2_ENDPOINT,
})

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath)
    await s3
        .upload({
            Body: fileContent,
            Bucket: cfg.R2_BUCKET,
            Key: fileName,
        })
        .promise()
}

export { uploadFile }
