import cfg from './cfg'
import fs from 'fs'

const generateUID = () => {
    let id = ''

    for (let i = 0; i < cfg.ID_LENGTH; i++) {
        id += cfg.ID_CHARS[Math.floor(Math.random() * cfg.ID_CHARS.length)]
    }

    return id
}

const getAllFiles = (folderPath: string) => {
    try {
        const allFilesAndFolders = fs.readdirSync(folderPath)
        allFilesAndFolders.forEach((file) => {
            console.log(file)
        })
        return allFilesAndFolders
    } catch (err) {
        console.log(err)
        return []
    }
}

export { cfg, generateUID, getAllFiles }
