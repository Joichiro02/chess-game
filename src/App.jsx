import classNames from "classnames";
import { useState } from 'react';
import {FaChessRook, FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn} from "react-icons/fa";
import './App.css';

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

const pawnMove = (board, row, col, setPossibleMove) => {
  if(board[row][col] === "WP"){
    if(row === 6){
      setPossibleMove([row - 1, row - 2])
    }
    else{
      setPossibleMove([row - 1])
    }
  }
  else{
    if(row === 2){
      setPossibleMove([row + 1, row + 2])
    }
    else{
      setPossibleMove([row + 1])
    }
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
    
  ])
  const [move, setMove] = useState(false);
  const [playerMove, setPlayerMove] = useState("W");
  const [piece, setPiece] = useState("");
  const [prevMove, setPrevMove] = useState({
    row: null,
    col: null
  })
  const [pawnPossibleRowMove, setPawnPossibleRowMove] = useState([]);
  const [pawnPossibleColMove, setPawnPossibleColMove] = useState([]);
  // const [element, setElement] = useState(null);

  const handleMove = (e, row, col) => {
    console.log(playerMove, board[row][col], board[row][col].includes(playerMove))
    if(board[row][col] === "" && !move) return;
    // if(board[row][col].includes(playerMove) || piece) return;
    const pieceMove = board[row][col];
    console.log({row, col});
    const newBoard = [...board];
    // newBoard[4][6] = "BQ";
    // setBoard(newBoard);
    // if(e.target.localName === "span"){
    //   e.target.classList.add("active");
    //   setElement(e);
    // }
    // else{
    //   console.log(e.target.parentElement.parentElement.classList.add("active"));
      
    // }
    if(!move){
      // e.target.classList.add("active");
      setPiece(pieceMove);
      setMove(true);
      setPrevMove({row, col});
      pawnMove(newBoard, row, col, setPawnPossibleRowMove);
      setPawnPossibleColMove([col]);
    }
    else{
      if(piece.includes("W")){
        setPlayerMove("B")
      }
      else{
        setPlayerMove("W")
      }
      if((piece === "WP" || piece === "BP") && pawnPossibleRowMove.includes(row)){
        if(board[row][col] !== "" && pawnPossibleColMove.includes(col)){
          setMove(false);
        }
        else if(board[row][col].includes("B") || board[row][col].includes("W")){
          newBoard[row][col] = piece;
          newBoard[prevMove.row][prevMove.col] = "";
          setBoard(newBoard);
          setMove(false);
        }
        else if (board[row][col].includes("") && pawnPossibleColMove.includes(col)){
          newBoard[row][col] = piece;
          newBoard[prevMove.row][prevMove.col] = "";
          setBoard(newBoard);
          setMove(false);
        }
        else{
          setMove(false);
        }
      }else{
        setMove(false);
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
