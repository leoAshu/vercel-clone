import { exec } from 'child_process'
import { join, resolve, normalize } from 'path'
import { downloadS3Folder, uploadFile } from './aws'
import fs from 'fs'
import cfg from './cfg'

const buildProject = (uid: string) => {
    return new Promise((resolve) => {
        const child = exec(
            `cd ${join(
                __dirname,
                '..',
                cfg.R2_ROOT_FOLDER,
                uid
            )} && npm install && npm run build`
        )

        child.stdout?.on('data', (data) => {
            console.log('stdout: ' + data)
        })

        child.stderr?.on('data', (data) => {
            console.log('stderr: ' + data)
        })

        child.on('close', (code) => {
            resolve('')
        })
    })
}

const copyFinalDist = async (uid: string) => {
    const folderPath = join(__dirname, '..', cfg.R2_ROOT_FOLDER, uid, 'dist')
    const allFiles = getAllFiles(folderPath)
    await Promise.all(
        allFiles.map(async (file) => {
            await uploadFile(
                `dist/${uid}/` + file.slice(folderPath.length + 1),
                file
            )
        })
    )
}

const getAllFiles = (folderPath: string) => {
    let allFiles: string[] = []

    try {
        const allFilesAndFolders = fs.readdirSync(folderPath)

        allFilesAndFolders.forEach((file) => {
            let fullFilePath = resolve(folderPath, file)
            if (fs.statSync(fullFilePath).isDirectory()) {
                allFiles = allFiles.concat(getAllFiles(fullFilePath))
            } else {
                fullFilePath = normalize(fullFilePath)
                fullFilePath = fullFilePath.replace(/\\/g, '/')
                allFiles.push(fullFilePath)
            }
        })

        return allFiles
    } catch (err) {
        console.log(err)
        return []
    }
}

export { buildProject, downloadS3Folder, getAllFiles, copyFinalDist, cfg }
