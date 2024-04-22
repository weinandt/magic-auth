import jwt, { JwtPayload } from "jsonwebtoken"

export const tokenCookieName = 'token'

// TODO: move this into the config.
const signingKey = 'asdkjfl;askjdf;alkfsj;alsjfd;lsfj;lasj'

async function verifyAndDecodeToken(token: string): Promise<JwtPayload | null> {
    const verifyPromise = new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, signingKey, (err, decoded) => {
            if (err != null) {
                reject(err)
                return
            }

            resolve(<JwtPayload>decoded)
        })
    })
    
    try {
        const decodedToken = await verifyPromise
        return decodedToken
    }
    catch(err) {
        console.log('error decoding token', err)
        return null
    }
}

function getAuthTokenFromCookie(cookieHeaderValue: string | null) {
    if (cookieHeaderValue == null || cookieHeaderValue == '') {
        return ''
    }

    const cookies = cookieHeaderValue.split(';')
    for (const cookie of cookies) {
        const cookiePart = cookie.split('=')
        if (cookiePart.length != 2) {
            return
        }
        if (cookiePart[0].trim() == tokenCookieName) {
            return cookiePart[1].trim()
        }
    }

    return ''
}

// TODO: move this to a shared area.
export type User = {
    userName: string
    userEmail: string
}
function parseUserFromDecodedToken(decodedToken: JwtPayload): User {
    return {
        userName: decodedToken.userName,
        userEmail: decodedToken.userEmail,
    }
}

export async function getUserFromCookie(cookieHeaderValue: string | null): Promise<User | null> {
    const token = getAuthTokenFromCookie(cookieHeaderValue)
    if (token == null || token == '') {
        return null
    }

    const decodedToken = await verifyAndDecodeToken(token)
    if (decodedToken == null) {
        return null
    }

    return parseUserFromDecodedToken(decodedToken)
}

export function createJWTForUser(user: User){
    // TODO: make this asymentric encrption
    return jwt.sign(user, signingKey)
}
