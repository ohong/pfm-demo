import { useMemo, useState, useEffect } from 'react';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { TransactionsList } from './components/TransactionsList';
import { ThemeToggle } from './components/ThemeToggle';
import { MetricsGrid } from './components/MetricsGrid';
import { Transaction, BudgetSummary, CategoryTotal } from './types';
import './App.css';

// Sample data for demonstration - High Net Worth Individual
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2025-11-01'),
    description: 'Base Compensation',
    amount: 35000,
    category: 'income',
    type: 'income',
  },
  {
    id: '2',
    date: new Date('2025-11-01'),
    description: 'RSU Vesting',
    amount: 48500,
    category: 'income',
    type: 'income',
  },
  {
    id: '3',
    date: new Date('2025-11-02'),
    description: 'Penthouse Mortgage',
    amount: 8500,
    category: 'housing',
    type: 'expense',
  },
  {
    id: '4',
    date: new Date('2025-11-03'),
    description: 'Index Fund Contribution',
    amount: 15000,
    category: 'investments',
    type: 'expense',
  },
  {
    id: '5',
    date: new Date('2025-11-04'),
    description: 'Cryptocurrency Purchase',
    amount: 10000,
    category: 'investments',
    type: 'expense',
  },
  {
    id: '6',
    date: new Date('2025-11-05'),
    description: 'The French Laundry',
    amount: 1850,
    category: 'dining',
    type: 'expense',
  },
  {
    id: '7',
    date: new Date('2025-11-06'),
    description: 'Personal Trainer Sessions',
    amount: 2400,
    category: 'wellness',
    type: 'expense',
  },
  {
    id: '8',
    date: new Date('2025-11-07'),
    description: 'Tesla Model S Payment',
    amount: 1850,
    category: 'transportation',
    type: 'expense',
  },
  {
    id: '9',
    date: new Date('2025-11-08'),
    description: 'Private Health Insurance',
    amount: 3200,
    category: 'healthcare',
    type: 'expense',
  },
  {
    id: '10',
    date: new Date('2025-11-09'),
    description: 'Whole Foods & Organic Delivery',
    amount: 890,
    category: 'groceries',
    type: 'expense',
  },
  {
    id: '11',
    date: new Date('2025-11-10'),
    description: 'Business Class - Tokyo',
    amount: 5600,
    category: 'travel',
    type: 'expense',
  },
  {
    id: '12',
    date: new Date('2025-11-11'),
    description: 'Tom Ford Shopping',
    amount: 3400,
    category: 'shopping',
    type: 'expense',
  },
  {
    id: '13',
    date: new Date('2025-11-12'),
    description: 'Wine Collection Purchase',
    amount: 2800,
    category: 'lifestyle',
    type: 'expense',
  },
  {
    id: '14',
    date: new Date('2025-11-13'),
    description: 'Premium Office Space',
    amount: 2200,
    category: 'business',
    type: 'expense',
  },
  {
    id: '15',
    date: new Date('2025-11-14'),
    description: 'Subscription Services Bundle',
    amount: 450,
    category: 'entertainment',
    type: 'expense',
  },
  {
    id: '16',
    date: new Date('2025-11-15'),
    description: 'Angel Investment',
    amount: 25000,
    category: 'investments',
    type: 'expense',
  },
];

function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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

  // Additional metrics for high-earners
  const savingsRate = useMemo(() => {
    const { totalIncome, totalExpenses } = budgetSummary;
    return totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  }, [budgetSummary]);

  const netWorth = 1250000; // Mock data - would come from backend
  const monthlyTrend = 4.2; // Mock data - percentage growth

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
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <header className="app-header">
        <div className="app-header-content">
          <h1>Apex Wealth Intelligence</h1>
          <p className="app-subtitle">November 2025 Portfolio Overview</p>
        </div>
      </header>

      <main className="app-main">
        <MetricsGrid
          totalIncome={budgetSummary.totalIncome}
          totalExpenses={budgetSummary.totalExpenses}
          balance={budgetSummary.balance}
          savingsRate={savingsRate}
          monthlyTrend={monthlyTrend}
          netWorth={netWorth}
        />

        <div className="app-grid">
          <CategoryBreakdown categories={categoryTotals} />
          <TransactionsList transactions={sortedTransactions} />
        </div>
      </main>
    </div>
  );
}

export default App;
