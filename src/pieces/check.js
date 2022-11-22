export const check = (setKingCheck) => {
    setKingCheck(true);
    setTimeout(() => {
        setKingCheck(false);
    }, 500);
}