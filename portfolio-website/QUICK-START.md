# Portfolio Manager - Quick Start Guide

## 🚀 Getting Started

Your portfolio website is now enhanced with powerful interactive features!

## 📍 Access Your Website

The website is currently running on: **http://localhost:8000**

### Main Pages
- **Dashboard**: http://localhost:8000/index.html
- **Enhanced Equities** (NEW): http://localhost:8000/equities-enhanced.html
- **Allocation**: http://localhost:8000/allocation.html
- **Risk Analysis**: http://localhost:8000/risk.html
- **Trading Rules**: http://localhost:8000/rules.html

---

## ✨ New Features Overview

### 1️⃣ Clickable Stock Details with Interactive Charts

**Try it now:**
1. Go to http://localhost:8000/equities-enhanced.html
2. Click on any stock row (e.g., "NVIDIA" or "Applied Digital")
3. You'll see:
   - Interactive price chart with 8 timeframe options (1D, 1W, 1M, 3M, 6M, 1Y, 5Y, All)
   - Toggle between $ (dollar) and % (percentage) view
   - Detailed position information
   - Performance metrics

**Example URLs:**
- NVIDIA Detail: http://localhost:8000/stock-detail.html?ticker=NVDA
- Applied Digital: http://localhost:8000/stock-detail.html?ticker=APLD
- Microsoft: http://localhost:8000/stock-detail.html?ticker=MSFT

### 2️⃣ Edit Mode

**Try it now:**
1. Go to http://localhost:8000/equities-enhanced.html
2. Click the **"Edit Mode"** button (top-right)
3. Click on any yellow-highlighted cell
4. Change the value (try changing NVDA from $5,400 to $6,000)
5. Click **"Save Changes"**
6. Watch the totals and gain/loss update automatically!

**Features:**
- ✅ Edit Amount Invested
- ✅ Edit Current Value
- ✅ Automatic calculation of gains/losses
- ✅ Data persists in browser (survives refresh)
- ✅ Cancel option to discard changes

### 3️⃣ Table View ↔️ Graph View Toggle

**Try it now:**
1. Go to http://localhost:8000/equities-enhanced.html
2. Click the **"Graph View"** button (top-left)
3. Explore 6 different visualizations:
   - 📊 Holdings by Value (bar chart)
   - 🥧 Portfolio Composition (pie chart)
   - 🎯 Risk Distribution (doughnut chart)
   - 📈 Sector Allocation (horizontal bars)
   - 💹 Performance Overview (colored bars - green/red)
   - 📉 Investment vs Current Value (comparison chart)
4. Click **"Table View"** to return to the table

---

## 🎯 Quick Tasks to Try

### Task 1: Update a Stock Value
1. Navigate to Equities page
2. Click "Edit Mode"
3. Update NVIDIA current value to $6,500
4. Click "Save Changes"
5. See the gain/loss change to +$1,100 (+20.37%)

### Task 2: View Stock Performance Chart
1. Click on any stock row
2. Click different timeframe buttons (1D, 1W, 1M, etc.)
3. Toggle between % and $ views
4. Notice how the chart updates instantly

### Task 3: Visualize Your Portfolio
1. Switch to "Graph View"
2. Check your risk distribution
3. View sector allocation
4. Compare invested vs current values
5. Identify your best performers (green bars)

---

## 💾 Data Persistence

All your edits are automatically saved to your browser's localStorage:
- ✅ Survives browser refresh
- ✅ Persists across sessions
- ✅ Local to your computer (private)

### Reset Data
To reset to original values:
```javascript
// Open browser console (F12) and run:
localStorage.removeItem('portfolioData');
location.reload();
```

---

## 📁 New Files Created

```
portfolio-website/
├── equities-enhanced.html      # Enhanced equity page with new features
├── equities-enhanced.js        # JavaScript for edit mode & view toggle
├── stock-detail.html           # Individual stock detail page
├── stock-detail.js             # Stock chart functionality
├── portfolio-data.js           # Centralized data management
├── FEATURES.md                 # Detailed feature documentation
└── QUICK-START.md             # This file
```

---

## 🔧 Technical Details

### Libraries Used
- **Chart.js** - Beautiful interactive charts
- **Luxon** - Date/time handling
- **LocalStorage API** - Data persistence

### Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage enabled

---

## 🎨 Features at a Glance

| Feature | Location | Action |
|---------|----------|--------|
| **Clickable Stocks** | Equities page | Click any stock row |
| **Stock Charts** | Stock detail page | Use timeframe buttons |
| **% vs $ Toggle** | Stock detail page | Toggle switch above chart |
| **Edit Mode** | Equities page | "Edit Mode" button |
| **Save Edits** | Equities page | "Save Changes" button |
| **View Toggle** | Equities page | "Table View" / "Graph View" |
| **6 Chart Types** | Graph view | Automatic display |

---

## 🚦 Status Indicators

### Edit Mode
- **Active**: Yellow banner + yellow cells
- **Inactive**: Normal table view

### View Mode
- **Table View**: Detailed data table (default)
- **Graph View**: 6 interactive charts

### Data State
- **Saved**: Green notification appears
- **Modified**: Yellow highlighted cells
- **Cancelled**: Info notification appears

---

## 🎓 Best Practices

1. **Before Editing**: Review current values
2. **During Editing**: Edit one stock at a time for accuracy
3. **After Editing**: Check the summary stats update correctly
4. **Regular Backups**: Bookmark your data or screenshot for records
5. **Experiment Safely**: Use Cancel to discard test edits

---

## 📱 Mobile Friendly

All features work on mobile devices:
- Responsive tables (scroll horizontally if needed)
- Touch-friendly buttons
- Optimized charts for small screens

---

## 🐛 Troubleshooting

### Charts Not Loading?
- Ensure internet connection (CDN libraries)
- Check browser console for errors
- Refresh the page

### Edit Mode Not Working?
- Check if JavaScript is enabled
- Try different cells
- Refresh and try again

### Data Not Saving?
- Verify localStorage is enabled
- Check browser privacy settings
- Don't use incognito/private mode

---

## 🎉 Enjoy Your Enhanced Portfolio!

You now have a fully interactive portfolio management system with:
- ✅ Real-time editing
- ✅ Interactive charts
- ✅ Multiple visualizations
- ✅ Clickable stock details
- ✅ Data persistence

**Start exploring at**: http://localhost:8000/equities-enhanced.html

---

**Need Help?** See FEATURES.md for detailed documentation.
