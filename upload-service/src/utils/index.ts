import cfg from './cfg'

const generateUID = () => {
    let id = ''

    for (let i = 0; i < cfg.ID_LENGTH; i++) {
        id += cfg.ID_CHARS[Math.floor(Math.random() * cfg.ID_CHARS.length)]
    }

    return id
}

export { cfg, generateUID }
