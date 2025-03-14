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
        board[position] === "";
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

            return null;
        }
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
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const startGame = (player1Name, PlayerName2) =>{
        players = [
            CreatePlayer(player1Name, "X"),
            CreatePlayer(player2Name, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.resetBoard();
    };
    const playTurn = (position) =>{
        if(gameOver || !gameBoard.isValidMove(position)) return false;
    
    const currentPlayer = players[currentPlayerIndex];
    gameBoard.placeMark(position, currentPlayer.marker);

    const winner = gameBoard.checkWinner();
    if(winner){
        gameOver = true;
        return `${currentPlayer.playerName} wins!`;
    }else if(gameBoard.ifFull()){
        gameOver = true;
        return `It is a tie`;
    }

    currentPlayerIndex = 1 - currentPlayerIndex;
    return `Next turn: ${players[currentPlayerIndex].playerName}`;
   
};
return {startGame, playTurn};

})();