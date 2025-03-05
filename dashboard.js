document.addEventListener("DOMContentLoaded", function () {
  let income = 0;
  let expense = 0;

  // Initialize Chart.js
  const ctx = document.getElementById("incomeExpenseChart").getContext("2d");

  let incomeExpenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: ["#4caf50", "#f44336"], // Green for income, Red for expense
        },
      ],
    },
    options: {
      aspectRatio: 1, // Ensures the chart is always circular
      responsive: true,
    },
  });

  // Array of financial tips for income and expenses
  const incomeTips = [
    "💰 Save at least 20% of your income every month.",
    "📈 Invest in upskilling courses to boost your income.",
    "🏦 Consider passive income sources like stock investments.",
    "📊 Automate your savings for better financial growth.",
    "🔄 Diversify your income sources for financial stability.",
  ];

  const expenseTips = [
    "⚠️ Cut down unnecessary expenses like frequent dining out.",
    "📉 Create a budget to track your spending patterns.",
    "🛍️ Avoid impulse purchases by following the 24-hour rule.",
    "💡 Compare prices before making big purchases.",
    "🏷️ Look for discounts and cashback offers when shopping.",
  ];

  // Function to update the chart
  function updateChart() {
    incomeExpenseChart.data.datasets[0].data = [income, expense];
    incomeExpenseChart.update();
  }

  // Function to update financial tips
  function updateFinancialTips() {
    const incomeTipElement = document.getElementById("incomeTip");
    const expenseTipElement = document.getElementById("expenseTip");

    // Display a random income tip if income exists
    if (income > 0) {
      incomeTipElement.innerText =
        "💰 Income Tip: " +
        incomeTips[Math.floor(Math.random() * incomeTips.length)];
    } else {
      incomeTipElement.innerText = "";
    }

    // Display a random expense tip if expense exists
    if (expense > 0) {
      expenseTipElement.innerText =
        "💸 Expense Tip: " +
        expenseTips[Math.floor(Math.random() * expenseTips.length)];
    } else {
      expenseTipElement.innerText = "";
    }
  }

  // Form submission event
  document
    .getElementById("incomeExpenseForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page refresh

      const type = document.getElementById("type").value;
      const category = document.getElementById("category").value.trim();
      const amount = parseFloat(document.getElementById("amount").value);

      // **🚨 Validate Category Field (Only Letters Allowed)**
      const categoryRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
      if (!categoryRegex.test(category)) {
        alert("⚠️ Invalid category! Only letters are allowed.");
        return;
      }

      // Validate Amount
      if (isNaN(amount) || amount <= 0) {
        alert("⚠️ Please enter a valid amount!");
        return;
      }

      // Update income or expense
      if (type === "income") {
        income += amount;
      } else {
        expense += amount;
      }

      // Update UI values
      document.getElementById("totalIncome").textContent = income;
      document.getElementById("totalExpense").textContent = expense;
      document.getElementById("savings").textContent = income - expense;

      // Update the chart & financial tip
      updateChart();
      updateFinancialTips();

      // Clear input fields
      document.getElementById("amount").value = "";
      document.getElementById("category").value = "";
    });

  // Initial chart and tip update
  updateChart();
  updateFinancialTips();
});

// function simpleTaxCalculator() {
//   let totalIncome =
//     parseFloat(document.getElementById("simpleIncome").value) || 0;
//   let tax = 0;

//   if (totalIncome > 1000000) {
//     tax = (totalIncome - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
//   } else if (totalIncome > 500000) {
//     tax = (totalIncome - 500000) * 0.2 + 250000 * 0.05;
//   } else if (totalIncome > 250000) {
//     tax = (totalIncome - 250000) * 0.05;
//   }

//   if (totalIncome <= 700000) {
//     tax = 0;
//   }

//   document.getElementById(
//     "simpleTaxResult"
//   ).innerHTML = `Estimated Tax Payable: ₹${tax.toLocaleString("en-IN")}`;
// }

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateTaxButton")
    .addEventListener("click", calculateTax);
});

// function calculateTax() {
//   let income = parseFloat(document.getElementById("income").value) || 0;
//   let deductions = parseFloat(document.getElementById("deductions").value) || 0;
//   let investments =
//     parseFloat(document.getElementById("investments").value) || 0;

//   let taxableIncome = Math.max(income - deductions - investments, 0);
//   let tax = 0;

//   if (taxableIncome > 1000000) {
//     tax = (taxableIncome - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
//   } else if (taxableIncome > 500000) {
//     tax = (taxableIncome - 500000) * 0.2 + 250000 * 0.05;
//   } else if (taxableIncome > 250000) {
//     tax = (taxableIncome - 250000) * 0.05;
//   }

//   if (taxableIncome <= 700000) {
//     tax = 0; // Apply 87A rebate
//   }

//   document.getElementById(
//     "taxResult"
//   ).innerHTML = `Estimated Tax Payable: ₹${tax.toLocaleString("en-IN")}`;

//   suggestInvestments(taxableIncome);
// }

// function suggestInvestments(taxableIncome) {
//   let suggestion = "";
//   if (taxableIncome > 500000) {
//     suggestion =
//       "Consider investing in PPF, ELSS, or NPS to reduce taxable income.";
//   } else {
//     suggestion = "You are already in a lower tax bracket.";
//   }
//   document.getElementById("investmentSuggestion").innerText = suggestion;
// }

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateTaxButton")
    .addEventListener("click", calculateTax);
});

function calculateTax() {
  let income = parseFloat(document.getElementById("income").value) || 0;
  let deductions = parseFloat(document.getElementById("deductions").value) || 0;
  let selectedDeduction =
    parseFloat(document.getElementById("deduction-category").value) || 0;
  let investments =
    parseFloat(document.getElementById("investments").value) || 0;

  // Apply standard deduction if no input is provided
  if (deductions === 0) {
    deductions = selectedDeduction; // Use the selected deduction
  }

  let taxableIncome = Math.max(income - deductions - investments, 0);
  let tax = 0;

  if (taxableIncome > 1000000) {
    tax = (taxableIncome - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
  } else if (taxableIncome > 500000) {
    tax = (taxableIncome - 500000) * 0.2 + 250000 * 0.05;
  } else if (taxableIncome > 250000) {
    tax = (taxableIncome - 250000) * 0.05;
  }

  if (taxableIncome <= 700000) {
    tax = 0; // Apply 87A rebate
  }

  document.getElementById(
    "taxResult"
  ).innerHTML = `Estimated Tax Payable: ₹${tax.toLocaleString("en-IN")}`;

  suggestInvestments(taxableIncome);
}

function suggestInvestments(taxableIncome) {
  let suggestion = "";
  if (taxableIncome > 500000) {
    suggestion =
      "Consider investing in PPF, ELSS, or NPS to reduce taxable income.";
  } else {
    suggestion = "You are already in a lower tax bracket.";
  }
  document.getElementById("investmentSuggestion").innerText = suggestion;
}

function setActive(element) {
  // Remove "active" class from all menu items
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add "active" class to the clicked item
  element.classList.add("active");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}
function setActive(element) {
  document
    .querySelectorAll(".menu-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
}
