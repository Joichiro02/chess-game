export const kingMoveFrom = (board, row, col, setPieceMove, setFirstMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({row, col});
}
export const kingMoveTo = (board, row, col, firstMove, pieceMove) => {
    if(board[row][col] === ""){
        board[row][col] = pieceMove;
        board[firstMove.row][firstMove.col] = "";
    }
    else{
        alert("illegal move");
    }

}