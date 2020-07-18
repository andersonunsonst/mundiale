const winston = require('winston')
const colorizer = winston.format.colorize()
const logger = winston.createLogger({
    'format': winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf(msg => `${colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}:`)} ${msg.message}`)
    ),
    'transports': [
        new winston.transports.Console({ level: process.env.LEVEL }),
        new winston.transports.File({ filename: `${process.env.FILE_PATH_LOG}/error.log`, level: 'error' })
    ]
})

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const MAGENTA = '\x1b[35m'
const CYAN = '\x1b[36m'
const WHITE = '\x1b[37m'
const RESET_COLOR = '\x1b[0m'
const BRIGHT = '\x1b[1m'

class LogService {
    static warn(message) {
        logger.warn(`${YELLOW}${message}${RESET_COLOR}`)
    }

    static info(message) {
        logger.info(`${WHITE}${message}${RESET_COLOR}`)
    }

    static http(message) {
        logger.http(`${WHITE}${message}${RESET_COLOR}`)
    }

    static debug(message) {
        logger.debug(`${WHITE}${message}${RESET_COLOR}`)
    }

    static err(error) {
        logger.error(`${RED}${error}${RESET_COLOR}`)
    }

    static get red() {
        return RED
    }

    static get green() {
        return GREEN
    }

    static get yellow() {
        return YELLOW
    }

    static get magenta() {
        return MAGENTA
    }

    static get cyan() {
        return CYAN
    }

    static get white() {
        return WHITE
    }

    static get resetColor() {
        return RESET_COLOR
    }

    static get bright() {
        return BRIGHT
    }
}

module.exports = LogService
