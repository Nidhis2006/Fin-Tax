// script.js

// Handle Login
document
  .getElementById("loginForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html"; // Redirect to Dashboard
    } else {
      alert(data.message);
    }
  });

// Handle Registration
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful! Please login.");
      window.location.href = "index.html"; // Redirect to Login
    } else {
      alert(data.message);
    }
  });

function calculateTax() {
  let income = parseFloat(document.getElementById("income").value) || 0;
  let tax = 0;

  if (income <= 250000) {
    tax = 0;
  } else if (income <= 500000) {
    tax = (income - 250000) * 0.05;
  } else if (income <= 1000000) {
    tax = 250000 * 0.05 + (income - 500000) * 0.2;
  } else {
    tax = 250000 * 0.05 + 500000 * 0.2 + (income - 1000000) * 0.3;
  }

  document.getElementById(
    "taxResult"
  ).innerText = `Estimated Tax: ₹${tax.toFixed(2)}`;
}

function calculateROI() {
  let investment = parseFloat(document.getElementById("investment").value) || 0;
  let rate = parseFloat(document.getElementById("rate").value) || 0;
  let years = parseFloat(document.getElementById("years").value) || 0;

  let finalAmount = investment * Math.pow(1 + rate / 100, years);
  document.getElementById(
    "roiResult"
  ).innerText = `Final Amount: ₹${finalAmount.toFixed(2)}`;
}

function assessFinancialHealth() {
  let income = parseFloat(document.getElementById("monthlyIncome").value) || 0;
  let expenses =
    parseFloat(document.getElementById("monthlyExpenses").value) || 0;
  let savings = parseFloat(document.getElementById("savings").value) || 0;

  let savingsRate = (savings / income) * 100;
  let assessment = "";

  if (savingsRate >= 20) {
    assessment = "Excellent! You have a strong financial foundation.";
  } else if (savingsRate >= 10) {
    assessment = "Good! Consider increasing your savings rate.";
  } else {
    assessment = "Needs Improvement. Try to reduce expenses and save more.";
  }

  document.getElementById("assessmentResult").innerText = assessment;
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
