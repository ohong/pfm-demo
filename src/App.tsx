import { useMemo } from 'react';
import { BudgetOverview } from './components/BudgetOverview';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { TransactionsList } from './components/TransactionsList';
import { Transaction, BudgetSummary, CategoryTotal } from './types';
import './App.css';

// Sample data for demonstration
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2025-11-01'),
    description: 'Monthly Salary',
    amount: 4500,
    category: 'income',
    type: 'income',
  },
  {
    id: '2',
    date: new Date('2025-11-02'),
    description: 'Apartment Rent',
    amount: 1500,
    category: 'rent',
    type: 'expense',
  },
  {
    id: '3',
    date: new Date('2025-11-05'),
    description: 'Grocery Shopping',
    amount: 156.43,
    category: 'groceries',
    type: 'expense',
  },
  {
    id: '4',
    date: new Date('2025-11-07'),
    description: 'Netflix Subscription',
    amount: 15.99,
    category: 'entertainment',
    type: 'expense',
  },
  {
    id: '5',
    date: new Date('2025-11-08'),
    description: 'Electric Bill',
    amount: 89.50,
    category: 'utilities',
    type: 'expense',
  },
  {
    id: '6',
    date: new Date('2025-11-09'),
    description: 'Gas Station',
    amount: 45.00,
    category: 'transportation',
    type: 'expense',
  },
  {
    id: '7',
    date: new Date('2025-11-10'),
    description: 'Restaurant Dinner',
    amount: 67.80,
    category: 'dining',
    type: 'expense',
  },
  {
    id: '8',
    date: new Date('2025-11-11'),
    description: 'Grocery Shopping',
    amount: 92.15,
    category: 'groceries',
    type: 'expense',
  },
  {
    id: '9',
    date: new Date('2025-11-12'),
    description: 'Movie Tickets',
    amount: 32.00,
    category: 'entertainment',
    type: 'expense',
  },
  {
    id: '10',
    date: new Date('2025-11-13'),
    description: 'New Shoes',
    amount: 85.00,
    category: 'shopping',
    type: 'expense',
  },
  {
    id: '11',
    date: new Date('2025-11-14'),
    description: 'Doctor Visit',
    amount: 120.00,
    category: 'healthcare',
    type: 'expense',
  },
  {
    id: '12',
    date: new Date('2025-11-15'),
    description: 'Freelance Project',
    amount: 800,
    category: 'income',
    type: 'income',
  },
];

function App() {
  // Calculate budget summary
  const budgetSummary: BudgetSummary = useMemo(() => {
    const totalIncome = sampleTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = sampleTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance,
      isOverBudget: balance < 0,
    };
  }, []);

  // Calculate category breakdown
  const categoryTotals: CategoryTotal[] = useMemo(() => {
    const expenseTransactions = sampleTransactions.filter(t => t.type === 'expense');
    const totalExpenses = budgetSummary.totalExpenses;

    const categoryMap = new Map<string, number>();

    expenseTransactions.forEach(transaction => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    const categories: CategoryTotal[] = Array.from(categoryMap.entries())
      .map(([category, total]) => ({
        category: category as any,
        total,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return categories;
  }, [budgetSummary.totalExpenses]);

  // Sort transactions by date (most recent first)
  const sortedTransactions = useMemo(() => {
    return [...sampleTransactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Budget Tracker</h1>
        <p className="app-subtitle">November 2025</p>
      </header>

      <main className="app-main">
        <BudgetOverview summary={budgetSummary} />

        <div className="app-grid">
          <CategoryBreakdown categories={categoryTotals} />
          <TransactionsList transactions={sortedTransactions} />
        </div>
      </main>
    </div>
  );
}

export default App;
