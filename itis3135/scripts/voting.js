let poll = new Map();

function addOption(option) {

  if (!option || option.trim() === "") {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {

  if (!voterId || voterId.trim() === "") {
    return "Please enter a Voter ID to vote.";
  }

  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  let voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
  if (poll.size === 0) return "No options added yet.";

  let res = "<strong>Poll Results:</strong><br>";
  for (let [option, voters] of poll) {
    res += `${option}: ${voters.size} vote(s)<br>`;
  }
  
  return res;
}

// --- UI Logic ---

document.addEventListener("DOMContentLoaded", () => {
    const optionInput = document.getElementById("new-option");
    const addBtn = document.getElementById("add-option-btn");
    const adminFeedback = document.getElementById("admin-feedback");
    const voterIdInput = document.getElementById("voter-id");
    const optionsList = document.getElementById("options-list");
    const voteFeedback = document.getElementById("vote-feedback");
    const resultsDisplay = document.getElementById("results-display");

    const updateUI = () => {
        // Update the voting buttons
        optionsList.innerHTML = "";
        for (let option of poll.keys()) {
            const btn = document.createElement("button");
            btn.textContent = `Vote for ${option}`;
            btn.className = "vote-btn";
            btn.onclick = () => {
                const msg = vote(option, voterIdInput.value);
                voteFeedback.innerHTML = msg;
                resultsDisplay.innerHTML = displayResults();
            };
            optionsList.appendChild(btn);
        }
    };

    addBtn.addEventListener("click", () => {
        const val = optionInput.value.trim();
        const msg = addOption(val);
        adminFeedback.textContent = msg;
        optionInput.value = "";
        updateUI();
        resultsDisplay.innerHTML = displayResults();
    });

    // Optional: Add some default data
    addOption("Chocolate");
    addOption("Vanilla");
    addOption("Strawberry");
    updateUI();
    resultsDisplay.innerHTML = displayResults();
});
