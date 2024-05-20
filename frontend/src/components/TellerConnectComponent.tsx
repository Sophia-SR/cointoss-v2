import React from 'react';
import { TellerConnect } from 'teller-connect-react';

interface TellerConnectButtonProps {
  onEnrollAccount: (publicToken: string) => void;
}

const TellerConnectButton: React.FC<TellerConnectButtonProps> = ({ onEnrollAccount }) => {
  const applicationId = process.env.REACT_APP_TELLER_APP_ID || '';

  const handleSuccess = (result: any) => {
    const publicToken = result.public_token;
    onEnrollAccount(publicToken);
  };

  console.log('Teller Application ID:', applicationId); // Verify the application ID


  const handleError = (error: any) => {
    console.error('Teller Connect error:', error);
  };

  return (
    <TellerConnect
      applicationId={applicationId}
      environment="development"
      onSuccess={handleSuccess}
      onError={handleError}
    >
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
        Connect with Teller
      </button>
    </TellerConnect>
  );
};

export default TellerConnectButton;
