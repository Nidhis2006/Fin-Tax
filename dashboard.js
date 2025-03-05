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

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateTaxButton")
    .addEventListener("click", calculateTax);
});

function calculateTax() {
  let income = parseFloat(document.getElementById("income").value) || 0;
  let tax = 0;

  if (income > 1500000) {
    tax += (income - 1500000) * 0.3;
    income = 1500000;
  }
  if (income > 1200000) {
    tax += (income - 1200000) * 0.2;
    income = 1200000;
  }
  if (income > 900000) {
    tax += (income - 900000) * 0.15;
    income = 900000;
  }
  if (income > 600000) {
    tax += (income - 600000) * 0.1;
    income = 600000;
  }
  if (income > 300000) {
    tax += (income - 300000) * 0.05;
  }

  document.getElementById("result").innerHTML = `Estimated Tax: ₹${tax.toFixed(
    2
  )}`;
  document.getElementById("tips").style.display = "block";
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

function startTaxFiling() {
  alert("Redirecting to E-Filing portal...");
  // Implement actual e-filing logic here
}

function generateAIRecommendations() {
  document.getElementById("ai-recommendations").innerHTML =
    "📊 Based on your income & expenses, we suggest investing in mutual funds for long-term growth.";
}

function setActive(element) {
  document
    .querySelectorAll(".menu-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
}

function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

function calculateInvestment() {
  let principal = document.getElementById("principal").value;
  let rate = document.getElementById("rate").value;
  let time = document.getElementById("time").value;

  if (principal === "" || rate === "" || time === "") {
    alert("Please fill in all fields.");
    return;
  }

  let interestRate = rate / 100;
  let futureValue = principal * Math.pow(1 + interestRate, time);

  document.getElementById(
    "result"
  ).innerHTML = `Future Value: ₹${futureValue.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const reportsList = document.getElementById("reports-list");

  reportsList.innerHTML = "<p class='loading'>Fetching reports...</p>";

  setTimeout(() => {
    const reports = [
      { name: "Tax Report 2024", url: "/reports/tax-2024.pdf" },
      {
        name: "Annual Financial Summary",
        url: "/reports/financial-summary.pdf",
      },
      {
        name: "Expense Breakdown Report",
        url: "/reports/expense-breakdown.pdf",
      },
    ];

    reportsList.innerHTML = "";

    reports.forEach((report) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = report.name;
      link.href = report.url;
      link.target = "_blank";

      listItem.appendChild(link);
      reportsList.appendChild(listItem);
    });
  }, 2000);
});

// document.getElementById("start-filing").addEventListener("click", () => {
//   document.getElementById("wizard").classList.remove("hidden");
// });

// function nextStep(step) {
//   // Hide all steps
//   document.querySelectorAll("#wizard > div").forEach((div) => {
//     div.classList.add("hidden");
//   });

//   // Show the next step
//   const nextStepDiv = document.getElementById(`step-${step}`);
//   if (nextStepDiv) {
//     nextStepDiv.classList.remove("hidden");
//   } else {
//     console.error(`Step ${step} not found!`);
//   }
// }

// function calculateIncomeTax() {
//   const income = Number(document.getElementById("income").value);
//   const regime = document.getElementById("tax-regime").value; // Get selected regime
//   let taxableIncome = income;
//   let tax = 0;

//   if (regime === "old") {
//     // Apply standard deduction of ₹50,000 in old regime
//     taxableIncome -= 50000;

//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 1000000)
//         tax = (taxableIncome - 500000) * 0.2 + 12500;
//       else tax = (taxableIncome - 1000000) * 0.3 + 112500;
//     }
//   } else {
//     // New Regime (Post Budget 2023-24)
//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 750000)
//         tax = (taxableIncome - 500000) * 0.1 + 12500;
//       else if (taxableIncome <= 900000)
//         tax = (taxableIncome - 750000) * 0.15 + 37500;
//       else if (taxableIncome <= 1200000)
//         tax = (taxableIncome - 900000) * 0.2 + 75000;
//       else if (taxableIncome <= 1500000)
//         tax = (taxableIncome - 1200000) * 0.25 + 135000;
//       else tax = (taxableIncome - 1500000) * 0.3 + 210000;
//     }
//   }

//   // Display Result
//   document.getElementById(
//     "tax-result"
//   ).textContent = `Estimated Tax (${regime.toUpperCase()} Regime): ₹${tax.toFixed(
//     2
//   )}`;
// }

// Show the wizard when clicking "Start E-Filing"
// document.getElementById("start-filing").addEventListener("click", () => {
//   document.getElementById("wizard").classList.remove("hidden");
// });

// // Function to navigate between steps
// function nextStep(step) {
//   // Hide all steps
//   document.querySelectorAll("#wizard > div").forEach((div) => {
//     div.classList.add("hidden");
//   });

//   // Show the next step
//   const nextStepDiv = document.getElementById(`step-${step}`);
//   if (nextStepDiv) {
//     nextStepDiv.classList.remove("hidden");
//   } else {
//     console.error(`Step ${step} not found!`);
//   }
// }

// // Function to calculate income tax
// function calculateIncomeTax() {
//   const income = Number(document.getElementById("income").value);
//   const regime = document.getElementById("tax-regime").value;
//   let taxableIncome = income;
//   let tax = 0;

//   if (regime === "old") {
//     taxableIncome -= 50000; // Apply standard deduction

//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 1000000)
//         tax = (taxableIncome - 500000) * 0.2 + 12500;
//       else tax = (taxableIncome - 1000000) * 0.3 + 112500;
//     }
//   } else {
//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 750000)
//         tax = (taxableIncome - 500000) * 0.1 + 12500;
//       else if (taxableIncome <= 900000)
//         tax = (taxableIncome - 750000) * 0.15 + 37500;
//       else if (taxableIncome <= 1200000)
//         tax = (taxableIncome - 900000) * 0.2 + 75000;
//       else if (taxableIncome <= 1500000)
//         tax = (taxableIncome - 1200000) * 0.25 + 135000;
//       else tax = (taxableIncome - 1500000) * 0.3 + 210000;
//     }
//   }

//   document.getElementById(
//     "tax-result"
//   ).textContent = `Estimated Tax (${regime.toUpperCase()} Regime): ₹${tax.toFixed(
//     2
//   )}`;
// }

// // Automatically calculate tax when income or tax regime changes
// document.getElementById("income").addEventListener("input", calculateIncomeTax);
// document
//   .getElementById("tax-regime")
//   .addEventListener("change", calculateIncomeTax);

// Show wizard when clicking "Start E-Filing"
// document.getElementById("start-filing").addEventListener("click", () => {
//   document.getElementById("wizard").classList.remove("hidden");
// });

// // Function to move to the next step
// function nextStep(step) {
//   if (step === 2 && !validatePAN()) return;
//   if (step === 3) calculateIncomeTax(); // Auto-calculate before moving to step 3

//   document.querySelectorAll("#wizard > div").forEach((div) => {
//     div.classList.add("hidden");
//   });

//   document.getElementById(`step-${step}`).classList.remove("hidden");
// }

// // Validate PAN format (Indian PAN format: 5 letters + 4 digits + 1 letter)
// function validatePAN() {
//   const pan = document.getElementById("pan").value.trim().toUpperCase();
//   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

//   if (!panRegex.test(pan)) {
//     document.getElementById("pan-error").style.display = "block";
//     return false;
//   }

//   document.getElementById("pan-error").style.display = "none";
//   return true;
// }

// // Function to calculate income tax
// function calculateIncomeTax() {
//   // const income = Number(document.getElementById("income").value);
//   // const regime = document.getElementById("tax-regime").value;
//   let income = Number(incomeField.value.trim());
//   let taxableIncome = income;
//   let tax = 0;

//   if (income <= 0 || isNaN(income)) {
//     document.getElementById("tax-result").textContent =
//       "Please enter a valid income amount!";
//     return;
//   }

//   if (regime === "old") {
//     taxableIncome -= 50000;
//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 1000000)
//         tax = (taxableIncome - 500000) * 0.2 + 12500;
//       else tax = (taxableIncome - 1000000) * 0.3 + 112500;
//     }
//   } else {
//     if (taxableIncome > 250000) {
//       if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
//       else if (taxableIncome <= 750000)
//         tax = (taxableIncome - 500000) * 0.1 + 12500;
//       else if (taxableIncome <= 900000)
//         tax = (taxableIncome - 750000) * 0.15 + 37500;
//       else if (taxableIncome <= 1200000)
//         tax = (taxableIncome - 900000) * 0.2 + 75000;
//       else if (taxableIncome <= 1500000)
//         tax = (taxableIncome - 1200000) * 0.25 + 135000;
//       else tax = (taxableIncome - 1500000) * 0.3 + 210000;
//     }
//   }

//   document.getElementById(
//     "tax-result"
//   ).textContent = `Estimated Tax (${regime.toUpperCase()} Regime): ₹${tax.toFixed(
//     2
//   )}`;
// }

function submitForm() {
  let pan = document.getElementById("pan").value;
  let income = document.getElementById("income").value;
  let regime = document.getElementById("taxRegime").value;

  if (!pan || !income) {
    alert("Please fill in all fields");
    return;
  }

  document.getElementById(
    "result"
  ).innerText = `Tax details submitted! \n PAN: ${pan} \n Income: ₹${income} \n Regime: ${regime}`;
}

// Auto-calculate tax when input changes
document.getElementById("income").addEventListener("input", calculateIncomeTax);
document
  .getElementById("tax-regime")
  .addEventListener("change", calculateIncomeTax);

// Function to submit tax filing
function submitFiling() {
  document.getElementById("submission-status").textContent =
    "✅ Your tax filing has been successfully submitted!";
}

document.getElementById("security-check").addEventListener("click", () => {
  document.getElementById("security-result").textContent =
    "🔍 Running security check...";

  setTimeout(() => {
    document.getElementById("security-result").textContent =
      "✅ Your account is secure with strong encryption and 2FA.";
  }, 2000);
});

document.getElementById("get-recommendation").addEventListener("click", () => {
  const goal = document.getElementById("goal").value;
  const adviceBox = document.getElementById("ai-response");
  const adviceText = document.getElementById("advice");

  if (!goal) {
    adviceText.textContent = "⚠️ Please select a financial goal.";
    adviceBox.classList.remove("hidden");
    return;
  }

  adviceBox.classList.add("hidden");
  adviceText.textContent = "🤖 Analyzing your financial goal...";

  setTimeout(() => {
    let advice = "";

    switch (goal) {
      case "saving":
        advice =
          "✅ Tip: Set aside at least 20% of your income into a high-interest savings account.";
        break;
      case "investment":
        advice =
          "📊 Tip: Diversify your portfolio with stocks, bonds, and real estate for stable returns.";
        break;
      case "tax":
        advice =
          "🧾 Tip: Maximize your tax deductions using Section 80C investments like PPF and ELSS.";
        break;
      default:
        advice = "⚠️ Unable to provide advice. Please select a valid goal.";
    }

    adviceText.textContent = advice;
    adviceBox.classList.remove("hidden");
  }, 2000);
});
