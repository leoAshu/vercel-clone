import { exec } from 'child_process'
import { join } from 'path'
import cfg from './cfg'
import { downloadS3Folder } from './aws'

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

export { buildProject, downloadS3Folder, cfg }
