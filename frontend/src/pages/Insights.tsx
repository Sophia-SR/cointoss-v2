import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Transaction } from '../types/Transaction';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, TimeScale);

const Insights: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {userId: 1, id: 1, description: 'Groceries', amount: -50, date: new Date('2023-01-01').toISOString(), type: 'expense', category: 'Food' },
    {  userId: 1, id: 2, description: 'Salary', amount: 1500, date: new Date('2023-01-02').toISOString(), type: 'income' },
    { userId: 1, id: 3, description: 'Rent', amount: -800, date: new Date('2023-01-05').toISOString(), type: 'expense', category: 'Housing' },
    {userId: 1, id: 4, description: 'Utilities', amount: -100, date: new Date('2023-01-10').toISOString(), type: 'expense', category: 'Utilities' },
    {userId: 1, id: 5, description: 'Freelance Work', amount: 600, date: new Date('2023-01-15').toISOString(), type: 'income' },
    {userId: 1, id: 6, description: 'Dining Out', amount: -75, date: new Date('2023-01-20').toISOString(), type: 'expense', category: 'Food' },
    {userId: 1, id: 7, description: 'Gym Membership', amount: -40, date: new Date('2023-01-25').toISOString(), type: 'expense', category: 'Health' },
    // Add more dummy data to populate the chart and lists
    { userId: 1, id: 8, description: 'Clothing', amount: -120, date: new Date('2023-02-01').toISOString(), type: 'expense', category: 'Shopping' },
    {userId: 1, id: 9, description: 'Bonus', amount: 2000, date: new Date('2023-02-15').toISOString(), type: 'income' },
    { userId : 1,id: 10, description: 'Gift', amount: -50, date: new Date('2023-02-20').toISOString(), type: 'expense', category: 'Gifts' },
    {userId: 1, id: 11, description: 'Insurance', amount: -150, date: new Date('2023-02-25').toISOString(), type: 'expense', category: 'Insurance' },
    { userId : 1,id: 12, description: 'Stock Dividend', amount: 300, date: new Date('2023-03-01').toISOString(), type: 'income' },
  ]);
  const [expensesByCategory, setExpensesByCategory] = useState<{ [category: string]: number }>({});
  const [incomeVsExpenses, setIncomeVsExpenses] = useState<{ date: Date; income: number; expenses: number }[]>([]);

  useEffect(() => {
    const calculateExpensesByCategory = () => {
      const expenses: { [category: string]: number } = {};

      transactions.forEach((transaction) => {
        if (transaction.type === 'expense') {
          const category = transaction.category || 'Other';
          expenses[category] = (expenses[category] || 0) + transaction.amount;
        }
      });

      setExpensesByCategory(expenses);
    };

    const calculateIncomeVsExpenses = () => {
      const incomeExpenses: { date: Date; income: number; expenses: number }[] = [];

      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const month = date.getMonth();
        const year = date.getFullYear();

        const entry = incomeExpenses.find((item) => item.date.getTime() === new Date(year, month).getTime());

        if (entry) {
          if (transaction.type === 'income') {
            entry.income += transaction.amount;
          } else if (transaction.type === 'expense') {
            entry.expenses += transaction.amount;
          }
        } else {
          incomeExpenses.push({
            date: new Date(year, month),
            income: transaction.type === 'income' ? transaction.amount : 0,
            expenses: transaction.type === 'expense' ? transaction.amount : 0,
          });
        }
      });

      incomeExpenses.sort((a, b) => a.date.getTime() - b.date.getTime());
      setIncomeVsExpenses(incomeExpenses);
    };

    calculateExpensesByCategory();
    calculateIncomeVsExpenses();
  }, [transactions]);

  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const renderChart = () => {
      const ctx = document.getElementById('incomeExpensesChart') as HTMLCanvasElement;
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: incomeVsExpenses.map((entry) => entry.date),
            datasets: [
              {
                label: 'Income',
                data: incomeVsExpenses.map((entry) => entry.income),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              },
              {
                label: 'Expenses',
                data: incomeVsExpenses.map((entry) => entry.expenses),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        chartRef.current = newChart;
      }
    };

    renderChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [incomeVsExpenses]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Insights</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Expenses by Category</h3>
        <ul className="list-disc pl-5">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <li key={category} className="border-b py-2">
              {category}: ${amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Income vs Expenses</h3>
        <canvas id="incomeExpensesChart" className="w-full h-64"></canvas>
      </div>
    </div>
  );
};

export default Insights;
