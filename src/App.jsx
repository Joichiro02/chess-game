import { useState } from 'react';
import {FaChessRook, FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn} from "react-icons/fa";
import './App.css';
import { pawnMoveFrom, pawnMoveTo } from "./pieces/pawn";

const PIECES = {
  white:{
    "WKR": <FaChessRook className={"white"}/>,
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

const pieceToMove = (board, row, col) => {
  const pieceName = board[row][col];
  if(["BP", "WP"].includes(pieceName)){
    return "PAWN";
  }
  else if (["BKR", "BQR", "WKR", "WQR"].includes(pieceName)){
    return "ROOK";
  }
  else if (["BKH", "BQH", "WKH", "WQH"].includes(pieceName)){
    return "HORSE";
  }
  else if (["BKB", "BQB", "WKB", "WQB"].includes(pieceName)){
    return "BISHOP";
  }
  else if (["BQ", "WQ"].includes(pieceName)){
    return "QUEEN";
  }
  else if (["BK", "WK"].includes(pieceName)){
    return "KING";
  }
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
  ]);
  const [move, setMove] = useState(false);
  const [pieceMove, setPieceMove] = useState("");
  const [pieceMoved, setPieceMoved] = useState("");
  const [firstMove, setFirstMove] = useState({
    row: null,
    col: null
  });
  const [legalMove, setLegalMove] = useState(null);

  const handleMove = (e, row, col) => {
    if(!move && board[row][col] === "") return console.log("please select piece!!!");
    const PIECE = pieceToMove(board, row, col);
    if(!move){
      setMove(true);
      switch (PIECE) {
        case "PAWN":
          setPieceMoved("PAWN");
          pawnMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "ROOK":
          console.log("Rook Move");
          break;
        case "HORSE":
          console.log("Horse Move");
          break;
        case "BISHOP":
          console.log("Bishop Move");
          break;
        case "QUEEN":
          console.log("Queen Move");
          break;
        case "KING":
          console.log("King Move");
          break;
        default:
          break;
      }
    }
    else{
      setMove(false);
      switch (pieceMoved) {
        case "PAWN":
          pawnMoveTo(board, row, col, firstMove, pieceMove, legalMove, setBoard, setPieceMove, setFirstMove);
          break;
        case "ROOK":
          console.log("Rook Move To");
          break;
        case "HORSE":
          console.log("Horse Move To");
          break;
        case "BISHOP":
          console.log("Bishop Move To");
          break;
        case "QUEEN":
          console.log("Queen Move To");
          break;
        case "KING":
          console.log("King Move To");
          break;
        default:
          break;
      }
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
                  <span key={j} onClick={(e) => handleMove(e, i, j)}>
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
