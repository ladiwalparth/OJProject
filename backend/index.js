import express from 'express';
import router from './routes/routes.js';
import 'dotenv/config';
import { connectionDB } from './database/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { seedProblems, seedTestCases } from './controllers/user.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

async function start() {
  await connectionDB();
  await seedProblems();
  await seedTestCases();
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}
start();