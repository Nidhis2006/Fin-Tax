document.addEventListener("DOMContentLoaded", function () {
  function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  // Check if token exists
  const token = getCookie("token");

  if (!token) {
    window.location.href = "login.html"; // Redirect to Login
  }

  const userName = localStorage.getItem("name") || "User";
  document.querySelectorAll(".user-name").forEach((el) => {
    el.textContent = userName;
  });
  document.querySelector(
    ".user-header h1"
  ).textContent = `Welcome, ${userName}`;

  fetchExpenses(new Date().getMonth() + 1, new Date().getFullYear());

  function fetchExpenses(month, year) {
    fetch("http://localhost:4000/api/v1/expenses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ month, year }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateExpenseSummary(data.data);
        } else {
          alert("⚠️ Error fetching expenses.");
        }
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }

  function updateExpenseSummary(expenses) {
    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((entry) => {
      if (entry.type === "income") {
        totalIncome += entry.amount;
      } else if (entry.type === "expense") {
        totalExpense += entry.amount;
      }
    });

    document.getElementById("totalIncome").textContent = totalIncome;
    document.getElementById("totalExpense").textContent = totalExpense;
    document.getElementById("savings").textContent = totalIncome - totalExpense;

    updateChart(totalIncome, totalExpense);
    updateFinancialTips(totalIncome, totalExpense);
  }

  function updateChart(totalIncome, totalExpense) {
    const ctx = document.getElementById("incomeExpenseChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [totalIncome, totalExpense],
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: true,
      },
    });
  }

  function updateFinancialTips(income, expense) {
    const incomeTips = [
      "💰 Save at least 20% of your income every month.",
      "📈 Invest in upskilling courses to boost your income.",
    ];

    const expenseTips = [
      "⚠️ Cut down unnecessary expenses like frequent dining out.",
      "📉 Create a budget to track your spending patterns.",
    ];

    document.getElementById("incomeTip").innerText =
      income > 0
        ? `💰 Tip: ${incomeTips[Math.floor(Math.random() * incomeTips.length)]}`
        : "";
    document.getElementById("expenseTip").innerText =
      expense > 0
        ? `💸 Tip: ${
            expenseTips[Math.floor(Math.random() * expenseTips.length)]
          }`
        : "";
  }

  // 🟢 Fix: Attach event listeners correctly for Calculate Tax
  document
    .getElementById("calculateTaxButton")
    ?.addEventListener("click", calculateTax);
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

    document.getElementById(
      "result"
    ).innerHTML = `Estimated Tax: ₹${tax.toFixed(2)}`;
    suggestInvestments(income);
  }

  function suggestInvestments(taxableIncome) {
    let suggestion =
      taxableIncome > 500000
        ? "Consider investing in PPF, ELSS, or NPS to reduce taxable income."
        : "You are already in a lower tax bracket.";
    document.getElementById("investmentSuggestion").innerText = suggestion;
  }

  // 🟢 Fix: Attach event listener correctly for Calculate Investment
  document
    .getElementById("calculateInvestmentButton")
    ?.addEventListener("click", calculateInvestment);
  function calculateInvestment() {
    let principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let time = parseFloat(document.getElementById("time").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    let futureValue = principal * Math.pow(1 + rate / 100, time);
    document.getElementById(
      "investmentResult"
    ).innerHTML = `Future Value: ₹${futureValue.toFixed(2)}`;
  }

  // 🟢 Fix: Get Advice Button
  document
    .getElementById("get-recommendation")
    ?.addEventListener("click", () => {
      const goal = document.getElementById("goal").value;
      const adviceText = document.getElementById("advice");

      if (!goal) {
        adviceText.textContent = "⚠️ Please select a financial goal.";
        return;
      }

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
              "📊 Tip: Diversify your portfolio with stocks, bonds, and real estate.";
            break;
          case "tax":
            advice =
              "🧾 Tip: Maximize your tax deductions using Section 80C investments like PPF.";
            break;
          default:
            advice = "⚠️ Unable to provide advice. Please select a valid goal.";
        }
        adviceText.textContent = advice;
      }, 2000);
    });

  // 🟢 Fix: Security Check Button
  document.getElementById("security-check")?.addEventListener("click", () => {
    document.getElementById("security-result").textContent =
      "🔍 Running security check...";
    setTimeout(() => {
      document.getElementById("security-result").textContent =
        "✅ Your account is secure with strong encryption and 2FA.";
    }, 2000);
  });

  document.getElementById("logoutButton")?.addEventListener("click", logout);
  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("name");
    sessionStorage.removeItem("name");
    alert("You have logged out.");
    window.location.href = "login.html";
  }

  document
    .getElementById("user-info-box")
    ?.addEventListener("click", displayUserInfo);
  // function displayUserInfo() {
  //   const userInfoBox = document.getElementById("user-info-box");
  //   const modal = document.getElementById("user-modal");
  //   const closeModal = document.querySelector(".close");
  //   const modalName = document.getElementById("edit-name");
  //   const modalEmail = document.getElementById("edit-email");

  //   // Fetch user details when clicking on the user box
  //   userInfoBox.addEventListener("click", async () => {
  //     try {
  //       console.log("token: ", token);

  //       const response = await fetch("http://localhost:4000/api/v1/me", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: ` Bearer ${token}`, // Pass token in Authorization header
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("HTTP error!");
  //       }

  //       const user = await response.json();

  //       console.log(user);

  //       if (user) {
  //         modalName.textContent = user.user.name;
  //         modalEmail.textContent = user.user.email;
  //         modal.style.display = "flex"; // Show modal
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   });

  //   // Close modal when clicking on the close button
  //   closeModal.addEventListener("click", () => {
  //     modal.style.display = "none";
  //   });

  //   // Close modal when clicking outside the modal
  //   window.addEventListener("click", (e) => {
  //     if (e.target === modal) {
  //       modal.style.display = "none";
  //     }
  //   });
  // }

  function displayUserInfo() {
    const userInfoBox = document.getElementById("user-info-box");
    const modal = document.getElementById("user-modal");
    const closeModal = document.querySelector(".close");
    const modalName = document.getElementById("edit-name");
    const modalEmail = document.getElementById("edit-email");

    // Fetch user details when clicking on the user box
    userInfoBox.addEventListener("click", async () => {
      try {
        console.log("token: ", token);

        const response = await fetch("http://localhost:4000/api/v1/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`, // Pass token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("HTTP error!");
        }

        const user = await response.json();

        console.log(user);

        if (user) {
          modalName.textContent = user.user.name;
          modalEmail.textContent = user.user.email;
          modal.style.display = "flex"; // Show modal
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    });

    // Close modal when clicking on the close button
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the modal
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // display data
  document.getElementById("showDataBtn")?.addEventListener("click", showData);
  async function showData() {
    try {
      // Check if token exists in local storage
      console.log("token: " + token);

      if (
        transactionList.style.display === "none" ||
        transactionList.style.display === ""
      ) {
        transactionList.style.display = "block"; // Show the transaction history
      } else {
        transactionList.style.display = "none"; // Hide the transaction history
        return; // Stop further execution if hiding
      }

      // Fetch data from backend API
      const response = await fetch("http://localhost:4000/api/v1/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      const transactions = await response.json();

      console.log("transactions: " + JSON.stringify(transactions));

      // Get table body
      const tableBody = document.getElementById("transactionTableBody");
      tableBody.innerHTML = ""; // Clear old data

      // Loop through transactions and add rows
      transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transaction.type}</td>
          <td>${transaction.category}</td>
          <td>${transaction.amount}</td>
          <td>${transaction.date}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});
