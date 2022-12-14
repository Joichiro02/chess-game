import { check } from "./check";
import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const rookMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
    const columnMove = [];
    for (let i = 0; i < 8; i++) {
        columnMove.push({ row: i, col: col });
    }
    const rowMove = [];
    for (let i = 0; i < 8; i++) {
        rowMove.push({ row: row, col: i });
    }
    setLegalMove([...columnMove, ...rowMove]);

}
export const rookMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, kingIsUnderAttacked, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy, setKingCheck, setKingIsUnderAttacked, setKingUnderAttackAlert) => {
    const kingChecked = pieceMove.startsWith("W") ? "BK" : "WK";
    if (kingIsUnderAttacked && board[row][col] !== kingChecked) {
        setKingUnderAttackAlert(true);
        setTimeout(() => {
            setKingUnderAttackAlert(false);
        }, 500);
        return;
    }
    let validMove = false;
    let haveInteraction = false;
    for (let data of legalMove) {
        if (data.row === row && data.col === col) {
            validMove = true;
        }
    }
    if (firstMove.row === row) {
        for (let i = Math.min(col, firstMove.col); i < Math.max(col, firstMove.col); i++) {
            if (!haveInteraction) {
                if (board[row][i] !== "") {
                    if (board[row][i] === pieceMove) {
                        haveInteraction = false;
                    }
                    else {
                        if (col === i) continue;
                        haveInteraction = true;
                    }
                }
            }
            else {
                break;
            }
        }
    }
    else {
        for (let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++) {
            if (!haveInteraction) {
                if (board[i][col] !== "") {
                    if (board[i][col] === pieceMove) {
                        haveInteraction = false;
                    }
                    else {
                        if (row === i) continue;
                        haveInteraction = true;
                    }
                }
            }
            else {
                break;
            }
        }
    }

    if (haveInteraction) {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }
    else {
        if (board[row][col] !== "" && !board[row][col].startsWith(pieceMove[0]) && validMove) {
            setPieceDestroy([...pieceDestroy, board[row][col]]);
            const newBoard = [...board];
            newBoard[row][col] = pieceMove;
            newBoard[firstMove.row][firstMove.col] = "";
            setBoard(newBoard);
            setPieceMove("");
            setFirstMove({ row: null, col: null })
            wrongTurn(pieceMove, setPlayerTurn);
        }
        else if (board[row][col] === "" && validMove) {
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

    //THIS CODE IS FOR CHECKING THE KING
    //CHECK IF THE KING IS UNDERATTACK
    const arrRow = [];
    const arrCol = [];
    for (let i = 0; i < 8; i++) {
        if (board[row][i] !== "") {
            arrRow.push(board[row][i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (board[i][col] !== "") {
            arrCol.push(board[i][col]);
        }
    }
    const king = pieceMove.startsWith("W") ? "BK" : "WK";
    const kingRow = arrRow.indexOf(king);
    const kingCol = arrCol.indexOf(king);
    if (kingRow > -1) {
        if (arrRow[kingRow - 1] === pieceMove || arrRow[kingRow + 1] === pieceMove) {
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }
    if (kingCol > -1) {
        if (arrCol[kingCol - 1] === pieceMove || arrCol[kingCol + 1] === pieceMove) {
            setKingIsUnderAttacked(true);
            check(setKingCheck);
        }
    }

}