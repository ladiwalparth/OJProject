import jwt from 'jsonwebtoken';
import 'dotenv/config';

function setUser(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
}

function getUser(token){
    if(!token) return null;
    try {
        const user = jwt.verify(token,process.env.SECRET_KEY);
        return user;
    } catch (error) {
        return null;
    }
}

export {setUser,getUser};