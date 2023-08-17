document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-btn");
  
    let currentPlayer = "X";
    let isGameActive = true;

    
  
    cells.forEach(cell => {
      cell.addEventListener("click", () => handleCellClick(cell));
    });
  
    resetButton.addEventListener("click", resetGame);
  
    function handleCellClick(cell) {
      if (!isGameActive || cell.textContent !== "") {
        return;
      }
  
      cell.textContent = currentPlayer;
      checkWin();
      togglePlayer();
    }
  

  });
  