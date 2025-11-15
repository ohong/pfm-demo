import { Transaction } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <div className="transactions-list">
      <h2>Recent Transactions</h2>
      <div className="transactions-container">
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="amount-header">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className={`transaction-row ${transaction.type}`}>
                  <td className="transaction-date">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="transaction-description">
                    {transaction.description}
                  </td>
                  <td className="transaction-category">
                    {formatCategoryName(transaction.category)}
                  </td>
                  <td className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
