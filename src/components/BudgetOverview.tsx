import { BudgetSummary } from '../types';

interface BudgetOverviewProps {
  summary: BudgetSummary;
}

export function BudgetOverview({ summary }: BudgetOverviewProps) {
  const { totalIncome, totalExpenses, balance, isOverBudget } = summary;

  return (
    <div className="budget-overview">
      <h2>Monthly Overview</h2>
      <div className="overview-grid">
        <div className="overview-card income">
          <div className="card-label">Total Income</div>
          <div className="card-value">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="overview-card expenses">
          <div className="card-label">Total Expenses</div>
          <div className="card-value">${totalExpenses.toFixed(2)}</div>
        </div>
        <div className={`overview-card balance ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
          <div className="card-label">Balance</div>
          <div className="card-value">
            ${Math.abs(balance).toFixed(2)}
          </div>
          <div className="budget-status">
            {isOverBudget ? '⚠️ Over Budget' : '✓ Under Budget'}
          </div>
        </div>
      </div>
    </div>
  );
}
