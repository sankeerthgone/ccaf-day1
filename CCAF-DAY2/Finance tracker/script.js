// ============================================================
// COMPLETE FINANCE TRACKER - ALL SECTIONS WORKING
// ============================================================

// ---------------------------
// 1. LOAD & SAVE STATE (Memory)
// ---------------------------

// This object stores ALL your data
let state = {
  income: [],      // List of income entries
  expenses: [],    // List of expenses
  loans: [],       // List of loans
  fds: [],         // List of fixed deposits
  sips: [],        // List of SIPs
  stocks: [],      // List of owned stocks
  watchlist: []    // Stocks to watch
};

// Saves the state to localStorage (Browser's memory)
function saveState() {
  localStorage.setItem("financeState", JSON.stringify(state));
}

// Loads saved state from localStorage when page starts
function loadState() {
  const saved = localStorage.getItem("financeState");
  if (saved) {
    state = JSON.parse(saved);
  }
}
loadState(); // Load data when page starts


// ---------------------------
// 2. TAB SWITCHING (Show/Hide Sections)
// ---------------------------

const tabs = document.querySelectorAll(".tab");
const navButtons = document.querySelectorAll("nav button");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab; // Which tab to show

    tabs.forEach(tab => tab.classList.add("hidden")); // Hide all
    document.getElementById(tabName).classList.remove("hidden"); // Show selected
  });
});


// ---------------------------
// 3. FORM HANDLERS (Get form data when user submits)
// ---------------------------

