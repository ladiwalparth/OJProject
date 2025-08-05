import express from 'express';
import {handleUserRegister,handleUserEnter,handleLoggedInUser,handleLogOut, handleOutput,handleGetProblems,handleGetParticularProblem, handleGetParticularTestCase} from '../controllers/user.js';
import { restrictToLoggedinUserOnly } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/enter', handleUserEnter);
router.post('/getOutput',restrictToLoggedinUserOnly, handleOutput);
router.get('/getProblems',handleGetProblems);
router.get('/getParticularProblem/:id',handleGetParticularProblem);
router.get('/getParticularTestCase/:id',handleGetParticularTestCase);
router.get('/loggedInData', handleLoggedInUser);
router.get('/logOut', handleLogOut);
// to be imported from controllers

export default router