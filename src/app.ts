import 'reflect-metadata'
import { createConnection } from 'typeorm'

import express from 'express'


createConnection()
    .then(async connection => {

        console.log(`database connected at ${ new Date() }: ${ connection.name }`)

        const app = express()
        const PORT = 8000
        app.get(
            '/',
            (req, res) => {
                return res.send('Express + TypeScript Server new')
            }
        )
        app.get(
            '/v',
            (req, res) => {
                return res.send('1.0.0')
            }
        )
        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
        })

    })
    .catch(error => console.log('TypeORM connection error: ', error));
