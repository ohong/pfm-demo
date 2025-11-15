export type Category =
  | 'groceries'
  | 'rent'
  | 'entertainment'
  | 'utilities'
  | 'transportation'
  | 'healthcare'
  | 'dining'
  | 'shopping'
  | 'income'
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
