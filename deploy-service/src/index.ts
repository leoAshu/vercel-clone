import { commandOptions, createClient } from 'redis'
import { buildProject, downloadS3Folder, cfg, copyFinalDist } from './utils'

const subscriber = createClient()
subscriber.connect()

const publisher = createClient()
publisher.connect()

const main = async () => {
    while (1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            cfg.REDIS_KEY,
            0
        )

        const uid = response?.element

        if (uid) {
            await downloadS3Folder(`${cfg.R2_ROOT_FOLDER}/${uid}`)

            await buildProject(uid)

            await copyFinalDist(uid)

            publisher.hSet(cfg.REDIS_DB_KEY, uid, 1)
        }
    }
}

main()
