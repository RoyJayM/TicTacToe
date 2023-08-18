

// document.addEventListener("DOMContentLoaded", function () {
    
//     const cells = document.querySelectorAll(".cell");
//     const message = document.getElementById("message");
//     const resetButton = document.getElementById("reset-btn");

    

//     let currentPlayer = "X";
//     let isGameActive = true; 


  
//     cells.forEach(cell => {
//       cell.addEventListener("click", () => handleCellClick(cell));
//     });
  
//     resetButton.addEventListener("click", resetGame);
  
//     function handleCellClick(cell) {
//       if (!isGameActive || cell.textContent !== "") {
//         return;
//       }
  
//       cell.textContent = currentPlayer;
//       checkWin();
//       togglePlayer();
//     }
  
//     // function to help with alternating playing turns
//     function togglePlayer() {
//       currentPlayer = currentPlayer === "X" ? "O" : "X"; 
//       message.textContent = `${currentPlayer}'s tuen now`; 
//     }

//   });
 

// *********** Stating Over *******
// adding event listener (runs only after the HTML content is ready-[fully loaded and parsed])
document.addEventListener("DOMContentLoaded", function () {
  
  // assigning elements to variables for manipulation
  const cells = document.querySelectorAll(".cell");
  const messageX = document.querySelector("#message-x");
  const messageO = document.querySelector("#message-o");
  const resetButton = document.querySelector("#reset-button");
  const scoreboardX = document.querySelector("#score-x");
  const scoreboardO = document.querySelector("#score-o");



  // Initializing the current player to X
  let currentPlayer = "X";

  //tracking whether game is active or has ended
  let isGameActive = true;

  // initializing the game board to have an empty string or player' symbol
  let board = ["", "", "", "", "", "", "", "", ""];
// creating an array of arrays containing indices of cells that form a winning combination
  let winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // variables to track the scores of the players
  let scoreX = 0;
  let scoreO = 0;

// adding a handleClick function - checks if game is active and if clicked cell is empty
  function handleCellClick(i) {
    if (!isGameActive || board[i] !== "") {
      return;
    }
// updating board with current player's mark or symbol
    board[i] = currentPlayer;
    cells[i].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      isGameActive = false;
      displayWinner(currentPlayer);
      updateScore(currentPlayer);
    } else if (board.every(cell => cell !== "")) {
      isGameActive = false;
      displayTie(); //if all cells are occupied but with no winning combination
    } else {
      togglePlayer(); // allows the next players to take their turn to go
    }
  }

  // adding a event listener to track each cell click with a cell reference [i]
  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => handleCellClick(i));
  });


  // adding functionality to the reset button
  resetButton.addEventListener("click", resetGame);


// function to alternate between player X and O
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";    // conditional operator assigns a value to a variable based on a condition
    messageX.style.display = currentPlayer === "X" ? "block" : "none";
    messageO.style.display = currentPlayer === "O" ? "block" : "none";
  }

  // adding a function that loops through the win-combos for each play to see if current player has met the win criteria
  function checkWin(player) {
    return winCombos.some(combo => combo.every(i => board[i] === player));
  }

  // creating a function to display which winnner won the round
  function displayWinner(player) {
    messageX.style.display = "none";
    messageO.style.display = "none";
    const message = `${player} wins!`;
    currentPlayer === "" ? messageX.textContent = message : messageO.textContent = message;
  }

  function displayTie() {
    messageX.style.display = "none";
    messageO.style.display = "none";
    messageX.textContent = "It's a tie!";
    messageO.textContent = "It's a tie!";
  }


  // adding function to keep track of the score for each player
  function updateScore(player) {
    if (player === "X") {
      scoreX++;
      scoreboardX.textContent = `Score X: ${scoreX} `;
    } else if (player === "O") {
      scoreO++;
      scoreboardO.textContent = `Score O: ${scoreO}`;
    }
  }

// adding a reset - restart function that updates if a win-combo is achieved
  function resetGame() {
    currentPlayer = "X";
    isGameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
      cell.textContent = "";
    });
    messageX.style.display = "block";
    messageO.style.display = "none";
  }
});
