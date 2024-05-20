import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/transactions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setData('Failed to fetch transactions');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">Transactions</h2>
      <p>{data}</p>
    </div>
  );
};

export default Transactions;
