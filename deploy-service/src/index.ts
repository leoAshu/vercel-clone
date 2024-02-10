import { commandOptions, createClient } from 'redis'
import cfg from './cfg'

const subscriber = createClient()
subscriber.connect()

const main = async () => {
    while (1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            cfg.REDIS_KEY,
            0
        )
        console.log(response)
    }
}

main()
