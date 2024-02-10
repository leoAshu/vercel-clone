import { commandOptions, createClient } from 'redis'
import { downloadS3Folder } from './utils/aws'
import cfg from './utils/cfg'

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
    }
}

main()
