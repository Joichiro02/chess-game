import { illegalMove } from "./illegalMove";
import { check } from "./check";
import { wrongTurn } from "./wrongTurn";

export const knightMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({ row, col });
    const topSide = [{ row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 }];
    const bottomSide = [{ row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 }];
    const rightSide = [{ row: row + 1, col: col + 2 }, { row: row - 1, col: col + 2 }];
    const leftSide = [{ row: row + 1, col: col - 2 }, { row: row - 1, col: col - 2 }];
    setLegalMove([...topSide, ...bottomSide, ...rightSide, ...leftSide]);
}
export const knightMoveTo = (board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, kingIsUnderAttacked, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy, setKingCheck, setKingIsUnderAttacked, setKingUnderAttackAlert) => {
    const kingChecked = pieceMove.startsWith("W") ? "BK" : "WK";
    if (kingIsUnderAttacked && board[row][col] !== kingChecked) {
        setKingUnderAttackAlert(true);
        setTimeout(() => {
            setKingUnderAttackAlert(false);
        }, 500);
        return;
    }
    let validMove = false;
    for (let data of legalMove) {
        if (data.row === row && data.col === col) {
            validMove = true;
        }
    }
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

    //check the king
    const kingTurn = pieceMove.startsWith("W") ? "BK" : "WK";
    const topSide = [{ row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 }];
    const bottomSide = [{ row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 }];
    const rightSide = [{ row: row + 1, col: col + 2 }, { row: row - 1, col: col + 2 }];
    const leftSide = [{ row: row + 1, col: col - 2 }, { row: row - 1, col: col - 2 }];
    const possibleCheck = [...topSide, ...bottomSide, ...rightSide, ...leftSide];
    console.log(bottomSide)
    for (let checkKing of possibleCheck) {
        if (checkKing.row < 0 || checkKing.row > 8 || checkKing.col < 0 || checkKing.col > 8) continue;
        if (board[checkKing?.row][checkKing?.col] === kingTurn) {
            setKingIsUnderAttacked(true);
            check(setKingCheck)
        }
    }

}