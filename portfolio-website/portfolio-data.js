// Portfolio Data Management
const PortfolioData = {
    // Stock holdings data
    stocks: [
        {
            id: 'APLD',
            name: 'Applied Digital',
            ticker: 'APLD',
            amountInvested: 5400,
            currentValue: 5400, // Will be updated with real data
            percentOfPortfolio: 6.00,
            percentOfEquities: 12.00,
            sector: 'Data Centers/ AI Power/ Renewable Energy',
            marketCap: '≈$850M',
            volume: '≈3.5M shares/day',
            riskCategory: 'Risky',
            transactionComplete: true,
            shares: null // Will be calculated
        },
        {
            id: 'NVDA',
            name: 'NVIDIA',
            ticker: 'NVDA',
            amountInvested: 5400,
            currentValue: 5400,
            percentOfPortfolio: 6.00,
            percentOfEquities: 12.00,
            sector: 'Semiconductors / AI Power',
            marketCap: '≈$2.7T',
            volume: '≈45M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'RGTI',
            name: 'Rigetti Computing',
            ticker: 'RGTI',
            amountInvested: 2700,
            currentValue: 2700,
            percentOfPortfolio: 3.00,
            percentOfEquities: 6.00,
            sector: 'Quantum Computing',
            marketCap: '≈$250M',
            volume: '≈1.5M shares/day',
            riskCategory: 'Very High Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'GOOGL',
            name: 'Alphabet (Google)',
            ticker: 'GOOGL',
            amountInvested: 3600,
            currentValue: 3600,
            percentOfPortfolio: 4.00,
            percentOfEquities: 8.00,
            sector: 'AI Integration / Cloud Services',
            marketCap: '≈$2.1T',
            volume: '≈25M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'MSFT',
            name: 'Microsoft',
            ticker: 'MSFT',
            amountInvested: 3600,
            currentValue: 3600,
            percentOfPortfolio: 4.00,
            percentOfEquities: 8.00,
            sector: 'Software / Cloud Services',
            marketCap: '≈$3.2T',
            volume: '≈22M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: true,
            shares: null
        },
        {
            id: 'SIEGY',
            name: 'Siemens Energy',
            ticker: 'SIEGY',
            amountInvested: 4500,
            currentValue: 4500,
            percentOfPortfolio: 5.00,
            percentOfEquities: 10.00,
            sector: 'Energy / Industrial Technology / Renewables',
            marketCap: '≈$25B',
            volume: '≈1.2M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'OKLO',
            name: 'Oklo',
            ticker: 'OKLO',
            amountInvested: 2700,
            currentValue: 2700,
            percentOfPortfolio: 3.00,
            percentOfEquities: 6.00,
            sector: 'Nuclear Energy / Advanced Reactors',
            marketCap: '≈$350M',
            volume: '≈800K shares/day',
            riskCategory: 'Very High Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'CEG',
            name: 'Constellation Energy',
            ticker: 'CEG',
            amountInvested: 5400,
            currentValue: 5400,
            percentOfPortfolio: 6.00,
            percentOfEquities: 12.00,
            sector: 'Utilities / Nuclear & Renewable Power',
            marketCap: '≈$70B',
            volume: '≈2.4M shares/day',
            riskCategory: 'Low Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'GD',
            name: 'General Dynamics',
            ticker: 'GD',
            amountInvested: 4500,
            currentValue: 4500,
            percentOfPortfolio: 5.00,
            percentOfEquities: 10.00,
            sector: 'Aerospace & Defense / Government Contracting',
            marketCap: '≈$80B',
            volume: '≈1.1M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'INTC',
            name: 'Intel',
            ticker: 'INTC',
            amountInvested: 2700,
            currentValue: 2700,
            percentOfPortfolio: 3.00,
            percentOfEquities: 6.00,
            sector: 'Semiconductors / Manufacturing / AI Hardware',
            marketCap: '≈$170B',
            volume: '≈38M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        },
        {
            id: 'ORCL',
            name: 'Oracle',
            ticker: 'ORCL',
            amountInvested: 4500,
            currentValue: 4500,
            percentOfPortfolio: 5.00,
            percentOfEquities: 10.00,
            sector: 'Cloud Computing / Enterprise Software / AI Databases',
            marketCap: '≈$380B',
            volume: '≈8M shares/day',
            riskCategory: 'Medium Risk',
            transactionComplete: false,
            shares: null
        }
    ],

    // Load data from localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.stocks = data.stocks || this.stocks;
            } catch (e) {
                console.error('Error loading portfolio data:', e);
            }
        }
    },

    // Save data to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('portfolioData', JSON.stringify({
                stocks: this.stocks,
                lastUpdated: new Date().toISOString()
            }));
        } catch (e) {
            console.error('Error saving portfolio data:', e);
        }
    },

    // Get stock by ticker
    getStock(ticker) {
        return this.stocks.find(s => s.ticker === ticker);
    },

    // Update stock data
    updateStock(ticker, updates) {
        const stock = this.getStock(ticker);
        if (stock) {
            Object.assign(stock, updates);
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Calculate totals
    getTotals() {
        return {
            totalInvested: this.stocks.reduce((sum, s) => sum + s.amountInvested, 0),
            totalCurrent: this.stocks.reduce((sum, s) => sum + s.currentValue, 0),
            totalGainLoss: this.stocks.reduce((sum, s) => sum + (s.currentValue - s.amountInvested), 0)
        };
    },

    // Get performance
    getPerformance(ticker) {
        const stock = this.getStock(ticker);
        if (!stock) return null;

        const gainLoss = stock.currentValue - stock.amountInvested;
        const percentChange = (gainLoss / stock.amountInvested) * 100;

        return {
            gainLoss,
            percentChange,
            isPositive: gainLoss >= 0
        };
    }
};

// Initialize on load
if (typeof window !== 'undefined') {
    PortfolioData.loadFromStorage();
}
