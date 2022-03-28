import React, { useState, useEffect } from 'react';
import { board } from './components/Board/defaultBoard';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import BoardContext from './components/store/board-context';



function App() {
  let givenWord = 'hello';
  let defaultBoard = board(5, givenWord.split('').length);
  const [currentBoard, setCurrentBoard] = useState(defaultBoard);
  const [currentPos, setCurrentPos] = useState({ attempt: 0, letterPos: 0 });
  const [gameEnd, setGameEnd] = useState(false);



  const newGameHandler = () => {
    setCurrentBoard(defaultBoard);
    setCurrentPos((prev) => ({
      attempt: 0, letterPos: 0
    }))

    console.log(currentPos);
    // if(currentPos.attempt === 5 || givenWord.toLowerCase() === currentBoard[currentPos.attempt].join('').toLowerCase())
    setGameEnd(false);
    // need new givenword and clean board

  }

  const onEnter = () => {
    console.log(currentPos)
    const newBoard = [...currentBoard];
    if (currentPos.letterPos !== newBoard[0].length) return;  //need to add errorhandler

    // when user got the correct answer, escape the game?
    if (givenWord.toLowerCase() === currentBoard[currentPos.attempt].join('').toLowerCase() || currentPos.attempt === 4) {
      setGameEnd(true);
      console.log('game end')
    }
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
    const newBoard = [...currentBoard];
    // check if the current letter position is reaching the length of the word or current attempt
    if (currentPos.letterPos > newBoard[0].length - 1 || currentPos.attempt === 5) {
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
        <button onClick={newGameHandler}>start new game</button>

        {/* {!gameEnd && <>
          <Board />
          <Keyboard />
        </>
        } */}
        <Board />
        <Keyboard />

      </BoardContext.Provider>
    </div>
  );
}

export default App;
