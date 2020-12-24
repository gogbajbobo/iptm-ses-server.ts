import fs from 'fs'
import path from 'path'

import morgan from 'morgan'
import { createLogger, transports, format } from 'winston'
import 'winston-daily-rotate-file'

import { isProduction } from './helper'


const logDirectory = path.join(__dirname, '../../logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${ timestamp } [${ level }]: ${ message }`;
})

const consoleLogger = new transports.Console({
    level: 'silly',
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
        myFormat
    )
})

const dailyRotateFileLogger = new transports.DailyRotateFile({
    dirname: `${ logDirectory }`,
    filename: `IMT-SES-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    json: false
})

const loggerTransports = isProduction
    ? [dailyRotateFileLogger]
    : [dailyRotateFileLogger, consoleLogger]

export const log = createLogger({
    level: 'silly',
    transports: loggerTransports
})

export const requestLogger = morgan('dev')
