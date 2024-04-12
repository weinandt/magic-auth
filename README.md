# magic-auth
Simplest possible webserver and webpage which can do maglic link based auth.

## Set Up
1. Modify `/etc/hosts` file to have `example.com` point to `127.0.0.1`
2. Optional generate certs (certs are generated and checked in):

```bash
openssl req -new -newkey rsa:4096 -days 9999 -nodes -x509 \
  -subj "/C=US/O=Example Inc./CN=example.com" \
  -keyout key.pem -out cert.pem
```
3. Navigate to https://example.com
    - If in chrome type "thisisunsafe" and press enter.