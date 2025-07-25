import express from 'express';
import handleUserRegister from '../controllers/user.js';

const router = express.Router();

router.post('/register', handleUserRegister);

// to be imported from controllers

export default router