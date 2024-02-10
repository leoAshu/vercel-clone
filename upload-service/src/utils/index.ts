import cfg from './cfg'
import fs from 'fs'
import { resolve, normalize } from 'path'
import { uploadFile } from './aws'

const generateUID = () => {
    let id = ''

    for (let i = 0; i < cfg.ID_LENGTH; i++) {
        id += cfg.ID_CHARS[Math.floor(Math.random() * cfg.ID_CHARS.length)]
    }

    return id
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

export { cfg, generateUID, getAllFiles, uploadFile }
