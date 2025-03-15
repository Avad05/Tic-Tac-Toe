console.log("Tic Tac Toe");

const gameBoard = (function ()
{
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMark = (position, marker) =>{
          if(isValidMove(position)){
            board[position] = marker;
            return true;
          }
          return false;
    };

    const isValidMove = (position) =>{
       return board[position] === "";
    };


    const checkWinner = () =>{
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],//columns
            [0, 4, 8], [2, 4, 6]
        ];

        for(let combination of winningCombinations){
            const [a, b, c] = combination;
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                 return board[a];
            }

        }
        return null;
    };

    const ifFull = () => board.every(cell => cell != "");
    const resetBoard = () =>{
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMark, isValidMove, checkWinner, ifFull, resetBoard }
})();



const CreatePlayer = (playerName, marker) =>{
    return { playerName, marker};
};




const gameController = (function(){
    let scores = { X:0, O:0};
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const startGame = () =>{
        players = [
            CreatePlayer("playerX", "X"),
            CreatePlayer("playerO", "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.resetBoard();
        scores = {X:0, O:0};
        displayController.updateScore(scores);
        
    };
    const playTurn = (position) =>{
        if(gameOver || !gameBoard.isValidMove(position)) return false;
        if (gameBoard.getBoard()[position] !== "") {
            return; // Ignore the move if the cell is already occupied
        }
    const currentPlayer = players[currentPlayerIndex];
    gameBoard.placeMark(position, currentPlayer.marker);
    displayController.render();

    const winner = gameBoard.checkWinner();
    if(winner){
        gameOver = true;
        scores[winner]++;
        displayController.updateScore(scores);

        if (scores[winner] === 3) {
            displayController.setMessage(`${currentPlayer.playerName} is the Grand Winner!`);
            return;
        }

        displayController.setMessage(`${currentPlayer.playerName} wins this round!`);
        setTimeout(resetGame, 2000);  // ✅ Reset board after 2 seconds
        return;

        //return `${currentPlayer.playerName} wins!`;
    }else if(gameBoard.ifFull()){
        gameOver = true;
        displayController.setMessage("Its a tie");
        setTimeout(resetGame, 2000);
        return;
    }

    currentPlayerIndex = 1 - currentPlayerIndex;
    return `Next turn: ${players[currentPlayerIndex].playerName}`;
   
};

const resetGame = () => {
    gameOver = false;
    gameBoard.resetBoard();
    displayController.render();
    displayController.setMessage(`New round! ${players[currentPlayerIndex].playerName}'s turn.`);
};

return {startGame, playTurn, resetGame};

})();

const displayController = ( function (){
    const boardElement = document.getElementById("GameBoard");
    const messageElement = document.getElementById("message");
      
    const render = () =>{
        boardElement.innerHTML = "";
        gameBoard.getBoard().forEach((cell, index) =>{
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            if (cell !== "") {
                cellElement.classList.add("taken"); 
            }
            cellElement.addEventListener("click", () =>{
                gameController.playTurn(index)
            });
            boardElement.appendChild(cellElement);
        });
        };
        const setMessage = (message) =>{
            messageElement.textContent = message;
        };

        const updateScore = (scores) => {
            document.getElementById("scoreBoard").textContent = `
                Player X: ${scores.X} | Player O: ${scores.O}
            `;
        };
        return {render, setMessage, updateScore};
}

)();


document.getElementById("startBtn").addEventListener("click", () =>{
    gameController.startGame();
    displayController.render();
    displayController.setMessage("Game Started, X's turn!!!");
})


