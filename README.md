# Portfolio Manager - AI Stock Assistant System

## Overview
An intelligent portfolio management system powered by specialized AI sub-agents working together to provide comprehensive stock analysis, portfolio optimization, risk management, and market insights.

## Project Structure

```
portfolio-manager/
├── context/                          # Infrastructure agents
│   ├── ts-sub-agent/                # Context management
│   ├── prompt-engineer-sub-agent/   # Prompt optimization
│   └── README.md
├── jeff-stock-manager-sub-agent/    # Primary orchestrator
├── data-ingestion-sub-agent/        # Market data collection
├── analysis-sub-agent/              # Technical & fundamental analysis
├── portfolio-sub-agent/             # Portfolio management
├── risk-management-sub-agent/       # Risk assessment & monitoring
├── alerts-sub-agent/                # Notification system
├── reporting-sub-agent/             # Analytics & reporting
└── README.md                        # This file
```

## Core Components

### Jeff - Stock Manager (Orchestrator)
**Location**: `jeff-stock-manager-sub-agent/`

The intelligent orchestrator that provides a natural language interface to the entire system.

**Example Commands**:
- `"jeff analyze AAPL"` - Comprehensive stock analysis
- `"jeff check my portfolio"` - Portfolio status and performance
- `"jeff what's my risk exposure"` - Risk assessment
- `"jeff scan for opportunities"` - Market opportunity screening

### Stock Analysis Agents

#### Data Ingestion Sub-Agent
- Real-time market data collection
- Alpha Vantage, Yahoo Finance, IEX integration
- Rate limiting and data normalization
- Historical data management

#### Analysis Sub-Agent
- Technical analysis (indicators, patterns, momentum)
- Fundamental analysis (financials, valuation, growth)
- Sentiment analysis
- ML-powered predictions

### Portfolio Management Agents

#### Portfolio Sub-Agent
- Multi-portfolio support
- Asset allocation and rebalancing
- Performance tracking and attribution
- Tax-loss harvesting
- P&L analysis

#### Risk Management Sub-Agent
- VaR (Value at Risk) calculations
- Stress testing and scenario analysis
- Position sizing optimization
- Dynamic hedging strategies
- Real-time risk monitoring

### Communication & Reporting Agents

#### Alerts Sub-Agent
- Multi-channel notifications (email, SMS, push)
- Smart filtering and prioritization
- Escalation management
- Alert analytics

#### Reporting Sub-Agent
- Interactive dashboards
- Performance reports
- Risk analytics
- Compliance reporting
- Data visualization

### Infrastructure Agents

#### Context Sub-Agent (TS)
- Session context management
- Information persistence
- Cross-conversation continuity
- Access: Use "ts.." prefix in messages

#### Prompt Engineer Sub-Agent
- Automatic prompt optimization
- 2024 advanced prompt engineering strategies
- Chain-of-Thought integration
- Operates automatically in the background

## System Architecture

### Agent Coordination
```
Jeff (Orchestrator)
├── Data Ingestion ─┐
├── Analysis ───────┼─→ Integrated Analysis
├── Portfolio ──────┤
├── Risk Mgmt ──────┤
├── Alerts ─────────┤
└── Reporting ──────┘
```

### Data Flow
1. **User Command** → Jeff processes natural language
2. **Agent Routing** → Jeff determines required sub-agents
3. **Parallel Execution** → Sub-agents work simultaneously
4. **Result Aggregation** → Jeff combines outputs
5. **Response** → Coherent, actionable insights

## Getting Started

### Basic Usage
1. Use Jeff as your primary interface: `"jeff [your command]"`
2. Jeff will automatically coordinate all necessary sub-agents
3. Results are aggregated and presented in a user-friendly format

### Advanced Usage
- **Context Management**: Use "ts.." to manage session context
- **Direct Agent Access**: Engage specific sub-agents for specialized tasks
- **Custom Workflows**: Create multi-step analysis workflows

## Features

### Intelligent Analysis
- Multi-source data aggregation
- ML-powered predictions
- Pattern recognition
- Anomaly detection

### Portfolio Optimization
- Risk-adjusted returns
- Tax efficiency
- Rebalancing recommendations
- Performance attribution

### Risk Management
- Real-time monitoring
- Stress testing
- Correlation analysis
- Position limits

### Proactive Monitoring
- Market surveillance
- Earnings tracking
- News impact analysis
- Opportunity scanning

## Technology Stack
- Natural Language Processing
- Machine Learning models
- Real-time data streaming
- Multi-agent coordination
- Advanced analytics

## Performance Targets
- **Response Time**: < 3 seconds for standard queries
- **Data Freshness**: Real-time for prices, near-real-time for analysis
- **Accuracy**: Continuously tracked and optimized
- **Uptime**: High availability architecture

## Security & Compliance
- Secure financial data handling
- Role-based access control
- Complete audit trail
- Regulatory compliance adherence

## Development Status
Active development - Core infrastructure and sub-agents operational

## Notes
- This is a standalone project, independent of the claude-agents infrastructure
- Infrastructure agents (context, prompt-engineer) are project-specific copies
- Jeff orchestrates all operations through natural language commands

---

**Quick Start**: Simply say `"jeff analyze [TICKER]"` to begin!
