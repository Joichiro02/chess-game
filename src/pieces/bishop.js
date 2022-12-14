import { check } from "./check";
import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const bishopMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
    setLegalMove([row + col, row - col]);
}

export const bishopMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, kingIsUnderAttacked, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy, setKingCheck, setKingIsUnderAttacked, setKingUnderAttackAlert) => {
    const kingChecked = pieceMove.startsWith("W") ? "BK" : "WK";
    if (kingIsUnderAttacked && board[row][col] !== kingChecked) {
        setKingUnderAttackAlert(true);
        setTimeout(() => {
            setKingUnderAttackAlert(false);
        }, 500);
        return;
    }
    let havePositiveInteraction = false;
    let haveNegativeInteraction = false;
    //for positive diagonal
    for (let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++) {
        for (let j = Math.min(firstMove.col, col); j < Math.max(firstMove.col, col); j++) {
            if ((firstMove.row + firstMove.col) === (i + j) && !havePositiveInteraction) {
                if (row === i && col === j) continue;
                if (board[i][j] !== "" && board[i][j] !== pieceMove) {
                    havePositiveInteraction = true;
                }
            }
        }
    }
    //for negative diagonal
    for (let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++) {
        for (let j = Math.min(firstMove.col, col); j < Math.max(firstMove.col, col); j++) {
            if ((firstMove.row - firstMove.col) === (i - j) && !haveNegativeInteraction) {
                if (row === i && col === j) continue;
                if (board[i][j] !== "" && board[i][j] !== pieceMove) {
                    haveNegativeInteraction = true;
                }
            }
        }
    }
    if (haveNegativeInteraction) {
        wrongTurn(pieceMove, setPlayerTurn, true);
        return illegalMove(setIllegalMove);
    }
    if (havePositiveInteraction) {
        wrongTurn(pieceMove, setPlayerTurn, true);
        return illegalMove(setIllegalMove);
    }
    if (!board[row][col].startsWith(pieceMove[0])) {
        if (legalMove.includes(row + col) || legalMove.includes(row - col)) {
            if (row === firstMove.row || col === firstMove.col) {
                illegalMove(setIllegalMove);
                wrongTurn(pieceMove, setPlayerTurn, true);
                return
            };
            if (board[row][col] !== "") {
                setPieceDestroy([...pieceDestroy, board[row][col]]);
            }
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
    }
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }

    //CHECK IF THE KING IS UNDERATTACK
    const arrPos = [];
    const arrNeg = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i + j === row + col && board[i][j] !== "") {
                arrPos.push(board[i][j]);
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i - j === row - col && board[i][j] !== "") {
                arrNeg.push(board[i][j]);
            }
        }
    }
    const king = pieceMove.startsWith("W") ? "BK" : "WK";
    const kingPos = arrPos.indexOf(king);
    const kingNeg = arrNeg.indexOf(king);
    if (kingPos > -1) {
        if (arrPos[kingPos - 1] === pieceMove || arrPos[kingPos + 1] === pieceMove) {
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }
    if (kingNeg > -1) {
        if (arrNeg[kingNeg - 1] === pieceMove || arrNeg[kingNeg + 1] === pieceMove) {
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }
}