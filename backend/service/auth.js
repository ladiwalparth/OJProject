import jwt from 'jsonwebtoken';
import 'dotenv/config';

function setUser(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export {setUser,getUser};