# CoinToss v2

## Overview

CoinToss v2 is a financial management web application that helps users manage their savings goals, track transactions, and gain insights into their spending habits. This project utilizes React with TypeScript for the frontend and Node.js with Express for the backend. Tailwind CSS is used for styling, and Chart.js is integrated for data visualization.

## Features

- **User Authentication**: Login and registration functionality.
- **Savings Goals**: Create and track savings goals.
- **Transactions**: Track income and expense transactions.
- **Insights**: Visualize financial data with charts.

## Project Setup

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- A PostgreSQL database (if using the full backend functionality)
- A Teller API account (if integrating with Teller API)

### Frontend Setup

1. **Install dependencies:**

   bash npm install

2.  bash npm start
    

### Backend Setup

1.  bash cd backendnpm install
    
2.  Create a **.env** file in the **backend** directory and add the following environment variables:envCopy codeJWT\_SECRET=your\_jwt\_secretDATABASE\_URL=your\_database\_urlTELLER\_API\_KEY=your\_teller\_api\_key
    
3.  bash npm start
    

Issues and Workarounds
----------------------

### Issues Faced

1.  **Integration with Teller API**:
    
    *   The initial setup for integrating the Teller API was challenging due to authentication and token handling issues.
        
    *   I encountered errors related to environment variables and API key configuration.
  
    *   Due to time constraints, troubleshooting and debugging this issue to solution wasn't possible. 
        
2.  **Backend Endpoints**:
    
    *   The backend endpoints for fetching savings goals, transactions, and insights were not fully functional.
        
    *   There were issues with CORS configuration and data fetching from the backend.
  
    *   Again, time constraints were an issue here - with more time I'm confident this would be a fully functional feature. 
        
3.  **Date Handling in Transactions**:
    
    *   TypeScript type errors occurred due to the mismatch between **Date** objects and string types expected in the **Transaction** type.
        

### Workarounds Implemented

1.  **Dummy Data for Frontend Components**:
    
    *   To demonstrate the functionality without fully operational backend endpoints, dummy data was used in the **SavingsGoals**, **Transactions**, and **Insights** components.
        
    *   This approach ensured that the application could still display meaningful and visually appealing information.
        
2.  **Environment Variable Configuration**:
    
    *   Environment variables were configured correctly to handle the Teller API integration, ensuring secure handling of API keys and tokens.
        
3.  **TypeScript Type Adjustments**:
    
    *   Adjusted the **Transaction** type to use strings for dates and converted **Date** objects to strings when creating dummy data. This resolved TypeScript type errors and ensured data consistency.
        

### Example of Dummy Data Integration

Here is an example of how dummy data was integrated into the **Insights** component to visualize financial data:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   const [transactions, setTransactions] = useState([    { id: 1, description: 'Groceries', amount: -50, date: new Date('2023-01-01').toISOString(), type: 'expense', category: 'Food' },    { id: 2, description: 'Salary', amount: 1500, date: new Date('2023-01-02').toISOString(), type: 'income' },    // Additional dummy data...  ]);   `

Future Improvements
-------------------

*   **Backend Endpoint Development**: Complete the implementation of backend endpoints for savings goals, transactions, and insights.
    
*   **Teller API Integration**: Fully integrate the Teller API for real-time financial data.
    
*   **Enhanced Error Handling**: Improve error handling and user feedback across the application.
