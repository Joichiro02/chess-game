import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const kingMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
    const top = [[row-1, col-1], [row-1, col], [row-1, col+1]];
    const mid = [[row, col-1], [row, col+1]];
    const bot = [[row+1, col-1], [row+1, col], [row+1, col+1]];
    setLegalMove([...top, ...mid, ...bot]);
}
export const kingMoveTo = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn) => {
    const legalMoves = [];
    for(let move of legalMove){
        legalMoves.push(move[0] === row && move[1] === col);
    }
    const check = legalMoves.some(check => check === true);
    if(check){
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
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }

}