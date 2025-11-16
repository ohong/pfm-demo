import { Transaction } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  // Format large numbers with commas
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="transactions-list">
      <h2>Transaction History</h2>
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
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`transaction-row ${transaction.type}`}
                  style={{ '--row-index': index } as React.CSSProperties}
                >
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
                    {formatCurrency(transaction.amount)}
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
