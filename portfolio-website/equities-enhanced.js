// Enhanced Equities Page JavaScript

class EquitiesManager {
    constructor() {
        this.editMode = false;
        this.currentView = 'table';
        this.charts = {};
        this.originalData = null;

        this.init();
    }

    init() {
        this.renderTable();
        this.updateSummaryStats();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // View toggle buttons
        document.getElementById('tableViewBtn').addEventListener('click', () => this.switchView('table'));
        document.getElementById('graphViewBtn').addEventListener('click', () => this.switchView('graph'));

        // Edit mode buttons
        document.getElementById('editBtn').addEventListener('click', () => this.toggleEditMode());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveChanges());
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
    }

    renderTable() {
        const tbody = document.getElementById('stockTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        // Add data rows
        PortfolioData.stocks.forEach(stock => {
            const performance = PortfolioData.getPerformance(stock.ticker);
            const row = this.createTableRow(stock, performance);
            tbody.appendChild(row);
        });

        // Add totals row
        const totals = PortfolioData.getTotals();
        const totalsRow = document.createElement('tr');
        totalsRow.className = 'table-footer';
        totalsRow.innerHTML = `
            <td colspan="2"><strong>Totals:</strong></td>
            <td><strong>$${totals.totalInvested.toLocaleString()}</strong></td>
            <td><strong>$${totals.totalCurrent.toLocaleString()}</strong></td>
            <td><strong class="${totals.totalGainLoss >= 0 ? 'text-success' : 'text-danger'}">
                ${totals.totalGainLoss >= 0 ? '+' : ''}$${totals.totalGainLoss.toLocaleString()}
            </strong></td>
            <td colspan="4"></td>
        `;
        tbody.appendChild(totalsRow);
    }

    createTableRow(stock, performance) {
        const row = document.createElement('tr');
        row.className = 'clickable-row';
        row.dataset.ticker = stock.ticker;

        const perfClass = performance.isPositive ? 'text-success' : 'text-danger';
        const perfSign = performance.isPositive ? '+' : '';

        row.innerHTML = `
            <td><strong>${stock.name}</strong></td>
            <td>${stock.ticker}</td>
            <td class="editable-cell" data-field="amountInvested">$${stock.amountInvested.toLocaleString()}</td>
            <td class="editable-cell" data-field="currentValue">$${stock.currentValue.toLocaleString()}</td>
            <td class="${perfClass}">${perfSign}$${Math.abs(performance.gainLoss).toLocaleString()}</td>
            <td class="${perfClass}">${perfSign}${performance.percentChange.toFixed(2)}%</td>
            <td>${stock.percentOfPortfolio.toFixed(2)}%</td>
            <td>${stock.sector}</td>
            <td><span class="badge ${this.getRiskBadgeClass(stock.riskCategory)}">${stock.riskCategory}</span></td>
        `;

        // Add click event for row
        row.addEventListener('click', (e) => {
            // Don't navigate if clicking on editable cell in edit mode
            if (this.editMode && e.target.classList.contains('editable-cell')) {
                return;
            }
            this.navigateToDetail(stock.ticker);
        });

        return row;
    }

    getRiskBadgeClass(riskCategory) {
        const risk = riskCategory.toLowerCase();
        if (risk.includes('very high')) return 'very-high-risk';
        if (risk.includes('risky')) return 'risky';
        if (risk.includes('medium')) return 'medium-risk';
        if (risk.includes('low')) return 'low-risk';
        if (risk.includes('minimal')) return 'minimal-risk';
        return 'medium-risk';
    }

    navigateToDetail(ticker) {
        window.location.href = `stock-detail.html?ticker=${ticker}`;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        const editBtn = document.getElementById('editBtn');
        const saveBtn = document.getElementById('saveBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const banner = document.getElementById('editModeBanner');

        if (this.editMode) {
            // Store original data for cancel
            this.originalData = JSON.parse(JSON.stringify(PortfolioData.stocks));

            editBtn.classList.add('active');
            editBtn.textContent = 'Editing...';
            saveBtn.style.display = 'inline-block';
            cancelBtn.style.display = 'inline-block';
            banner.style.display = 'block';

            this.enableEditing();
        } else {
            editBtn.classList.remove('active');
            editBtn.textContent = 'Edit Mode';
            saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            banner.style.display = 'none';

            this.disableEditing();
        }
    }

    enableEditing() {
        document.querySelectorAll('.editable-cell').forEach(cell => {
            cell.contentEditable = true;
            cell.classList.add('editable');

            cell.addEventListener('focus', function() {
                // Select all text on focus
                const range = document.createRange();
                range.selectNodeContents(this);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            });

            // Only allow numbers and decimal point
            cell.addEventListener('keypress', function(e) {
                if (!/[\d.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Enter') {
                    e.preventDefault();
                }
            });
        });
    }

    disableEditing() {
        document.querySelectorAll('.editable-cell').forEach(cell => {
            cell.contentEditable = false;
            cell.classList.remove('editable');
        });
    }

    saveChanges() {
        const rows = document.querySelectorAll('#stockTableBody tr:not(.table-footer)');

        rows.forEach(row => {
            const ticker = row.dataset.ticker;
            const amountInvestedCell = row.querySelector('[data-field="amountInvested"]');
            const currentValueCell = row.querySelector('[data-field="currentValue"]');

            if (amountInvestedCell && currentValueCell) {
                const amountInvested = parseFloat(amountInvestedCell.textContent.replace(/[$,]/g, ''));
                const currentValue = parseFloat(currentValueCell.textContent.replace(/[$,]/g, ''));

                if (!isNaN(amountInvested) && !isNaN(currentValue)) {
                    PortfolioData.updateStock(ticker, {
                        amountInvested,
                        currentValue
                    });
                }
            }
        });

        // Save to localStorage
        PortfolioData.saveToStorage();

        // Refresh display
        this.renderTable();
        this.updateSummaryStats();

        // Exit edit mode
        this.toggleEditMode();

        // Show success message
        this.showNotification('Changes saved successfully!', 'success');
    }

    cancelEdit() {
        // Restore original data
        if (this.originalData) {
            PortfolioData.stocks = JSON.parse(JSON.stringify(this.originalData));
            this.renderTable();
        }

        // Exit edit mode
        this.toggleEditMode();

        this.showNotification('Changes cancelled', 'info');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = type === 'success' ? 'success-box' : 'info-box';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        notification.style.boxShadow = 'var(--shadow-hover)';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    updateSummaryStats() {
        const totals = PortfolioData.getTotals();

        document.getElementById('totalEquitiesValue').textContent = totals.totalCurrent.toLocaleString();
        document.getElementById('numHoldings').textContent = PortfolioData.stocks.length;

        const gainLossElement = document.getElementById('totalGainLoss');
        const gainLoss = totals.totalGainLoss;
        gainLossElement.textContent = `${gainLoss >= 0 ? '+' : ''}$${Math.abs(gainLoss).toLocaleString()}`;
        gainLossElement.parentElement.className = gainLoss >= 0 ? 'stat-box success' : 'stat-box accent';
    }

    switchView(view) {
        this.currentView = view;

        const tableView = document.getElementById('tableView');
        const graphView = document.getElementById('graphView');
        const tableBtn = document.getElementById('tableViewBtn');
        const graphBtn = document.getElementById('graphViewBtn');

        if (view === 'table') {
            tableView.style.display = 'block';
            graphView.style.display = 'none';
            tableBtn.classList.add('active');
            graphBtn.classList.remove('active');
        } else {
            tableView.style.display = 'none';
            graphView.style.display = 'block';
            tableBtn.classList.remove('active');
            graphBtn.classList.add('active');

            // Render charts when switching to graph view
            this.renderCharts();
        }
    }

    renderCharts() {
        this.renderValueChart();
        this.renderCompositionChart();
        this.renderRiskChart();
        this.renderSectorChart();
        this.renderPerformanceChart();
        this.renderComparisonChart();
    }

    renderValueChart() {
        const ctx = document.getElementById('valueChart');
        if (!ctx) return;

        if (this.charts.valueChart) {
            this.charts.valueChart.destroy();
        }

        const labels = PortfolioData.stocks.map(s => s.ticker);
        const data = PortfolioData.stocks.map(s => s.currentValue);

        this.charts.valueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Current Value ($)',
                    data: data,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgb(52, 152, 219)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    }

    renderCompositionChart() {
        const ctx = document.getElementById('compositionChart');
        if (!ctx) return;

        if (this.charts.compositionChart) {
            this.charts.compositionChart.destroy();
        }

        const labels = PortfolioData.stocks.map(s => s.ticker);
        const data = PortfolioData.stocks.map(s => s.percentOfEquities);

        this.charts.compositionChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
                        '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#c0392b', '#27ae60'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + context.parsed.toFixed(1) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    renderRiskChart() {
        const ctx = document.getElementById('riskChart');
        if (!ctx) return;

        if (this.charts.riskChart) {
            this.charts.riskChart.destroy();
        }

        // Group by risk category
        const riskGroups = {};
        PortfolioData.stocks.forEach(stock => {
            const risk = stock.riskCategory;
            if (!riskGroups[risk]) {
                riskGroups[risk] = 0;
            }
            riskGroups[risk] += stock.currentValue;
        });

        const labels = Object.keys(riskGroups);
        const data = Object.values(riskGroups);
        const colors = labels.map(label => {
            const risk = label.toLowerCase();
            if (risk.includes('very high')) return '#721c24';
            if (risk.includes('risky')) return '#f8d7da';
            if (risk.includes('medium')) return '#fff3cd';
            if (risk.includes('low')) return '#d4edda';
            if (risk.includes('minimal')) return '#d1ecf1';
            return '#95a5a6';
        });

        this.charts.riskChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': $' + context.parsed.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    renderSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx) return;

        if (this.charts.sectorChart) {
            this.charts.sectorChart.destroy();
        }

        // Group by main sector (simplified)
        const sectorGroups = {};
        PortfolioData.stocks.forEach(stock => {
            // Extract primary sector
            const sector = stock.sector.split('/')[0].trim();
            if (!sectorGroups[sector]) {
                sectorGroups[sector] = 0;
            }
            sectorGroups[sector] += stock.currentValue;
        });

        // Sort by value
        const sorted = Object.entries(sectorGroups)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8); // Top 8 sectors

        const labels = sorted.map(s => s[0]);
        const data = sorted.map(s => s[1]);

        this.charts.sectorChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Value by Sector ($)',
                    data: data,
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgb(46, 204, 113)',
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    }

    renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;

        if (this.charts.performanceChart) {
            this.charts.performanceChart.destroy();
        }

        const labels = PortfolioData.stocks.map(s => s.ticker);
        const data = PortfolioData.stocks.map(s => {
            const perf = PortfolioData.getPerformance(s.ticker);
            return perf.percentChange;
        });

        const colors = data.map(value => value >= 0 ? 'rgba(46, 204, 113, 0.7)' : 'rgba(231, 76, 60, 0.7)');
        const borderColors = data.map(value => value >= 0 ? 'rgb(46, 204, 113)' : 'rgb(231, 76, 60)');

        this.charts.performanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Performance (%)',
                    data: data,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: (value) => value.toFixed(1) + '%'
                        }
                    }
                }
            }
        });
    }

    renderComparisonChart() {
        const ctx = document.getElementById('comparisonChart');
        if (!ctx) return;

        if (this.charts.comparisonChart) {
            this.charts.comparisonChart.destroy();
        }

        const labels = PortfolioData.stocks.map(s => s.ticker);
        const invested = PortfolioData.stocks.map(s => s.amountInvested);
        const current = PortfolioData.stocks.map(s => s.currentValue);

        this.charts.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Amount Invested',
                    data: invested,
                    backgroundColor: 'rgba(149, 165, 166, 0.7)',
                    borderColor: 'rgb(149, 165, 166)',
                    borderWidth: 2
                }, {
                    label: 'Current Value',
                    data: current,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgb(52, 152, 219)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EquitiesManager();
});
