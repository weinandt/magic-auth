import https from 'node:https'
import fs from 'node:fs'

const options = {
    key: fs.readFileSync('httpsCerts/key.pem'),
    cert: fs.readFileSync('httpsCerts/cert.pem'),
};

https.createServer(options, (req, res) => {
    res.writeHead(200, {
        
            "Set-Cookie": "token=encryptedstring; HttpOnly",
            "Access-Control-Allow-Credentials": "true"
          
    })

    fs.createReadStream('front-end/index.html').pipe(res)
}).listen(443); 