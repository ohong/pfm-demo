import { CategoryTotal } from '../types';

interface CategoryBreakdownProps {
  categories: CategoryTotal[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  // Format large numbers with commas
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="category-breakdown">
      <h2>Expense Allocation</h2>
      <div className="category-list">
        {categories.map((cat, index) => (
          <div
            key={cat.category}
            className="category-item"
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <div className="category-header">
              <span className="category-name">{formatCategoryName(cat.category)}</span>
              <span className="category-amount">${formatCurrency(cat.total)}</span>
            </div>
            <div className="category-bar-container">
              <div
                className="category-bar"
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
            <div className="category-percentage">{cat.percentage.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
