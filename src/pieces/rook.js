export const rookMoveFrom = (board, row, col, setPieceMove, setFirstMove, setLegalMove) => {
    setPieceMove(board[row][col]);
    setFirstMove({row, col});
    const columnMove = [];
    for(let i = 0; i < 8; i++){
        columnMove.push({row: i, col: col});
    }
    const rowMove = [];
    for(let i = 0; i < 8; i++){
        rowMove.push({row: row, col: i});
    }
    setLegalMove([...columnMove, ...rowMove]);
    
}
export const rookMoveTo = (board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove) => {
    let validMove = false;
    let haveInteraction = false;
    for(let data of legalMove){
        if(data.row === row && data.col === col){
            validMove = true;
        }
    }
    if(firstMove.row === row){
        for(let i = Math.min(col, firstMove.col); i < Math.max(col, firstMove.col); i++){
            if(board[row][i] !== ""){
                if(board[row][i] === pieceMove){
                    haveInteraction = false;
                }
                else{
                    haveInteraction = true;
                }
            }
            console.log("same row",  board[row][i]);
        }
    }
    else{
        for(let i = Math.min(firstMove.row, row); i < Math.max(firstMove.row, row); i++){
            if(board[i][col] !== ""){
                if(board[i][col] === pieceMove){
                    haveInteraction = false;
                }
                else{
                    haveInteraction = true;
                }
            }
            console.log("same col",  board[i][col]);
        }
    }

    console.log(haveInteraction);

    if(board[row][col] !== "" && !board[row][col].includes(pieceMove[0]) && validMove && !haveInteraction){
        const newBoard = [...board]; 
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({row:null, col:null})
    }
    else if(board[row][col] === "" && validMove  && !haveInteraction){
        const newBoard = [...board]; 
        newBoard[row][col] = pieceMove;
        newBoard[firstMove.row][firstMove.col] = "";
        setBoard(newBoard);
        setPieceMove("");
        setFirstMove({row:null, col:null});
    }
    else{
        alert("illegal move")
    }
    
}