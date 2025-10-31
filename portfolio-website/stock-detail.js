// Stock Detail Page JavaScript

class StockDetailPage {
    constructor() {
        this.ticker = this.getTickerFromURL();
        this.stock = null;
        this.chart = null;
        this.currentTimeframe = '1M';
        this.showPercentage = true;
        this.historicalData = null;

        if (this.ticker) {
            this.init();
        } else {
            this.showError('No stock ticker provided');
        }
    }

    getTickerFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('ticker');
    }

    async init() {
        this.stock = PortfolioData.getStock(this.ticker);

        if (!this.stock) {
            this.showError('Stock not found in portfolio');
            return;
        }

        this.renderStockHeader();
        await this.loadStockData();
    }

    renderStockHeader() {
        const performance = PortfolioData.getPerformance(this.ticker);
        const perfClass = performance.isPositive ? 'positive' : 'negative';
        const perfSign = performance.isPositive ? '+' : '';

        const content = `
            <div class="stock-header">
                <h1>${this.stock.name}</h1>
                <div class="ticker">${this.stock.ticker}</div>
                <div class="performance-metric">
                    <span>Current Value:</span>
                    <span class="performance-value ${perfClass}">
                        $${this.stock.currentValue.toLocaleString()}
                        (${perfSign}${performance.percentChange.toFixed(2)}%)
                    </span>
                </div>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h2>Position Details</h2>
                    <ul class="styled-list">
                        <li><span>Amount Invested</span><span class="fw-bold">$${this.stock.amountInvested.toLocaleString()}</span></li>
                        <li><span>Current Value</span><span class="fw-bold">$${this.stock.currentValue.toLocaleString()}</span></li>
                        <li><span>Gain/Loss</span><span class="fw-bold ${perfClass}">${perfSign}$${Math.abs(performance.gainLoss).toLocaleString()}</span></li>
                        <li><span>% of Portfolio</span><span class="fw-bold">${this.stock.percentOfPortfolio}%</span></li>
                        <li><span>% of Equities</span><span class="fw-bold">${this.stock.percentOfEquities}%</span></li>
                    </ul>
                </div>

                <div class="card">
                    <h2>Stock Information</h2>
                    <ul class="styled-list">
                        <li><span>Sector</span><span>${this.stock.sector}</span></li>
                        <li><span>Market Cap</span><span>${this.stock.marketCap}</span></li>
                        <li><span>Avg Volume</span><span>${this.stock.volume}</span></li>
                        <li><span>Risk Category</span><span class="badge ${this.getRiskBadgeClass()}">${this.stock.riskCategory}</span></li>
                        <li><span>Transaction Status</span><span class="badge ${this.stock.transactionComplete ? 'completed' : 'pending'}">${this.stock.transactionComplete ? 'Complete' : 'Pending'}</span></li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <h2>Price Chart</h2>
                <div class="chart-controls">
                    <div class="timeframe-controls">
                        <button class="timeframe-btn" data-timeframe="1D">1 Day</button>
                        <button class="timeframe-btn" data-timeframe="1W">1 Week</button>
                        <button class="timeframe-btn active" data-timeframe="1M">1 Month</button>
                        <button class="timeframe-btn" data-timeframe="3M">3 Months</button>
                        <button class="timeframe-btn" data-timeframe="6M">6 Months</button>
                        <button class="timeframe-btn" data-timeframe="1Y">1 Year</button>
                        <button class="timeframe-btn" data-timeframe="5Y">5 Years</button>
                        <button class="timeframe-btn" data-timeframe="ALL">All</button>
                    </div>
                    <div class="toggle-switch">
                        <span>Dollar ($)</span>
                        <input type="checkbox" id="chartToggle" checked>
                        <span>Percentage (%)</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="stockChart"></canvas>
                </div>
                <div id="chartLoading" class="loading" style="display: none;">Loading chart data...</div>
                <div id="chartError" class="error-message" style="display: none;"></div>
            </div>
        `;

        document.getElementById('stockContent').innerHTML = content;
        this.attachEventListeners();
    }

    getRiskBadgeClass() {
        const risk = this.stock.riskCategory.toLowerCase();
        if (risk.includes('very high')) return 'very-high-risk';
        if (risk.includes('risky')) return 'risky';
        if (risk.includes('medium')) return 'medium-risk';
        if (risk.includes('low')) return 'low-risk';
        if (risk.includes('minimal')) return 'minimal-risk';
        return 'medium-risk';
    }

    attachEventListeners() {
        // Timeframe buttons
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTimeframe = e.target.dataset.timeframe;
                this.updateChart();
            });
        });

        // Percentage/Dollar toggle
        const toggle = document.getElementById('chartToggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                this.showPercentage = e.target.checked;
                this.updateChart();
            });
        }
    }

    async loadStockData() {
        const chartLoading = document.getElementById('chartLoading');
        const chartError = document.getElementById('chartError');

        if (chartLoading) chartLoading.style.display = 'block';
        if (chartError) chartError.style.display = 'none';

        try {
            // Using Alpha Vantage API (free tier) - you may need to get your own API key
            // For demo purposes, I'll generate sample data
            this.historicalData = this.generateSampleData();

            // Uncomment below to use real API (requires API key)
            // const apiKey = 'YOUR_API_KEY';
            // const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.ticker}&apikey=${apiKey}`);
            // const data = await response.json();
            // this.historicalData = this.processAPIData(data);

            this.renderChart();
        } catch (error) {
            console.error('Error loading stock data:', error);
            if (chartError) {
                chartError.textContent = 'Unable to load chart data. Displaying sample data.';
                chartError.style.display = 'block';
            }
            // Fallback to sample data
            this.historicalData = this.generateSampleData();
            this.renderChart();
        } finally {
            if (chartLoading) chartLoading.style.display = 'none';
        }
    }

    generateSampleData() {
        const data = [];
        const today = new Date();
        const daysBack = 730; // 2 years of data
        const basePrice = this.stock.currentValue / (this.stock.shares || 100); // Estimate per share price

        for (let i = daysBack; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Generate realistic price movement with trend and volatility
            const trend = (daysBack - i) / daysBack * 0.3; // Slight upward trend
            const volatility = (Math.random() - 0.5) * 0.05; // ±5% daily volatility
            const price = basePrice * (0.85 + trend + volatility);

            data.push({
                date: date.toISOString().split('T')[0],
                price: parseFloat(price.toFixed(2))
            });
        }

        return data;
    }

    getDataForTimeframe() {
        if (!this.historicalData || this.historicalData.length === 0) {
            return [];
        }

        const now = new Date();
        let cutoffDate;

        switch (this.currentTimeframe) {
            case '1D':
                cutoffDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
                break;
            case '1W':
                cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '1M':
                cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '3M':
                cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            case '6M':
                cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                break;
            case '1Y':
                cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            case '5Y':
                cutoffDate = new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
                break;
            case 'ALL':
                return this.historicalData;
            default:
                cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        return this.historicalData.filter(d => new Date(d.date) >= cutoffDate);
    }

    renderChart() {
        const ctx = document.getElementById('stockChart');
        if (!ctx) return;

        const filteredData = this.getDataForTimeframe();

        if (filteredData.length === 0) {
            return;
        }

        const basePrice = filteredData[0].price;

        const chartData = {
            labels: filteredData.map(d => d.date),
            datasets: [{
                label: this.showPercentage ? 'Change (%)' : 'Price ($)',
                data: filteredData.map(d =>
                    this.showPercentage
                        ? ((d.price - basePrice) / basePrice * 100)
                        : d.price
                ),
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            if (this.showPercentage) {
                                return `Change: ${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
                            } else {
                                return `Price: $${value.toFixed(2)}`;
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: this.getTimeUnit(),
                        displayFormats: {
                            day: 'MMM d',
                            week: 'MMM d',
                            month: 'MMM yyyy',
                            year: 'yyyy'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        callback: (value) => {
                            if (this.showPercentage) {
                                return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
                            } else {
                                return `$${value.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        };

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options
        });
    }

    getTimeUnit() {
        switch (this.currentTimeframe) {
            case '1D':
            case '1W':
                return 'day';
            case '1M':
            case '3M':
                return 'week';
            case '6M':
            case '1Y':
                return 'month';
            case '5Y':
            case 'ALL':
                return 'year';
            default:
                return 'day';
        }
    }

    updateChart() {
        this.renderChart();
    }

    showError(message) {
        document.getElementById('stockContent').innerHTML = `
            <div class="error-message">
                <strong>Error:</strong> ${message}
            </div>
            <a href="equities.html" class="back-button" style="margin-top: 1rem;">← Back to Equities</a>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StockDetailPage();
});
