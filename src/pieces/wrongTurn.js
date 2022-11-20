export const wrongTurn = (pieceMove, setPlayerTurn, illegal = false) => {
    if (!illegal) {
        if (pieceMove[0] === "W") {
            setPlayerTurn("B");
        }
        else {
            setPlayerTurn("W");
        }
    }
    else {
        if (pieceMove[0] === "W") {
            setPlayerTurn("W");
        }
        else {
            setPlayerTurn("B");
        }
    }
}