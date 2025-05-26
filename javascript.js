const choicesMap = ["🪨 Rock", "📄 Paper", "✂️ Scissors"];

const GameStats = (() => {
  let total = 0;
  let humanWins = 0;
  let computerWins = 0;
  let ties = 0;

  return {
    incrementTotal: () => total++,
    incrementHumanWin: () => humanWins++,
    incrementCompWin: () => computerWins++,
    incrementTie: () => ties++,
    getTotal: () => total,
    getHumanWins: () => humanWins,
    getCompWins: () => computerWins,
    getTies: () => ties,
    reset: () => {
      total = 0;
      humanWins = 0;
      computerWins = 0;
      ties = 0;
    },
  };
})();

function getComputerChoice() {
  return Math.floor(Math.random() * 3);
}

function determineWinner(human, computer) {
  if (human === computer) {
    GameStats.incrementTie();
    return "It's a tie!";
  }
  if (
    (human === 0 && computer === 2) ||
    (human === 1 && computer === 0) ||
    (human === 2 && computer === 1)
  ) {
    GameStats.incrementHumanWin();
    return "You win!";
  }
  GameStats.incrementCompWin();
  return "Computer wins!";
}

function updateStatsUI() {
  document.getElementById("totalGames").textContent = GameStats.getTotal();
  document.getElementById("humanWins").textContent = GameStats.getHumanWins();
  document.getElementById("computerWins").textContent = GameStats.getCompWins();
  document.getElementById("ties").textContent = GameStats.getTies();

  const total = GameStats.getTotal();
  const wins = GameStats.getHumanWins();
  const winRate = total === 0 ? 0 : ((wins / total) * 100).toFixed(2);
  document.getElementById("winRate").textContent = `${winRate}%`;
}

function resetStats() {
  GameStats.reset();
  updateStatsUI();
  document.getElementById("result").textContent = "";
}

function playRound(humanChoice) {
  GameStats.incrementTotal();
  const computerChoice = getComputerChoice();
  const result = determineWinner(humanChoice, computerChoice);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    `<div>You chose: <strong>${choicesMap[humanChoice]}</strong></div>` +
    `<div>Computer chose: <strong>${choicesMap[computerChoice]}</strong></div>` +
    `<div class="mt-4 fs-2 font-poppins fw-bold">${result}</div>`;

  updateStatsUI();
}

document.querySelectorAll(".choice-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = parseInt(btn.getAttribute("data-choice"));
    playRound(choice);
  });
});

document.getElementById("resetBtn").addEventListener("click", resetStats);

updateStatsUI();
