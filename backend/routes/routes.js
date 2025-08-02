import express from 'express';
import {handleUserRegister,handleUserEnter,handleLoggedInUser,handleLogOut, handleOutput,handleGetProblems} from '../controllers/user.js';
import { restrictToLoggedinUserOnly } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/enter', handleUserEnter);
router.post('/getOutput',restrictToLoggedinUserOnly, handleOutput);
router.get('/getProblems',handleGetProblems);
router.get('/loggedInData', handleLoggedInUser);
router.get('/logOut', handleLogOut);
// to be imported from controllers

export default router