import https from 'node:https'
import fs from 'node:fs'
import * as auth from './auth/auth.js'

const options = {
    key: fs.readFileSync('httpsCerts/key.pem'),
    cert: fs.readFileSync('httpsCerts/cert.pem'),
};

https.createServer(options, async (req, res) => {
    // Serve the main page, no need to check auth.
    if (req.url == '/' || req.url == '') {
        res.writeHead(200)
        fs.createReadStream('front-end/index.html').pipe(res)
        return
    }

    if (req.url == '/signout') {
        res.writeHead(200, {
            'Set-Cookie': [`${auth.tokenCookieName}=signedOut; Max-Age=0;`],
        })

        res.end()

        return
    }

    // No need to check the cookie on sign in.
    if (req.url.startsWith('/signin')) {
        // Grabbing the email from url.
        // This would typically be supplied in a payload, but I don't want to parse the body.
        const splits = req.url.split('/')
        if (splits.length != 3) {
            res.writeHead(401); // not found
            res.end(`401 No Email Supplied ${req.url}`)

            return
        }
        
        // TODO: send to SNS and have user click magic link

        const email = splits[2]
        const jwt = auth.createJWTForUser({
            userName: 'tempUserName', // TODO: read this from a db.
            userEmail: email,
        })
        res.writeHead(200, {
            'Set-Cookie': [`${auth.tokenCookieName}=${jwt};path=/`],
        })

        res.end()

        return
    }

    const user = await auth.getUserFromCookie(req.headers?.cookie)
    if (user == null) {
        res.writeHead(401)
        res.end(`401 Please sign in`)

        return
    }


    if (req.url.startsWith('/user')) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        })

        const jsonContent = JSON.stringify(user);
        res.end(jsonContent);

        return
    }

    res.setHeader("Content-Type", "text");
    res.writeHead(404); // not found
    res.end(`404 Not Found: ${req.url}`)
}).listen(443); 