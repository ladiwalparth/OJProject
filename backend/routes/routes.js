import express from 'express';
import {handleUserRegister,handleUserEnter,handleLoggedInUser,handleLogOut} from '../controllers/user.js';

const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/enter', handleUserEnter);
router.get('/loggedInData', handleLoggedInUser);
router.get('/logOut', handleLogOut);
// to be imported from controllers

export default router