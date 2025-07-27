import { getUser } from "../service/auth";




async function restrictToLoggedinUserOnly (req, res, next) {
    const token = req.cookies?.token;

    const user = getUser(token);

    req.user = user;

    next();
}


async function checkAuth(req, res, next) {
  const token= req.cookies?.token;

  const user = getUser(userUid);

  req.user = user;
  next();
}

export {
  restrictToLoggedinUserOnly,
  checkAuth,
}