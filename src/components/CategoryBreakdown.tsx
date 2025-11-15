import { CategoryTotal } from '../types';

interface CategoryBreakdownProps {
  categories: CategoryTotal[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <div className="category-breakdown">
      <h2>Spending by Category</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <div key={cat.category} className="category-item">
            <div className="category-header">
              <span className="category-name">{formatCategoryName(cat.category)}</span>
              <span className="category-amount">${cat.total.toFixed(2)}</span>
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
