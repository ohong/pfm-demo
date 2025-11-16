export type Category =
  | 'groceries'
  | 'rent'
  | 'housing'
  | 'entertainment'
  | 'utilities'
  | 'transportation'
  | 'healthcare'
  | 'dining'
  | 'shopping'
  | 'income'
  | 'investments'
  | 'wellness'
  | 'travel'
  | 'lifestyle'
  | 'business'
  | 'other';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export interface CategoryTotal {
  category: Category;
  total: number;
  percentage: number;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  isOverBudget: boolean;
}
