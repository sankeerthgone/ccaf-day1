# Finance Tracker - Complete Beginner's Guide

## 🎯 What This App Does
A personal finance tracker with 5 sections:
- **Dashboard**: Shows all totals at a glance
- **Income**: Track money coming in
- **Expenses**: Track money going out
- **Investments**: Track loans, FDs, SIPs, stocks
- **Stocks Watchlist**: Monitor stocks

---

## 🏗️ How the 3 Files Work Together

```
HTML (index.html)
    ↓ Defines structure
CSS (style.css)
    ↓ Makes it look nice
JavaScript (script.js)
    ↓ Makes it work
```

### **HTML (index.html)** - The Structure
- Creates 5 navigation buttons
- Creates 5 section containers (`<section>`)
- Creates forms for each section
- Creates lists (`<ul>`) to display data
- Creates cards for dashboard display

**Key elements:**
```html
<nav>
  <button data-tab="dashboard">Dashboard</button>
  <!-- Each button has data-tab="name" to identify which section to show -->
</nav>

<section id="dashboard" class="tab">
  <!-- Content goes here -->
</section>
```

### **CSS (style.css)** - The Styling
- `body`: Main page background
- `nav`: Dark navigation bar
- `nav button`: Styled buttons
- `.tab`: Spacing for sections
- `.hidden`: Makes things invisible
- `form`: Layouts for forms
- `.card`: Dashboard card styling

**Key classes:**
- `.tab` = A section (dashboard, income, expenses, etc.)
- `.hidden` = Applied to hide inactive tabs
- `.card` = Dashboard summary boxes

### **JavaScript (script.js)** - The Brain
Makes everything interactive and functional.

---

## 📋 The 5-Step Pattern Used in Script

Every feature follows this pattern:

### **Step 1: Get HTML Elements**
```javascript
const incomeForm = document.getElementById("incomeForm");
const incomeList = document.getElementById("incomeList");
```
↳ Find the HTML elements to work with

### **Step 2: Create Data Storage**
```javascript
let state = {
  income: [],      // Empty list to store income
  expenses: [],    // Empty list to store expenses
  loans: []        // Empty list to store loans
};
```
↳ Create an object to remember all data

### **Step 3: Handle Form Submission**
```javascript
incomeForm.addEventListener("submit", e => {
  e.preventDefault();           // Don't refresh page
  const amount = e.target[0].value;
  const source = e.target[1].value;
  
  state.income.push({ amount, source });  // Add to storage
  saveState();                   // Save to browser memory
  render();                      // Update the display
});
```
↳ Listen for form submission and process the data

### **Step 4: Save Data**
```javascript
function saveState() {
  localStorage.setItem("financeState", JSON.stringify(state));
}
```
↳ Save data to browser's memory (survives page reload)

### **Step 5: Display Data**
```javascript
function renderIncomeList() {
  const ul = document.getElementById("incomeList");
  ul.innerHTML = "";  // Clear old items
  
  state.income.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.source}: ₹${item.amount}`;
    ul.appendChild(li);  // Add to page
  });
}
```
↳ Show the data on the page

---

## 🔄 How Tab Switching Works

### HTML
```html
<button data-tab="dashboard">Dashboard</button>
<button data-tab="income">Income</button>

<section id="dashboard" class="tab"></section>
<section id="income" class="tab hidden"></section>
```

### JavaScript
```javascript
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab;  // Get which tab to show
    
    tabs.forEach(tab => tab.classList.add("hidden"));        // Hide all
    document.getElementById(tabName).classList.remove("hidden"); // Show selected
  });
});
```

**What happens:**
1. User clicks "Income" button
2. `data-tab="income"` tells which section to show
3. Add `.hidden` to all sections (makes them disappear)
4. Remove `.hidden` from "income" section (makes it appear)

---

## 🗑️ How Delete Buttons Work

```javascript
<button onclick="deleteIncome(${item.id})">Delete</button>
```

When clicked:
```javascript
function deleteIncome(id) {
  state.income = state.income.filter(item => item.id !== id);
  // Remove the item where id matches
  
  saveState();  // Save updated data
  render();     // Update display
}
```

---

## 💾 How Data is Remembered

```javascript
// SAVE
localStorage.setItem("financeState", JSON.stringify(state));
// Converts object to text and saves to browser

