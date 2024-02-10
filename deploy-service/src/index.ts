import { commandOptions, createClient } from 'redis'

const subscriber = createClient()
subscriber.connect()

const main = async () => {
    while (1) {
        const respnse = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
        )
    }
}
