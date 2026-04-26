class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push({ type: "deposit", amount: amount });
      return `Successfully deposited $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({ type: "withdraw", amount: amount });
      return `Successfully withdrew $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  }

  checkBalance() {
    return `Current balance: $${this.balance.toFixed(2)}`;
  }

  listAllDeposits() {
    let depos = this.transactions.filter((i) => i.type === "deposit").map((i) => `$${i.amount.toFixed(2)}`);
    return depos.length > 0 ? `Deposits: ${depos.join(", ")}` : "No deposits found.";
  }

  listAllWithdrawals() {
    let withds = this.transactions.filter((i) => i.type === "withdraw").map((i) => `$${i.amount.toFixed(2)}`);
    return withds.length > 0 ? `Withdrawals: ${withds.join(", ")}` : "No withdrawals found.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const myAccount = new BankAccount();

  const balanceDisplay = document.getElementById("current-balance");
  const amountInput = document.getElementById("amount");
  const depositBtn = document.getElementById("deposit-btn");
  const withdrawBtn = document.getElementById("withdraw-btn");
  const feedbackArea = document.getElementById("feedback");
  const showDepositsBtn = document.getElementById("show-deposits-btn");
  const showWithdrawalsBtn = document.getElementById("show-withdrawals-btn");
  const reportOutput = document.getElementById("report-output");

  const updateUI = (message) => {
    balanceDisplay.textContent = `$${myAccount.balance.toFixed(2)}`;
    feedbackArea.textContent = message;
    reportOutput.textContent = "";
  };

  depositBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      feedbackArea.textContent = "Please enter a valid deposit amount.";
      return;
    }
    const msg = myAccount.deposit(amount);
    updateUI(msg);
    amountInput.value = "";
  });

  withdrawBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      feedbackArea.textContent = "Please enter a valid withdrawal amount.";
      return;
    }
    const msg = myAccount.withdraw(amount);
    updateUI(msg);
    amountInput.value = "";
  });

  showDepositsBtn.addEventListener("click", () => {
    reportOutput.textContent = myAccount.listAllDeposits();
    feedbackArea.textContent = "";
  });

  showWithdrawalsBtn.addEventListener("click", () => {
    reportOutput.textContent = myAccount.listAllWithdrawals();
    feedbackArea.textContent = "";
  });

  updateUI("Welcome! Please enter an amount to begin.");
});
