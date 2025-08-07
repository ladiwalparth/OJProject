import { getUser } from "../service/auth.js";




async function restrictToLoggedinUserOnly (req, res, next) {
    const token = req.cookies?.token;

    if(!token){
      return res.status(401).json({ message: "Not logged in" });
    }
    const user = getUser(token);

    req.user = user;
    // creating a temporary method in the request object only at the backend.
    
    next();
}
// note: if the hacker have our secret key then he can make any token out of it, and use it to make 
// api calls, log in as user, without needing the password or even registring as a false user because our 
// backend only checks that whether its a valid jwt token made of our secret key and allows to enter or make api calls.

export {
  restrictToLoggedinUserOnly
}