import React, { useState } from 'react';
import { board } from './components/Board/defaultBoard';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import BoardContext from './components/store/board-context';



function App() {
  const givenWord = 'hello';
  const defaultBoard = board(5, givenWord.split('').length);
  const [currentBoard, setCurrentBoard] = useState(defaultBoard);
  const [currentPos, setCurrentPos] = useState({ attempt: 0, letterPos: 0 });

  const onEnter = () => {
    const newBoard = [...currentBoard];
    if (currentPos.letterPos !== newBoard[0].length) return;  //need to add errorhandler
    // console.log(givenWord.length);
    console.log(currentBoard[currentPos.attempt])
    setCurrentPos(prev => ({
      attempt: prev.attempt++,
      letterPos: 0
    }))
  }

  //if user hit the delete, remove current letter and letter position update previous position.
  const onDelete = () => {
    const newBoard = [...currentBoard];

    if (currentPos.letterPos === 0) return;

    newBoard[currentPos.attempt][currentPos.letterPos - 1] = '';
    setCurrentPos((prev) => ({
      ...prev,
      letterPos: prev.letterPos--
    }))
  }

  const onSelectLetter = (text) => {
    const newBoard = [...currentBoard]
    if (currentPos.letterPos > newBoard[0].length - 1) {
      // need to add errorhandler
      console.log('finish')
      return;
    } else {
      newBoard[currentPos.attempt][currentPos.letterPos] = text;
      setCurrentBoard(newBoard);

      setCurrentPos((prev) => ({
        ...prev,
        letterPos: prev.letterPos++
      }))
      console.log('update letterpos');
    }
  }

  return (

    <div className="App">
      <h1>wordle</h1>
      <BoardContext.Provider value={{
        currentBoard,
        setCurrentBoard,
        currentPos,
        setCurrentPos,
        onEnter,
        onDelete,
        onSelectLetter,
        givenWord
      }}>

        <Board />
        <Keyboard />

      </BoardContext.Provider>
    </div>
  );
}

export default App;
