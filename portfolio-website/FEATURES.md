# Portfolio Manager - New Features

## Overview
The portfolio manager website has been enhanced with three major interactive features to provide a more dynamic and user-friendly experience.

## Feature 1: Clickable Equity Details with Interactive Stock Graphs

### Description
Each equity in your portfolio table is now clickable, allowing you to view detailed information and interactive price charts for individual stocks.

### How to Use
1. Navigate to the **Equities** page
2. Click on any stock row in the table
3. You'll be taken to a dedicated detail page for that stock

### Stock Detail Page Features

#### Interactive Price Chart
- **Multiple Timeframes**: Switch between different time periods
  - 1 Day (1D)
  - 1 Week (1W)
  - 1 Month (1M) - Default view
  - 3 Months (3M)
  - 6 Months (6M)
  - 1 Year (1Y)
  - 5 Years (5Y)
  - All Time (ALL)

#### Y-Axis Toggle
- **Dollar Amount ($)**: View absolute stock prices
- **Percentage Change (%)**: View relative performance from the start of the selected timeframe
- Toggle between views using the switch control above the chart

#### Position Details
- Amount Invested
- Current Value
- Gain/Loss ($ and %)
- Portfolio allocation percentages
- Stock information (sector, market cap, volume, risk category)

### Technical Details
- Charts are generated using Chart.js library
- Sample data is generated for demonstration purposes
- Can be connected to real-time APIs (Alpha Vantage, Yahoo Finance, etc.) by adding API key
- Data persists in browser localStorage

---

## Feature 2: Editing Mode

### Description
Edit your portfolio values directly within the equity table without needing external tools or manual updates.

### How to Use

#### Entering Edit Mode
1. Navigate to the **Equities** page
2. Click the **"Edit Mode"** button in the top-right corner
3. A yellow banner will appear indicating edit mode is active
4. Editable cells (Amount Invested and Current Value) will be highlighted in yellow

#### Making Edits
1. Click on any highlighted cell
2. The text will be automatically selected
3. Type the new value (numbers and decimal points only)
4. Press Tab or click another cell to move to the next field

#### Saving Changes
1. Click **"Save Changes"** button to persist your edits
2. A success notification will appear
3. Edit mode will automatically exit
4. All calculations (gain/loss, percentages) will update automatically
5. Changes are saved to browser localStorage

#### Cancelling Edits
1. Click **"Cancel"** button to discard all changes
2. Original values will be restored
3. Edit mode will exit

### Features
- Real-time validation (only allows numbers)
- Automatic recalculation of:
  - Gain/Loss amounts
  - Percentage changes
  - Portfolio totals
  - Summary statistics
- Data persistence across browser sessions
- Visual feedback with color-coded editable cells

---

## Feature 3: View Toggle - Table Mode and Graph Mode

### Description
Switch between a traditional table view and visual chart representations of your portfolio data.

### How to Use
1. Navigate to the **Equities** page
2. Use the **"Table View"** / **"Graph View"** toggle buttons at the top
3. Click **"Graph View"** to see visual representations

### Table Mode (Default)
- Traditional table layout
- Detailed columns with all stock information
- Clickable rows for stock details
- Sortable and scannable data

### Graph Mode

Six interactive visualizations:

#### 1. Holdings by Value
- **Type**: Bar Chart
- **Shows**: Current value of each stock
- **Use**: Quickly identify your largest positions

#### 2. Portfolio Composition
- **Type**: Pie Chart
- **Shows**: Percentage allocation of each stock
- **Use**: Visualize diversification across holdings

#### 3. Risk Distribution
- **Type**: Doughnut Chart
- **Shows**: Total value grouped by risk category
  - Very High Risk
  - Risky
  - Medium Risk
  - Low Risk
  - Minimal Risk
- **Use**: Understand your portfolio's risk profile

#### 4. Sector Allocation
- **Type**: Horizontal Bar Chart
- **Shows**: Top 8 sectors by total value
- **Use**: See sector concentration and diversity

#### 5. Performance Overview
- **Type**: Bar Chart (color-coded)
- **Shows**: Percentage gain/loss for each stock
- **Colors**:
  - Green = Positive performance
  - Red = Negative performance
- **Use**: Identify top and bottom performers

#### 6. Investment vs Current Value
- **Type**: Grouped Bar Chart
- **Shows**: Side-by-side comparison of:
  - Amount Invested (gray bars)
  - Current Value (blue bars)
- **Use**: See which positions have grown or declined

### Chart Features
- **Responsive Design**: All charts adapt to screen size
- **Interactive Tooltips**: Hover over data points for exact values
- **Professional Styling**: Color-coded and clearly labeled
- **Real-time Updates**: Charts reflect any edits made in edit mode

---

## Data Persistence

All portfolio data is stored in your browser's localStorage:
- Survives browser refresh
- Persists across sessions
- Edits are automatically saved
- Can be exported/backed up if needed

### Resetting Data
To reset to original values:
1. Open browser developer console (F12)
2. Type: `localStorage.removeItem('portfolioData')`
3. Refresh the page

---

## Technical Stack

### Libraries Used
- **Chart.js**: Interactive charts and graphs
- **Luxon**: Date/time handling for stock charts
- **Vanilla JavaScript**: No framework dependencies
- **LocalStorage API**: Client-side data persistence

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design for mobile and desktop

---

## Future Enhancements

Potential additions:
- Real-time stock price integration with live APIs
- Export to CSV/Excel functionality
- Portfolio performance analytics
- Transaction history tracking
- Multi-portfolio support
- Advanced charting (candlestick, technical indicators)
- Dark mode theme

---

## Tips for Best Experience

1. **Use Edit Mode carefully**: Changes are saved immediately upon clicking "Save Changes"
2. **Explore both views**: Table for details, Graph for insights
3. **Click stocks for details**: View individual performance and charts
4. **Experiment with timeframes**: Different periods reveal different patterns
5. **Toggle percentage/dollar views**: Each provides different insights

---

## Support

For issues or questions:
- Check browser console for error messages
- Ensure JavaScript is enabled
- Clear browser cache if charts don't load
- Verify localStorage is not disabled

---

**Version**: 1.0
**Last Updated**: October 2025
