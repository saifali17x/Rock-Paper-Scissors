const choicesMap = ["🪨 Rock", "📄 Paper", "✂️ Scissors"];

const GameStats = (() => {
  let totalRounds = 0;
  let humanRoundWins = 0;
  let computerRoundWins = 0;
  let ties = 0;

  let currentSetRounds = 0;
  let currentHumanRoundWins = 0;
  let currentComputerRoundWins = 0;

  let setsPlayed = 0;
  let humanSetsWon = 0;

  return {
    incrementRound: () => {
      totalRounds++;
      currentSetRounds++;
    },
    incrementHumanRoundWin: () => {
      humanRoundWins++;
      currentHumanRoundWins++;
    },
    incrementCompRoundWin: () => {
      computerRoundWins++;
      currentComputerRoundWins++;
    },
    incrementTie: () => ties++,

    incrementSetsPlayed: () => setsPlayed++,
    incrementHumanSetsWon: () => humanSetsWon++,

    getTotalRounds: () => totalRounds,
    getHumanRoundWins: () => humanRoundWins,
    getCompRoundWins: () => computerRoundWins,
    getTies: () => ties,

    getCurrentSetRounds: () => currentSetRounds,
    getCurrentHumanRoundWins: () => currentHumanRoundWins,
    getCurrentCompRoundWins: () => currentComputerRoundWins,

    getSetsPlayed: () => setsPlayed,
    getHumanSetsWon: () => humanSetsWon,

    resetCurrentSet: () => {
      currentSetRounds = 0;
      currentHumanRoundWins = 0;
      currentComputerRoundWins = 0;
    },

    resetAll: () => {
      totalRounds = 0;
      humanRoundWins = 0;
      computerRoundWins = 0;
      ties = 0;
      currentSetRounds = 0;
      currentHumanRoundWins = 0;
      currentComputerRoundWins = 0;
      setsPlayed = 0;
      humanSetsWon = 0;
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
    GameStats.incrementHumanRoundWin();
    return "You win!";
  }
  GameStats.incrementCompRoundWin();
  return "Computer wins!";
}

function updateStatsUI() {
  document.getElementById("totalGames").textContent =
    GameStats.getTotalRounds();
  document.getElementById("humanWins").textContent =
    GameStats.getHumanRoundWins();
  document.getElementById("computerWins").textContent =
    GameStats.getCompRoundWins();
  document.getElementById("ties").textContent = GameStats.getTies();

  const setsPlayed = GameStats.getSetsPlayed();
  const setsWon = GameStats.getHumanSetsWon();
  const winRate =
    setsPlayed === 0 ? 0 : ((setsWon / setsPlayed) * 100).toFixed(2);
  document.getElementById("winRate").textContent = `${winRate}%`;
}

function resetStats() {
  GameStats.resetAll();
  updateStatsUI();
  document.getElementById("result").textContent = "";
}

function checkSetWinner() {
  const human = GameStats.getCurrentHumanRoundWins();
  const comp = GameStats.getCurrentCompRoundWins();

  if (human > comp) {
    GameStats.incrementHumanSetsWon();
    return "You won this set!";
  } else if (comp > human) {
    return "Computer won this set!";
  } else {
    return "This set is a tie!";
  }
}

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(humanChoice, computerChoice);
  GameStats.incrementRound();

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    `<div>You chose: <strong>${choicesMap[humanChoice]}</strong></div>` +
    `<div>Computer chose: <strong>${choicesMap[computerChoice]}</strong></div>` +
    `<div class="mt-4 fs-2 font-poppins fw-bold">${result}</div>`;

  if (GameStats.getCurrentSetRounds() === 5) {
    const setResult = checkSetWinner();
    GameStats.incrementSetsPlayed();
    resultDiv.innerHTML += `<div class="mt-3 fs-3 font-poppins">${setResult}</div>`;
    GameStats.resetCurrentSet();
  }

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
