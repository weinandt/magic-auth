import https from 'node:https'
import fs from 'node:fs'
import express from 'express'

const options = {
    key: fs.readFileSync('httpsCerts/key.pem'),
    cert: fs.readFileSync('httpsCerts/cert.pem'),
};

const app = express()

app.get('/', (req, res, next) => {
    res.writeHead(200).end('hello')
})

const httpsServer = https.createServer(options, app)
httpsServer.listen(443, () => {
    console.log('Server started on 443')
})