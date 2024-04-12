import https from 'node:https'
import fs from 'node:fs'
import * as auth from './auth/auth.js'

const options = {
    key: fs.readFileSync('httpsCerts/key.pem'),
    cert: fs.readFileSync('httpsCerts/cert.pem'),
};

https.createServer(options, (req, res) => {
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
    if (req.url == '/signin') {
        // TODO: Add the magic auth here (email verification).
        res.writeHead(200, {
            'Set-Cookie': [`${auth.tokenCookieName}=myUserId;`],
        })

        // TODO: populate actual user data.
        const jsonContent = JSON.stringify({
            userId: 'myUserId',
            userEmail: 'test@test.com'
        });
        res.end(jsonContent);

        return
    }

    const user = auth.getUserFromCookie(req.headers?.cookie)
    if (user == null) {
        res.setHeader("Content-Type", "text");
        res.writeHead(401); // not found
        res.end(`401 Please sign in`)

        return
    }


    if (req.url.startsWith('/api')) {
        // TODO: Add the apis here.
    }

    res.setHeader("Content-Type", "text");
    res.writeHead(404); // not found
    res.end(`404 Not Found: ${req.url}`)


}).listen(443); 