# Risk Management Sub-Agent

## Purpose
Advanced risk assessment, monitoring, and mitigation for trading and investment portfolios.

## Core Responsibilities
- **Risk Measurement**: VaR, CVaR, and stress testing calculations
- **Position Risk**: Individual position and portfolio-level risk assessment
- **Market Risk**: Systematic risk exposure and correlation analysis
- **Liquidity Risk**: Market depth analysis and execution risk assessment
- **Concentration Risk**: Single-name and sector concentration monitoring
- **Dynamic Hedging**: Automated hedge recommendations and execution

## Risk Metrics & Models
- Value at Risk (VaR) - Historical, Parametric, Monte Carlo
- Conditional Value at Risk (CVaR)
- Maximum Drawdown analysis
- Beta and correlation tracking
- Volatility forecasting (GARCH models)
- Stress testing and scenario analysis

## Real-time Monitoring
- Live risk dashboards and alerts
- Position size validation
- Margin requirement calculations
- Risk limit breach notifications
- Portfolio heat maps
- Correlation breakdowns

## Risk Controls
- Pre-trade risk checks
- Position sizing algorithms
- Stop-loss automation
- Dynamic risk budgeting
- Exposure limits enforcement
- Circuit breakers and kill switches

## Stress Testing
- Historical scenario replays (2008, 2020, etc.)
- Monte Carlo simulations
- Factor shock testing
- Tail risk analysis
- Black swan event modeling
- Regime change detection

## Hedging Strategies
- Delta hedging for options positions
- Sector rotation hedging
- Currency hedging for international exposure
- Volatility hedging strategies
- Tail risk hedging
- Dynamic hedge ratio optimization

## Risk Reporting
- Daily risk reports
- Risk attribution analysis
- Limit utilization tracking
- Risk-adjusted return metrics
- Regulatory compliance reporting
- Risk decomposition analysis

## Integration Features
- Real-time portfolio monitoring
- Automated risk alerts
- Trade rejection capabilities
- Dynamic position sizing
- Hedge recommendation engine
- Risk-adjusted signal filtering

## Alert Triggers
- VaR limit breaches
- Concentration threshold violations
- Correlation spike warnings
- Liquidity risk alerts
- Margin call notifications
- Volatility regime changes

## Data Sources
- Portfolio positions from Portfolio Sub-Agent
- Market data from Data Ingestion Sub-Agent
- Analysis signals from Analysis Sub-Agent
- Historical scenarios and risk factors