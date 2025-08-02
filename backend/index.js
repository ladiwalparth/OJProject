import express from 'express';
import router from './routes/routes.js';
import 'dotenv/config';
import { connectionDB } from './database/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { seedProblems } from './controllers/user.js';
const app = express();

connectionDB();
seedProblems();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/", router);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})