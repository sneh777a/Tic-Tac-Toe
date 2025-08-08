let currentPlayer = 'X';
let cells;
let status;
let gameOver = false;

window.onload = () => {
    cells = document.querySelectorAll('.cell');
    status = document.getElementById('status');
    resetBoard();
};

function makeMove(cell) {
    if (!cell.innerHTML && !gameOver) {
        cell.innerHTML = currentPlayer;
        cell.style.pointerEvents = 'none';

        const winningPattern = checkWinner();
        if (winningPattern) {
            highlightWinner(winningPattern);
            status.innerHTML = `🎉 Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if ([...cells].every(c => c.innerHTML)) {
            status.innerHTML = "🤝 It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            status.innerHTML = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].innerHTML &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML
        ) {
            return pattern;
        }
    }
    return null;
}

function highlightWinner(pattern) {
    pattern.forEach(index => {
        cells[index].style.backgroundColor = '#90EE90'; // light green highlight
    });
}

function resetBoard() {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.pointerEvents = 'auto';
        cell.style.backgroundColor = ''; // remove highlight
    });
    currentPlayer = 'X';
    status.innerHTML = `Player ${currentPlayer}'s turn`;
    gameOver = false;
}
