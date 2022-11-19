export const bishopMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({row, col});
    setLegalMove([row + col, row - col]);
}

export const bishopMoveTo = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove) => {
    console.log(row, col)
    let havePositiveInteraction = false;
    let haveNegativeInteraction = false;
    for(let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++){
        for(let j = Math.min(firstMove.col, col); j < Math.max(firstMove.col, col); j++){
            if((firstMove.row + firstMove.col) === (i + j) && !havePositiveInteraction){
                console.log(board[i][j])
                if(row === i && col === j)continue;
                if(board[i][j] !== "" && board[i][j] !== pieceMove){
                    havePositiveInteraction = true
                }
            }
        }
    }
    for(let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++){
        for(let j = Math.min(firstMove.col, col); j < Math.max(firstMove.col, col); j++){
            if((firstMove.row - firstMove.col) === (i - j) && !haveNegativeInteraction){
                if(row === i && col === j)continue;
                if(board[i][j] !== "" && board[i][j] !== pieceMove){
                    haveNegativeInteraction = true
                }
            }
        }
    }
    if(haveNegativeInteraction) return alert("illegal move");
    if(havePositiveInteraction) return alert("illegal move");
    if(!board[row][col].includes(pieceMove[0])){
        if(legalMove.includes(row + col) || legalMove.includes(row - col)){
            if(row === firstMove.row && col === firstMove.col) return;
            board[row][col] = pieceMove;
            board[firstMove.row][firstMove.col] = "";
        }
    }
    else{
        alert("illegal move");
    }
}