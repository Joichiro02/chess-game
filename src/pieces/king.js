import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const kingMoveFrom = (board, row, col, setPieceMove, setFirstMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
}
export const kingMoveTo = (board, row, col, firstMove, pieceMove, setIllegalMove, setPlayerTurn) => {
    if (board[row][col] === "") {
        board[row][col] = pieceMove;
        board[firstMove.row][firstMove.col] = "";
        wrongTurn(pieceMove, setPlayerTurn);
    }
    if (!board[row][col].includes(pieceMove[0])) {
        board[row][col] = pieceMove;
        board[firstMove.row][firstMove.col] = "";
        wrongTurn(pieceMove, setPlayerTurn);
    }
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }

}