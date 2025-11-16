import { BudgetSummary } from '../types';

interface BudgetOverviewProps {
  summary: BudgetSummary;
}

export function BudgetOverview({ summary }: BudgetOverviewProps) {
  const { totalIncome, totalExpenses, balance, isOverBudget } = summary;

  // Format large numbers with commas
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="budget-overview">
      <h2>Portfolio Overview</h2>
      <div className="overview-grid">
        <div className="overview-card income">
          <div className="card-label">Total Income</div>
          <div className="card-value">${formatCurrency(totalIncome)}</div>
        </div>
        <div className="overview-card expenses">
          <div className="card-label">Total Expenses</div>
          <div className="card-value">${formatCurrency(totalExpenses)}</div>
        </div>
        <div className={`overview-card balance ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
          <div className="card-label">Net Position</div>
          <div className="card-value">
            ${formatCurrency(Math.abs(balance))}
          </div>
          <div className="budget-status">
            {isOverBudget ? '⚠ Deficit' : '✓ Surplus'}
          </div>
        </div>
      </div>
    </div>
  );
}
