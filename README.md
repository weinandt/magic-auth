# magic-auth
Simplest possible webserver and webpage which can do maglic link based auth.

## Set Up
1. Modify `/etc/hosts` file to have `example.com` point to `127.0.0.1`
2. Optional: generate certs (certs are already generated and checked into source (not recommended for prod use))

```bash
openssl req -new -newkey rsa:4096 -days 9999 -nodes -x509 \
  -subj "/C=US/O=Example Inc./CN=example.com" \
  -keyout key.pem -out cert.pem
```
3. Navigate to https://example.com
    - If in chrome type "thisisunsafe" and press enter.


## TODO
- Proper dependency injection
- Super test integration tests.
  - 404 should be returned for unknown routes
- Strict typing shared with the front end.
- Actually call SNS
- Cut s2s tokens
- Asymetric auth.