// LOAD
const saved = localStorage.getItem("financeState");
if (saved) {
  state = JSON.parse(saved);
  // Converts text back to object
}
```

**Why this matters:**
- Reload the page → data is still there! ✅
- Close the browser → data is still there! ✅
- Switch devices → data is gone (only stored on this device)

---

## 📊 Dashboard Calculations

```javascript
function renderDashboard() {
  // Calculate totals using reduce()
  const incomeTotal = state.income.reduce((sum, i) => sum + i.amount, 0);
  //                  Loop through array    Add up all amounts
  
  const netCashFlow = incomeTotal - expenseTotal - emiTotal;
  // Money in - Money out = What's left
}
```

**The .reduce() function:**
- Adds up all numbers in an array
- `0` = starts at zero
- `sum + i.amount` = add each amount to the running total

---

## 🎮 Common Patterns (Copy These)

### Pattern 1: Get Form Values
```javascript
const amount = +e.target[0].value;  // First input (+ converts to number)
const name = e.target[1].value;     // Second input
```

### Pattern 2: Create New Item with ID
```javascript
state.income.push({
  id: Date.now(),      // Unique timestamp
  amount: 5000,
  source: "Salary",
  date: new Date().toLocaleDateString()  // Today's date
});
```

### Pattern 3: Filter (Remove item by ID)
```javascript
state.income = state.income.filter(item => item.id !== id);
// Keep all items EXCEPT the one with matching ID
```

### Pattern 4: Create HTML Elements
```javascript
const li = document.createElement("li");  // Create empty <li>
li.innerHTML = `<strong>${item.name}</strong>`;  // Add content
ul.appendChild(li);  // Add to page
```

### Pattern 5: Empty a List
```javascript
ul.innerHTML = "";  // Delete all children
```

---

## 🚀 How to Add a New Feature

**Example: Add a "Category Total" feature**

1. **Add to HTML:**
```html
<div id="categoryTotal">Category Total: ₹0</div>
```

2. **Add to JavaScript (in renderDashboard):**
```javascript
const foodExpenses = state.expenses
  .filter(e => e.category === "Food")
  .reduce((sum, e) => sum + e.amount, 0);

document.getElementById("categoryTotal").innerHTML =
  `Category Total: ₹${foodExpenses}`;
```

3. **Call render() when data changes:**
```javascript
render();  // This will automatically update the new category total
```

---

## 🧪 Quick Test Checklist

- [ ] Add income → Shows in Income section
- [ ] Add expense → Shows in Expenses section
- [ ] Reload page → Data still there
- [ ] Click delete → Item removed
- [ ] Dashboard shows correct totals
- [ ] Switch tabs → Correct section shows
- [ ] All calculations correct

---

## 📚 Key Terms

| Term | Means |
|------|-------|
| `state` | Object that stores all your app's data |
| `localStorage` | Browser's memory (survives page reload) |
| `render()` | Update the display to show current data |
| `addEventListener` | Listen for user actions (click, submit) |
| `forEach` | Loop through array items one by one |
| `filter()` | Create new array with only certain items |
| `reduce()` | Add up all numbers in array |
| `id` | Unique identifier for each item |

---

## ✅ You're Done!

Your app is now:
- ✅ Fully functional
- ✅ Saves data automatically
- ✅ Has delete functionality
- ✅ Shows calculations
- ✅ Has tab switching
- ✅ Professional looking

**Next Steps (Optional):**
- Add email export
- Add charts/graphs
- Add budget warnings
- Add multi-user support
- Deploy online
