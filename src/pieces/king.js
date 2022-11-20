import { illegalMove } from "./illegalMove";

export const kingMoveFrom = (board, row, col, setPieceMove, setFirstMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
}
export const kingMoveTo = (board, row, col, firstMove, pieceMove, setIllegalMove) => {
    if (board[row][col] === "") {
        board[row][col] = pieceMove;
        board[firstMove.row][firstMove.col] = "";
    }
    else {
        illegalMove(setIllegalMove);
    }

}