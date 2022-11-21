import React, { useState, useEffect } from 'react';
import './App.css';
import classNames from "classnames";
import { FaChessRook, FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn } from "react-icons/fa";
import { bishopMoveFrom, bishopMoveTo } from "./pieces/bishop";
import { kingMoveFrom, kingMoveTo } from "./pieces/king";
import { knightMoveFrom, knightMoveTo } from "./pieces/knight";
import { pawnMoveFrom, pawnMoveTo } from "./pieces/pawn";
import { queenMoveFrom, queenMoveTo } from "./pieces/queen";
import { rookMoveFrom, rookMoveTo } from "./pieces/rook";
import PopUp from "./components/popUp/PopUp";
import sound from "./sounds/move.mp3";

/*
  BUGS
    -black bishop to white bishop can't attack each other
*/

const PIECES = {
  white: {
    "WKR": <FaChessRook className={"white"} />,
    "WKH": <FaChessKnight className="white" />,
    "WKB": <FaChessBishop className="white" />,
    "WK": <FaChessKing className="white" />,
    "WQ": <FaChessQueen className="white" />,
    "WQB": <FaChessBishop className="white" />,
    "WQH": <FaChessKnight className="white" />,
    "WQR": <FaChessRook className="white" />,
    "WP": <FaChessPawn className="white" />
  },
  black: {
    "BKR": <FaChessRook className="black" />,
    "BKH": <FaChessKnight className="black" />,
    "BKB": <FaChessBishop className="black" />,
    "BK": <FaChessKing className="black" />,
    "BQ": <FaChessQueen className="black" />,
    "BQB": <FaChessBishop className="black" />,
    "BQH": <FaChessKnight className="black" />,
    "BQR": <FaChessRook className="black" />,
    "BP": <FaChessPawn className="black" />
  },
}

const pieceToMove = (board, row, col) => {
  const pieceName = board[row][col];
  if (["BP", "WP"].includes(pieceName)) {
    return "PAWN";
  }
  else if (["BKR", "BQR", "WKR", "WQR"].includes(pieceName)) {
    return "ROOK";
  }
  else if (["BKH", "BQH", "WKH", "WQH"].includes(pieceName)) {
    return "HORSE";
  }
  else if (["BKB", "BQB", "WKB", "WQB"].includes(pieceName)) {
    return "BISHOP";
  }
  else if (["BQ", "WQ"].includes(pieceName)) {
    return "QUEEN";
  }
  else if (["BK", "WK"].includes(pieceName)) {
    return "KING";
  }
}

const wrongMove = (playerTurn, setWrongTurn) => {
  if (playerTurn === "W") {
    setWrongTurn(true);
    setTimeout(() => {
      setWrongTurn(false)
    }, [500])
  }
  else {
    setWrongTurn(true);
    setTimeout(() => {
      setWrongTurn(false)
    }, [500])
  }
}

function App() {
  // use Audio constructor to create HTMLAudioElement
  const audioTune = new Audio(sound);

  const [board, setBoard] = useState([
    ["BQR", "BQH", "BQB", "BQ", "BK", "BKB", "BKH", "BKR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WQR", "WQH", "WQB", "WQ", "WK", "WKB", "WKH", "WKR"],
  ]);
  const [move, setMove] = useState(false); // check if the piece is have been moved
  const [pieceMove, setPieceMove] = useState(""); // record here the piece code that use in the array board
  const [pieceMoved, setPieceMoved] = useState(""); // record the name of the piece that have been moved, it wull use in switch case
  const [firstMove, setFirstMove] = useState({
    row: null,
    col: null
  }); // put here the row and column that will going to move
  const [legalMove, setLegalMove] = useState(null); // add here the list of legal move
  const [illegalMove, setIllegalMove] = useState(false); // this is use to trigger the popup modal
  const [activeElement, setActiveElement] = useState(null); // save the element that have been click
  const [playerTurn, setPlayerTurn] = useState("W");
  const [wrongTurn, setWrongTurn] = useState(false);
  const [pieceDestroy, setPieceDestroy] = useState([]); //save here the pieces that destroy
  // const [lastMove, setLastMove] = useState("B") for player turn

  const handleMove = (e, row, col) => {
    if (!move && board[row][col] === "") return console.log("please select piece!!!");
    // if(board[row][col].startsWith(lastMove)) return alert(lastMove === "B" ? "White Turn" : "Black Turn"); //for player turn
    const PIECE = pieceToMove(board, row, col);
    if (!move) {
      if (playerTurn !== board[row][col][0]) return wrongMove(playerTurn, setWrongTurn);
      setMove(true);
      const boxes = document.getElementsByClassName("box");
      for (let box of boxes) {
        box.classList.remove("hasHover");
      }
      if (e.target.localName === "span") {
        e.target.classList.add("hasToMoved");
        setActiveElement(e.target);
      }
      else if (e.target.localName === "svg") {
        e.target.parentElement.classList.add("hasToMoved");
        setActiveElement(e.target.parentElement);
      }
      else if (e.target.localName === "path") {
        e.target.parentElement.parentElement.classList.add("hasToMoved");
        setActiveElement(e.target.parentElement.parentElement);
      }
      switch (PIECE) {
        case "PAWN":
          setPieceMoved("PAWN");
          pawnMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "ROOK":
          setPieceMoved("ROOK");
          rookMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "HORSE":
          setPieceMoved("HORSE");
          knightMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "BISHOP":
          setPieceMoved("BISHOP");
          bishopMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "QUEEN":
          setPieceMoved("QUEEN");
          queenMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        case "KING":
          setPieceMoved("KING");
          kingMoveFrom(board, row, col, setPieceMove, setFirstMove, setLegalMove);
          break;
        default:
          break;
      }
    }
    else {
      audioTune.play();
      const boxes = document.getElementsByClassName("box");
      for (let box of boxes) {
        if (box.innerHTML === "") continue;
        box.classList.add("hasHover");
      }
      activeElement.classList.remove("hasToMoved");
      setActiveElement(null);
      setMove(false);
      // setLastMove(pieceMove[0]) for player turn
      switch (pieceMoved) {
        case "PAWN":
          pawnMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        case "ROOK":
          rookMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        case "HORSE":
          knightMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        case "BISHOP":
          bishopMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        case "QUEEN":
          queenMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        case "KING":
          kingMoveTo(board, row, col, firstMove, pieceMove, legalMove, pieceDestroy, setBoard, setPieceMove, setFirstMove, setIllegalMove, setPlayerTurn, setPieceDestroy);
          break;
        default:
          break;
      }
    }
  }
  
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, []);

  return (
    <div className="App">
      <div className="piecesDestroy">
        {
          pieceDestroy ? pieceDestroy.map((item, index) => (
            <React.Fragment key={index}>
              {PIECES.white[item]}
            </React.Fragment>
          )) : null
        }
      </div>
      <div className="mainBoard">
        {
          board.map((row, i) => (
            <div className="board" key={i}>
              {
                row.map((column, j) => (
                  <span key={j} onClick={(e) => handleMove(e, i, j)} className={classNames("box", { "hasHover": board[i][j] !== "" })}>
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
      <div className="piecesDestroy">
        {
          pieceDestroy ? pieceDestroy.map((item, index) => (
            <React.Fragment key={index}>
              {PIECES.black[item]}
            </React.Fragment>
          )) : null
        }
      </div>
      {illegalMove ? <PopUp message={"Illegal Move!!!"} /> : null}
      {wrongTurn ? <PopUp message={playerTurn === "W" ? "White turn" : "Black Turn"} /> : null}
    </div>
  )
}

export default App
