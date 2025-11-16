interface MetricsGridProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  monthlyTrend: number;
  netWorth: number;
}

export function MetricsGrid({
  totalIncome,
  totalExpenses,
  balance,
  savingsRate,
  monthlyTrend,
  netWorth
}: MetricsGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(1);
  };

  return (
    <div className="metrics-grid">
      <div className="metric-card metric-primary">
        <div className="metric-header">
          <span className="metric-label">Net Worth</span>
          <span className="metric-badge positive">+{formatPercent(monthlyTrend)}%</span>
        </div>
        <div className="metric-value metric-value-large">${formatCurrency(netWorth)}</div>
        <div className="metric-subtitle">Total assets minus liabilities</div>
      </div>

      <div className="metric-card">
        <span className="metric-label">Monthly Income</span>
        <div className="metric-value">${formatCurrency(totalIncome)}</div>
        <div className="metric-trend positive">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 2L10 8H2L6 2Z"/>
          </svg>
          <span>12.3% vs last month</span>
        </div>
      </div>

      <div className="metric-card">
        <span className="metric-label">Monthly Expenses</span>
        <div className="metric-value">${formatCurrency(totalExpenses)}</div>
        <div className="metric-trend negative">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 10L2 4H10L6 10Z"/>
          </svg>
          <span>8.1% vs last month</span>
        </div>
      </div>

      <div className="metric-card">
        <span className="metric-label">Net Cash Flow</span>
        <div className="metric-value">${formatCurrency(balance)}</div>
        <div className="metric-subtitle">Income - Expenses</div>
      </div>

      <div className="metric-card metric-highlight">
        <span className="metric-label">Savings Rate</span>
        <div className="metric-value">{formatPercent(savingsRate)}%</div>
        <div className="savings-bar">
          <div className="savings-bar-fill" style={{ width: `${savingsRate}%` }}></div>
        </div>
      </div>

      <div className="metric-card">
        <span className="metric-label">Investment Rate</span>
        <div className="metric-value">59.9%</div>
        <div className="metric-subtitle">Of total expenses</div>
      </div>
    </div>
  );
}
