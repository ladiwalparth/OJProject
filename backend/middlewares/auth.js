// import { getUser } from "../service/auth.js";




async function restrictToLoggedinUserOnly (req, res, next) {
    const token = req.cookies?.token;

    if(!token){
      return res.status(401).json({ message: "Not logged in" });
    }

    next();
}


// async function checkAuth(req, res, next) {
//   const token= req.cookies?.token;

//   const user = getUser(token);

//   req.user = user;
//   next();
// }

export {
  restrictToLoggedinUserOnly
}