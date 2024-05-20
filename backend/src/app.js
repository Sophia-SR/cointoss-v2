const dotenv = require('dotenv') // Load environment variables early
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const tellerRouter = require('./routes/teller');
const savingGoalsRouter = require('./routes/savingsGoals');
const transactionsRouter = require('./routes/transactions'); // Add this line

dotenv.config();


const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/teller', tellerRouter);
app.use('/api/savingGoals', savingGoalsRouter);
app.use('/api/transactions', transactionsRouter); // Add this line

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync database:', error);
});
