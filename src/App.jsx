import { useState } from 'react';
import {FaChessRook, FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn} from "react-icons/fa";
import './App.css';

const PIECES = {
  white:{
    "WKR": <FaChessRook className="white"/>,
    "WKH": <FaChessKnight className="white"/>,
    "WKB": <FaChessBishop className="white"/>,
    "WK": <FaChessKing className="white"/>,
    "WQ": <FaChessQueen className="white"/>,
    "WQB": <FaChessBishop className="white"/>,
    "WQH": <FaChessKnight className="white"/>,
    "WQR": <FaChessRook className="white"/>,
    "WP": <FaChessPawn className="white"/>
  },
  black:{
    "BKR": <FaChessRook className="black"/>,
    "BKH": <FaChessKnight className="black"/>,
    "BKB": <FaChessBishop className="black"/>,
    "BK": <FaChessKing className="black"/>,
    "BQ": <FaChessQueen className="black"/>,
    "BQB": <FaChessBishop className="black"/>,
    "BQH": <FaChessKnight className="black"/>,
    "BQR": <FaChessRook className="black"/>,
    "BP": <FaChessPawn className="black"/>
  },
}


function App() {
  const [board, setBoard] = useState([
    ["BKR", "BKH", "BKB", "BK", "BQ", "BQB", "BQH", "BQR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WKR", "WKH", "WKB", "WK", "WQ", "WQB", "WQH", "WQR"],
    
  ])
  const [move, setMove] = useState(false);
  const [piece, setPiece] = useState("");
  const [prev, setPrev] = useState({
    row: null,
    col: null
  })
  const handleMove = (row, col) => {
    if(board[row][col] === "" && !move) return;
    const pieceMove = board[row][col];
    console.log(board[row][col]);
    console.log(row, col);
    const newBoard = [...board];
    // newBoard[4][6] = "BQ";
    // setBoard(newBoard);
    if(!move){
      setPiece(pieceMove);
      setMove(true);
      setPrev({row, col})
    }
    else{
      newBoard[row][col] = piece;
      newBoard[prev.row][prev.col] = "";
      setBoard(newBoard);
      setMove(false);
    }
  }

  return (
    <div className="App">
      <div className="mainBoard">
        {
          board.map((row, i) => (
            <div className="board" key={i}>
              {
                row.map((column, j) => (
                  <span key={j} onClick={() => handleMove(i,j)}>
                    {
                    board[i][j].startsWith("W") ? PIECES.white[board[i][j]] : "" ||
                    board[i][j].startsWith("B") ? PIECES.black[board[i][j]] : ""
                    }
                  </span>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
