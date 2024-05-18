import express from 'express';
import { json } from 'body-parser';
import { userRouter } from './user';
import { tellerRouter } from './teller';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const app = express();
app.use(json());

app.use('/api/users', userRouter);
app.use('/api/teller', tellerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
