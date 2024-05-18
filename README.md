# cointoss-v2

Financial Management Application
This is a minimal financial management application built with React, TypeScript, Tailwind CSS for the frontend, and Node.js, Express, TypeScript for the backend. It integrates with the Teller API to handle user registration, login, and logging transactions.

Prerequisites
Node.js
npm
PostgreSQL (optional for persistent storage)
Project Structure

CoinTossv2/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── user.ts
│   │   │   ├── transaction.ts
│   │   │   └── teller.ts
│   │   ├── models/
│   │   │   ├── user.ts
│   │   │   └── transaction.ts
│   │   ├── app.ts
│   │   └── sequelize.ts (optional)
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TellerConnectButton.tsx
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
└── README.md
#Setup Instructions
Backend Setup
#Navigate to the backend directory:
cd backend

#Install dependencies:

npm install
Create a .env file in the root of the backend directory and add your Teller API key:

env

TELLER_API_KEY=your_teller_api_key
Compile TypeScript:

npx tsc
Run the backend server:


node dist/app.js
Frontend Setup
Navigate to the frontend directory:
-cd frontend
#Install dependencies:

npm install
Start the frontend development server:

npm start
Environment Variables
The backend requires the following environment variable to be set in the .env file:

TELLER_API_KEY: Your Teller API key.
Usage
Register a User:

Navigate to the registration page on your frontend and create a new user.
Login:

Use the login page to authenticate with the email and password of the registered user.
Connect with Teller:

Use the Teller Connect button on the dashboard to link a bank account and retrieve the access token.
License
This project is licensed under the MIT License.
