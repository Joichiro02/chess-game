export const queenMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({row, col});
    const topSide = [{row: row + 2, col: col - 1}, {row: row + 2, col: col + 1}];
    const bottomSide = [{row: row - 2, col: col - 1}, {row: row - 2, col: col + 1}];
    const rightSide = [{row: row + 1, col: col + 2}, {row: row - 1, col: col + 2}];
    const leftSide = [{row: row + 2, col: col - 2}, {row: row - 1, col: col - 2}];
    setLegalMove({cross:[row + col, row - col], diagonal:[...topSide, ...bottomSide, ...rightSide, ...leftSide]});
}
export const queenMoveTo = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove) => {
    console.log(legalMove)
    board[row][col] = pieceMove;
    board[firstMove.row][firstMove.col] = "";
}