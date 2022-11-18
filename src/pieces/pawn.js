const whitePawn = (row, setLegalMove) => {
    if(row === 6){
        setLegalMove([row - 2, row - 1]);
    }
    else{
        setLegalMove([row - 1]);
    }
}

const blackPawn = (row, setLegalMove) => {
    if(row === 1){
        setLegalMove([row + 2, row + 1]);
    }
    else{
        setLegalMove([row + 1]);
    }
}

export const pawnMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    const PAWN = board[row][col];
    setPieceMove(board[row][col]);
    setFirstMove({row, col});
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

// const newBoard = [...board];
// newBoard[row][col] = pieceMove;
// newBoard[firstMove.row][firstMove.col] = "";
// setBoard(newBoard);
// setPieceMove("");
// setFirstMove({row:null, col:null});
export const pawnMoveTo = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove) => {
    //for attacking piece
    if(board[row][col] !== "" && (col === firstMove.col + 1 || col === firstMove.col - 1)){
        console.log("attacking");
        const newBoard = [...board]; 
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({row:null, col:null})
    }
    // for moving piece
    else if (legalMove.includes(row) && col === firstMove.col && board[row][col] === ""){
        const newBoard = [...board];
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({row:null, col:null})
    }
    else{
        alert("illegal move")
    }
}