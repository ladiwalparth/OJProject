import express from 'express';
import router from './routes/routes.js';
import 'dotenv/config';
import { connectionDB } from './database/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

connectionDB();

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