// INCOME FORM - Add income
document.getElementById("incomeForm").addEventListener("submit", e => {
  e.preventDefault(); // Stop page refresh

  const amount = +e.target[0].value;
  const source = e.target[1].value;

  if (amount > 0 && source.trim()) {
    state.income.push({
      id: Date.now(),
      amount,
      source,
      date: new Date().toLocaleDateString()
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid income details!");
  }
});

// EXPENSE FORM - Add expense
document.getElementById("expenseForm").addEventListener("submit", e => {
  e.preventDefault();

  const amount = +e.target[0].value;
  const category = e.target[1].value;
  const date = e.target[2].value;
  const why = e.target[3].value;

  if (amount > 0 && category.trim()) {
    state.expenses.push({
      id: Date.now(),
      amount,
      category,
      date: date || new Date().toLocaleDateString(),
      why
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid expense details!");
  }
});

// LOAN FORM - Add loan
document.getElementById("loanForm").addEventListener("submit", e => {
  e.preventDefault();

  const emi = +e.target[0].value;
  const rate = +e.target[1].value;
  const months = +e.target[2].value;

  if (emi > 0 && rate >= 0 && months > 0) {
    state.loans.push({
      id: Date.now(),
      emi,
      rate,
      months
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid loan details!");
  }
});

// FD FORM - Add Fixed Deposit
document.getElementById("fdForm").addEventListener("submit", e => {
  e.preventDefault();

  const principal = +e.target[0].value;
  const rate = +e.target[1].value;
  const date = e.target[2].value;

  if (principal > 0 && rate > 0) {
    state.fds.push({
      id: Date.now(),
      principal,
      rate,
      date: date || new Date().toLocaleDateString()
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid FD details!");
  }
});

// SIP FORM - Add SIP
document.getElementById("sipForm").addEventListener("submit", e => {
  e.preventDefault();

  const monthly = +e.target[0].value;
  const date = e.target[1].value;

  if (monthly > 0) {
    state.sips.push({
      id: Date.now(),
      monthly,
      date: date || new Date().toLocaleDateString()
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid SIP amount!");
  }
});

// STOCK FORM - Add owned stock
document.getElementById("stockForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = e.target[0].value;
  const sector = e.target[1].value;
  const quantity = +e.target[2].value;
  const buyPrice = +e.target[3].value;

  if (name.trim() && quantity > 0 && buyPrice > 0) {
    state.stocks.push({
      id: Date.now(),
      name,
      sector,
      quantity,
      buyPrice,
      totalInvested: quantity * buyPrice
    });
    saveState();
    render();
    e.target.reset();
  } else {
    alert("Please enter valid stock details!");
  }
});

// QUICK ADD FORMS
document.getElementById("quickIncomeForm").addEventListener("submit", e => {
  e.preventDefault();
  const amount = +e.target[0].value;
  if (amount > 0) {
    state.income.push({
      id: Date.now(),
      amount,
      source: "Salary",
      date: new Date().toLocaleDateString()
    });
    saveState();
    render();
    e.target.reset();
  }
});

document.getElementById("quickExpenseForm").addEventListener("submit", e => {
  e.preventDefault();
  const amount = +e.target[0].value;
  if (amount > 0) {
    state.expenses.push({
      id: Date.now(),
      amount,
      category: "Other",
      date: new Date().toLocaleDateString()
    });
    saveState();
    render();
    e.target.reset();
  }
});


// ---------------------------
// 4. DELETE FUNCTIONS
// ---------------------------

function deleteIncome(id) {
  state.income = state.income.filter(item => item.id !== id);
  saveState();
  render();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(item => item.id !== id);
  saveState();
  render();
}

function deleteLoan(id) {
  state.loans = state.loans.filter(item => item.id !== id);
  saveState();
  render();
}

function deleteFD(id) {
  state.fds = state.fds.filter(item => item.id !== id);
  saveState();
  render();
}

function deleteSIP(id) {
  state.sips = state.sips.filter(item => item.id !== id);
  saveState();
  render();
}

function deleteStock(id) {
  state.stocks = state.stocks.filter(item => item.id !== id);
  saveState();
  render();
}


// ---------------------------
// 5. RENDER DASHBOARD (Show Summary)
// ---------------------------

function renderDashboard() {
  // Calculate all totals
  const incomeTotal = state.income.reduce((sum, i) => sum + i.amount, 0);
  const expenseTotal = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const emiTotal = state.loans.reduce((sum, l) => sum + l.emi, 0);
  const sipTotal = state.sips.reduce((sum, s) => sum + s.monthly, 0);
  const debtTotal = state.loans.reduce((sum, l) => sum + (l.emi * l.months), 0);
  const fdTotal = state.fds.reduce((sum, f) => sum + f.principal, 0);
  const sipContributed = state.sips.reduce((sum, s) => sum + s.monthly, 0) * 12;
  const stocksTotal = state.stocks.reduce((sum, s) => sum + s.totalInvested, 0);

  const netCashFlow = incomeTotal - expenseTotal - emiTotal - sipTotal;

  // Update each card
  document.getElementById("netCashFlow").innerHTML =
    `<strong style="font-size:18px; color: ${netCashFlow >= 0 ? 'green' : 'red'};">Net Cash Flow: ₹${netCashFlow.toLocaleString("en-IN")}</strong>`;

  document.getElementById("incomeCard").innerHTML =
    `<strong>Income:</strong><br>₹${incomeTotal.toLocaleString("en-IN")}`;

  document.getElementById("expensesCard").innerHTML =
    `<strong>Expenses:</strong><br>₹${expenseTotal.toLocaleString("en-IN")}`;

  document.getElementById("emiCard").innerHTML =
    `<strong>EMI:</strong><br>₹${emiTotal.toLocaleString("en-IN")}`;

  document.getElementById("sipCard").innerHTML =
    `<strong>SIP (Monthly):</strong><br>₹${sipTotal.toLocaleString("en-IN")}`;

  document.getElementById("debtCard").innerHTML =
    `<strong>Total Debt:</strong><br>₹${debtTotal.toLocaleString("en-IN")}`;

  document.getElementById("fdCard").innerHTML =
    `<strong>FD Total:</strong><br>₹${fdTotal.toLocaleString("en-IN")}`;

  document.getElementById("sipContributionCard").innerHTML =
    `<strong>SIP Annual:</strong><br>₹${sipContributed.toLocaleString("en-IN")}`;

  document.getElementById("stocksCard").innerHTML =
    `<strong>Stocks Invested:</strong><br>₹${stocksTotal.toLocaleString("en-IN")}`;
}


// ---------------------------
// 6. RENDER LISTS (Show data as lists)
// ---------------------------

function renderIncomeList() {
  const ul = document.getElementById("incomeList");
  ul.innerHTML = "";

  if (state.income.length === 0) {
    ul.innerHTML = "<li>No income added yet</li>";
    return;
  }

  state.income.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.source}</strong><br>
          <small>₹${item.amount.toLocaleString("en-IN")} • ${item.date}</small>
        </div>
        <button onclick="deleteIncome(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function renderExpenseList() {
  const ul = document.getElementById("expenseList");
  ul.innerHTML = "";

  if (state.expenses.length === 0) {
    ul.innerHTML = "<li>No expenses added yet</li>";
    return;
  }

  state.expenses.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.category}</strong> - ₹${item.amount.toLocaleString("en-IN")}<br>
          <small>${item.date} ${item.why ? '• ' + item.why : ''}</small>
        </div>
        <button onclick="deleteExpense(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });

  // Update filter dropdown
  const filterSelect = document.getElementById("expenseFilter");
  const categories = [...new Set(state.expenses.map(e => e.category))];
  filterSelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.text = cat;
    filterSelect.appendChild(opt);
  });
}

function renderLoanList() {
  const ul = document.getElementById("loanList");
  ul.innerHTML = "";

  if (state.loans.length === 0) {
    ul.innerHTML = "<li>No loans added yet</li>";
    return;
  }

  state.loans.forEach(item => {
    const totalDebt = item.emi * item.months;
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>EMI: ₹${item.emi.toLocaleString("en-IN")}</strong><br>
          <small>Rate: ${item.rate}% • Months: ${item.months} • Total: ₹${totalDebt.toLocaleString("en-IN")}</small>
        </div>
        <button onclick="deleteLoan(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function renderFDList() {
  const ul = document.getElementById("fdList");
  ul.innerHTML = "";

  if (state.fds.length === 0) {
    ul.innerHTML = "<li>No FDs added yet</li>";
    return;
  }

  state.fds.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>₹${item.principal.toLocaleString("en-IN")}</strong><br>
          <small>Rate: ${item.rate}% • Date: ${item.date}</small>
        </div>
        <button onclick="deleteFD(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function renderSIPList() {
  const ul = document.getElementById("sipList");
  ul.innerHTML = "";

  if (state.sips.length === 0) {
    ul.innerHTML = "<li>No SIPs added yet</li>";
    return;
  }

  state.sips.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>Monthly: ₹${item.monthly.toLocaleString("en-IN")}</strong><br>
          <small>Started: ${item.date} • Annual: ₹${(item.monthly * 12).toLocaleString("en-IN")}</small>
        </div>
        <button onclick="deleteSIP(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function renderStockList() {
  const ul = document.getElementById("stockList");
  ul.innerHTML = "";

  if (state.stocks.length === 0) {
    ul.innerHTML = "<li>No stocks added yet</li>";
    return;
  }

  state.stocks.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.name}</strong> (${item.sector})<br>
          <small>Qty: ${item.quantity} • Buy: ₹${item.buyPrice.toLocaleString("en-IN")} • Total: ₹${item.totalInvested.toLocaleString("en-IN")}</small>
        </div>
        <button onclick="deleteStock(${item.id})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}


// ---------------------------
// 7. MAIN RENDER FUNCTION (Update everything)
// ---------------------------

function render() {
  renderDashboard();
  renderIncomeList();
  renderExpenseList();
  renderLoanList();
  renderFDList();
  renderSIPList();
  renderStockList();
}

// Render everything when page loads
render();
