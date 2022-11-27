import { check } from "./check";
import { illegalMove } from "./illegalMove";
import { wrongTurn } from "./wrongTurn";

export const queenMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
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
    setLegalMove({ cross: [...columnMove, ...rowMove], diagonal: [row + col, row - col] });
}
export const queenMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, kingIsUnderAttacked, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy, setKingCheck, setKingIsUnderAttacked, setKingUnderAttackAlert) => {
    const kingChecked = pieceMove.startsWith("W") ? "BK" : "WK";
    if (kingIsUnderAttacked && board[row][col] !== kingChecked) {
        setKingUnderAttackAlert(true);
        setTimeout(() => {
            setKingUnderAttackAlert(false);
        }, 500);
        return;
    }
    //FROM ROOK CODES
    let validMove = false;
    let haveInteraction = false;
    for (let data of legalMove.cross) {
        if (data.row === row && data.col === col) {
            validMove = true;
        }
    }
    //FROM BISHOP CODES
    let havePositiveInteraction = false;
    let haveNegativeInteraction = false;
    //for positive diagonal of bishop move
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
    //for negative diagonal of bishop move
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
    //BISHOP CODES START HERE
    if (haveNegativeInteraction) {
        wrongTurn(pieceMove, setPlayerTurn, true);
        return illegalMove(setIllegalMove);
    }
    if (havePositiveInteraction) {
        wrongTurn(pieceMove, setPlayerTurn, true);
        return illegalMove(setIllegalMove);
    }
    if (!board[row][col].startsWith(pieceMove[0])) {
        if (legalMove.diagonal.includes(row + col) || legalMove.diagonal.includes(row - col)) {
            if (row === firstMove.row && col === firstMove.col) return;
            setPieceDestroy([...pieceDestroy, board[row][col]]);
            const newBoard = [...board];
            newBoard[row][col] = pieceMove;
            newBoard[firstMove.row][firstMove.col] = "";
            setBoard(newBoard);
            setPieceMove("");
            setFirstMove({ row: null, col: null });
            wrongTurn(pieceMove, setPlayerTurn);
        }
        else {
            //ROOK CODES START HERE
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
            //ROOK CODES END HERE
        }
    }
    else {
        illegalMove(setIllegalMove);
        wrongTurn(pieceMove, setPlayerTurn, true);
    }
    //BISHOP CODES END HERE

    //THIS CODE IS FOR CHECKING THE KING
    //CHECK IF THE KING IS UNDERATTACK DIAGONALLY
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
    const kingDia = pieceMove.startsWith("W") ? "BK" : "WK";
    const kingPos = arrPos.indexOf(kingDia);
    const kingNeg = arrNeg.indexOf(kingDia);
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

    //CHECK IF THE KING IS UNDERATTACK CROSS
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
    const kingCross = pieceMove.startsWith("W") ? "BK" : "WK";
    const kingRow = arrRow.indexOf(kingCross);
    const kingCol = arrCol.indexOf(kingCross);
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