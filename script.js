let currentPlayer = 'X';
let gameBoard = [];
let gameOver = false;

for (let i = 1; i <= 9; i++) {
  gameBoard.push('');
  document.getElementById(`box-${i}`).addEventListener('click', () => {
    playMove(i);
  });
}

function playMove(boxNumber) {
  if (gameOver) return;
  if (gameBoard[boxNumber - 1] === '') {
    gameBoard[boxNumber - 1] = currentPlayer;
    document.getElementById(`box-${boxNumber}`).innerText = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
      declareWinner(gameBoard[condition[0]]);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    declareDraw();
  }
}

function declareWinner(winner) {
  gameOver = true;
  document.querySelector('.res').innerText = `Player ${winner} wins!`;
}

function declareDraw() {
  gameOver = true;
  document.querySelector('.res').innerText = 'It\'s a draw!';
}

document.querySelector('.reset').addEventListener('click', () => {
  gameOver = false;
  currentPlayer = 'X';
  gameBoard = [];
  for (let i = 1; i <= 9; i++) {
    gameBoard.push('');
    document.getElementById(`box-${i}`).innerText = '';
  }
  document.querySelector('.res').innerText = 'Result';
});