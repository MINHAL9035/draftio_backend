import jwt from 'jsonwebtoken';
export const generateToken =(res,userId,tokenName)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(tokenName,token,{
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? 'none' : 'strict',
        maxAge:24 * 60 * 60 * 1000
    })
}