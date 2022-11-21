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
export const rookMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy) => {
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

}