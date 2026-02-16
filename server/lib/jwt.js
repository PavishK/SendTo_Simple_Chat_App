import jwt from 'jsonwebtoken';


export const generateToken = ( payload, res ) => {
    const token = jwt.sign( payload, process.env.JWT_SECRET , {
        expiresIn: "3d"
    });
    res.cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV != 'dev'
    })
}

export const verifyToken = ( token ) => {
    try {
        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        return decoded;
    } catch(err) {
        return null;
    }
}