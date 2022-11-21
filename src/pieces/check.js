export const check = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn) => {
    console.log(pieceMove);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(i+j === row+col){
                console.log("king is underattack", row+col, i+j);
            }
            // console.log(board[i][j]);
        }
    }
    // //for negative diagonal of bishop move
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(board[i][j] === "BK"){
                console.log("king is underattack");
            }
            // console.log(board[i][j]);
        }
    } 
}