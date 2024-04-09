import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // Verifica si el token existe
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.redirect("/");
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/");
    }
};