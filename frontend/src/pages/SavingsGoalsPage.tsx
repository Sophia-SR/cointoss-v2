import React, { useState, useEffect } from 'react';
import { SavingsGoals } from '../types/SavingsGoals';
import Layout from '../components/Layout';

const SavingGoalsPage: React.FC = () => {
  const [savingGoals, setSavingGoals] = useState<SavingsGoals[]>([
    {userId: 1, id: 1, name: 'Emergency Fund', targetAmount: 1000, currentAmount: 200 },
    {userId: 1, id: 2, name: 'Vacation', targetAmount: 3000, currentAmount: 1500 },
    { userId: 1, id: 3, name: 'New Car', targetAmount: 15000, currentAmount: 5000 },
    { userId: 1,id: 4, name: 'House Downpayment', targetAmount: 50000, currentAmount: 20000 },
  ]);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [error, setError] = useState('');

  const handleAddSavingGoal = (event: React.FormEvent) => {
    event.preventDefault();
    const newGoal: SavingsGoals = {
        id: savingGoals.length + 1,
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        userId: 0
    };
    setSavingGoals([...savingGoals, newGoal]);
    setName('');
    setTargetAmount('');
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Saving Goals</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleAddSavingGoal} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Target Amount</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Saving Goal
          </button>
        </form>
        <div>
          <h3 className="text-2xl font-bold mb-2">Your Saving Goals</h3>
          <ul>
            {savingGoals.map((goal) => (
              <li key={goal.id} className="border-b py-2">
                {goal.name}: ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SavingGoalsPage;
