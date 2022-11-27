import { check } from "./check";
import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

const whitePawn = (row, setLegalMove) => {
    if (row === 6) {
        setLegalMove([row - 2, row - 1]);
    }
    else {
        setLegalMove([row - 1]);
    }
}

const blackPawn = (row, setLegalMove) => {
    if (row === 1) {
        setLegalMove([row + 2, row + 1]);
    }
    else {
        setLegalMove([row + 1]);
    }
}

export const pawnMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    const PAWN = board[row][col];
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
    switch (PAWN) {
        case "WP":
            whitePawn(row, setLegalMove)
            break;
        case "BP":
            blackPawn(row, setLegalMove)
            break;
        default:
            break;
    }
}


export const pawnMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, kingIsUnderAttacked, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy, setKingCheck, setKingIsUnderAttacked, setKingUnderAttackAlert, setPawnPromotion) => {
    const kingChecked = pieceMove.startsWith("W") ? "BK" : "WK";
    if (kingIsUnderAttacked && board[row][col] !== kingChecked) {
        setKingUnderAttackAlert(true);
        setTimeout(() => {
            setKingUnderAttackAlert(false);
        }, 500);
        return;
    }
    //for attacking piece
    if (board[row][col] !== "" && (col === firstMove.col + 1 || col === firstMove.col - 1) && pieceMove[0] !== board[row][col][0]) {
        //this is to not allowed the backward attack of white pawn
        if (pieceMove.startsWith("W") && row > firstMove.row) {
            illegalMove(setIllegalMove);
            wrongTurn(pieceMove, setPlayerTurn, true);
            return;
        }
        //this is to not allowed the backward attack of black pawn
        if (pieceMove.startsWith("B") && row < firstMove.row) {
            illegalMove(setIllegalMove);
            wrongTurn(pieceMove, setPlayerTurn, true);
            return;
        }
        //this is to not allowed the more than 2 square move of white pawn
        if (pieceMove.startsWith("W") && row < firstMove.row - 1) {
            illegalMove(setIllegalMove);
            wrongTurn(pieceMove, setPlayerTurn, true);
            return;
        }
        //this is to not allowed the more than 2 square move of black pawn
        if (pieceMove.startsWith("B") && row < firstMove.row + 1) {
            illegalMove(setIllegalMove);
            wrongTurn(pieceMove, setPlayerTurn, true);
            return;
        }
        setPieceDestroy([...pieceDestroy, board[row][col]]);
        const newBoard = [...board];
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({ row: null, col: null });
        wrongTurn(pieceMove, setPlayerTurn);
    }
    // for moving piece
    else if (legalMove.includes(row) && col === firstMove.col && board[row][col] === "") {
        const newBoard = [...board];
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({ row: null, col: null });
        wrongTurn(pieceMove, setPlayerTurn);
    }
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }

    //for checking the king
    if (pieceMove.startsWith("W") && row > 0) {
        if (board[row - 1][col - 1] === "BK" || board[row - 1][col + 1] === "BK") {
            console.log(board[row - 1][col - 1], board[row - 1][col + 1]);
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }
    else if (pieceMove.startsWith("B") && row < 7) {
        if (board[row + 1][col - 1] === "WK" || board[row + 1][col + 1] === "WK") {
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }
    else {
        setPawnPromotion(true);
    }
}