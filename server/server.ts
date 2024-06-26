import https from 'node:https'
import fs from 'node:fs'
import * as auth from './auth/auth'
import express from 'express'

const options = {
    key: fs.readFileSync('httpsCerts/key.pem'),
    cert: fs.readFileSync('httpsCerts/cert.pem'),
};

const app = express()

app.get('/', (req, res, next) => {
    res.writeHead(200)
    fs.createReadStream('front-end/index.html').pipe(res)
})

app.get('/signout', (req, res, next) => {
    res.writeHead(200, {
        'Set-Cookie': [`${auth.tokenCookieName}=signedOut; Max-Age=0;`],
    })

    res.end()
})

app.use(express.json())

app.post('/signin', (req, res, next) => {
    const email = req?.body?.email
    if (email == null) {
        res.status(400).send(`Email is required to authenticate`)
        return
    }

    // TODO: send to SNS and have user click magic link
    const jwt = auth.createJWTForUser({
        userName: 'tempUserName', // TODO: read this from a db.
        userEmail: email,
    })
    res.writeHead(200, {
        'Set-Cookie': [`${auth.tokenCookieName}=${jwt};path=/`],
    })

    res.end()
})

app.get('/user', async (req, res, next) => {
    const user = await auth.getUserFromCookie(req.headers?.cookie ?? null)
    if (user == null) {
        res.writeHead(401)
        res.end(`401 Please sign in`)

        return
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    const jsonContent = JSON.stringify(user);
    res.end(jsonContent)
})

const httpsServer = https.createServer(options, app)
httpsServer.listen(443, () => {
    console.log('Server started on 443')
})