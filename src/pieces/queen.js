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
export const queenMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy) => {
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
            check(board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn);
        }
        else{
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
                if (board[row][col] !== "" && !board[row][col].includes(pieceMove[0]) && validMove) {
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
}