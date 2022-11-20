import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const kingMoveFrom = (board, row, col, setPieceMove, setFirstMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
}
export const kingMoveTo = (board, row, col, firstMove, pieceMove, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn) => {
    if (board[row][col] === "") {
        const newBoard = [...board];
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({ row: null, col: null })
        wrongTurn(pieceMove, setPlayerTurn);
    }
    else if (!board[row][col].includes(pieceMove[0])) {
        const newBoard = [...board];
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({ row: null, col: null })
        wrongTurn(pieceMove, setPlayerTurn);
    }
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }

}