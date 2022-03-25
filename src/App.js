import React, { useState, useEffect } from 'react';
import { board } from './components/Board/defaultBoard';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import BoardContext from './components/store/board-context';



function App() {


  const givenWord = 'hello';
  const defaultBoard = board(5, givenWord.split('').length);
  const [currentBoard, setCurrentBoard] = useState(defaultBoard);
  const [currentPos, setCurrentPos] = useState({ attempt: 0, letterPos: 0 });
  // const defaultBoard = board;



  return (

    <div className="App">
      <h1>wordle</h1>
      <BoardContext.Provider value={{ currentBoard, setCurrentBoard, currentPos, setCurrentPos }}>

        <Board
          onUserWord=''
        ></Board>

        <Keyboard />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
