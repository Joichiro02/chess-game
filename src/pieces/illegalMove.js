export const illegalMove = (setIllegalMove) => {
    setIllegalMove(true);
    setTimeout(() => {
        setIllegalMove(false);
    }, 500);
}