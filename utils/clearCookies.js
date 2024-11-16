export function clearTokenCookies(res) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('userJwt', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        expires: new Date(0),
    });
}