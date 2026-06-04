import express from 'express';
import {
  handleUserRegister, handleUserEnter, handleLoggedInUser, handleLogOut,
  handleOutput, handleGetVerdict, handleGetProblems, handleGetSubmissions,
  handleGetParticularProblem, handleGetParticularTestCase,
  handleAIReview, handleComplexityAnalysis, handleExplainError
} from '../controllers/user.js';
import { restrictToLoggedinUserOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/enter', handleUserEnter);
router.post('/getOutput', restrictToLoggedinUserOnly, handleOutput);
router.post('/getVerdict', restrictToLoggedinUserOnly, handleGetVerdict);
router.get('/getProblems', handleGetProblems);
router.get('/getSubmissions', restrictToLoggedinUserOnly, handleGetSubmissions);
router.get('/getParticularProblem/:id', handleGetParticularProblem);
router.get('/getParticularTestCase/:id', handleGetParticularTestCase);
router.get('/loggedInData', handleLoggedInUser);
router.get('/logOut', handleLogOut);

router.post('/aiReview', restrictToLoggedinUserOnly, handleAIReview);
router.post('/aiComplexity', restrictToLoggedinUserOnly, handleComplexityAnalysis);
router.post('/aiExplainError', restrictToLoggedinUserOnly, handleExplainError);

export default router;