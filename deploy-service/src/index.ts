import { commandOptions, createClient } from 'redis'
import { buildProject, downloadS3Folder, cfg } from './utils'

const subscriber = createClient()
subscriber.connect()

const main = async () => {
    while (1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            cfg.REDIS_KEY,
            0
        )

        const uid = response?.element

        await downloadS3Folder(`${cfg.R2_ROOT_FOLDER}/${uid}`)

        await buildProject(uid || '')
    }
}

main()
