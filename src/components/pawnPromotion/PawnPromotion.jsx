import React from 'react';
import "./pawnPromotion.scss";
import { FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen } from "react-icons/fa";

const PawnPromotion = ({ pieceMove, setBoard, setPawnPromotion, board, row, col }) => {
    const piece = board[row][col].startsWith("W") ? "whiteOfficial" : "blackOfficial";
    const handleClick = (official) => {
        const newBoard = [...board];
        newBoard[row][col] = official;
        setPawnPromotion(false);
        setBoard(newBoard);

    }
    return (
        <div className="pawnPromotionContainer">
            <ul className="officialsContainer">
                <li className="officialContent">
                    <FaChessQueen className={piece} onClick={() => handleClick(board[row][col].startsWith("W") ? "WQ" : "BQ")} />
                </li>
                <li className="officialContent">
                    <FaChessBishop className={piece} onClick={() => handleClick(board[row][col].startsWith("W") ? "WQB" : "BQB")} />
                </li>
                <li className="officialContent">
                    <FaChessRook className={piece} onClick={() => handleClick(board[row][col].startsWith("W") ? "WQR" : "BQR")} />
                </li>
                <li className="officialContent">
                    <FaChessKnight className={piece} onClick={() => handleClick(board[row][col].startsWith("W") ? "WQH" : "BQH")} />
                </li>
            </ul>
        </div>
    )
}

export default PawnPromotion