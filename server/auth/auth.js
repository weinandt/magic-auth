export const tokenCookieName = 'token'

function isTokenValid(token) {
    return token == "nick"
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
