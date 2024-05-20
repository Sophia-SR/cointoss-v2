import React, { useState } from 'react';
import Layout from '../components/Layout';
import Insights from './Insights';
import SavingsGoals from './SavingsGoalsPage';
import Transactions from './TransactionPage';
import TellerConnectButton from '../components/TellerConnectComponent';

const DashboardPage: React.FC = () => {
  const [connected, setConnected] = useState(false);

  const handleEnrollAccount = (publicToken: string) => {
    // Handle the public token (e.g., exchange it for an access token)
    setConnected(true);
  };

  return (
    <Layout>
      {!connected ? (
        <div className="flex flex-col items-center justify-center h-full">
          <TellerConnectButton onEnrollAccount={handleEnrollAccount} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Insights />
          <SavingsGoals />
          <Transactions />
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
