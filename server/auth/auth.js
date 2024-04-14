export const tokenCookieName = 'token'

function isTokenValid(token) {
    // TODO: implement jwt here.
    return true
}

function getAuthTokenFromCookie(cookieHeaderValue) {
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

function parseUserFromToken(token) {
    // TODO: actually read user info from the jwt.
    return {
        userId: 1234,
        userEmail: 'test@test.com',
    }
}

export function getUserFromCookie(cookieHeaderValue) {
    const token = getAuthTokenFromCookie(cookieHeaderValue)
    if (token == '') {
        return null
    }

    if (!isTokenValid(token)) {
        return null
    }

    return parseUserFromToken(token)
}
