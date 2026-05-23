export const cookies = {
    getOptions: () => ({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60  * 1000  //15 minute
    }),
    // Set a cookie with default options + optional overrides
    set : (res, name, value, option = {}) => {
        res.cookie(name, value, {...cookies.getOptions(), ...option});
    },
    // Clear a cookie (must match the same options used when setting it)
    clear: (res, name, option = {}) => {
        res.clearCookie(name, {...cookies.getOptions(), ...option});
    },
    // Get cookie value from request
    get: (req, name) => {
        return req.cookies[name];
    }
}