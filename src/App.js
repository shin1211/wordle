import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/container/Header';
import MainPage from './components/MainPage/MainPage';
import { board } from './components/Board/defaultBoard';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import BoardContext from './components/store/board-context';
import EndModal from './components/UI/EndModal';
import useAsync from './hooks/useAsync'
import axios from 'axios';

async function getWords(difficulty) {
  const response = await axios.get('https://random-word-api.herokuapp.com/word?number=50');
  const filteredWords = await response.data.filter((item) => item.length === difficulty);
  if (filteredWords.length === 0) {
    throw new Error('API Issue. Please try again!');
  }
  return filteredWords;
};

async function checkDef(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { method: 'GET' });
    const data = await response.json();
    if (data.title === "No Definitions Found") {
      throw new Error('no word');
    }

  } catch (err) {
    console.log(err)
  }

}

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [word, setWord] = useState('');
  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentPos, setCurrentPos] = useState({ attempt: 0, letterPos: 0 });
  const [gameEnd, setGameEnd] = useState(false);
  const [state, refetch] = useAsync(() => getWords(difficulty), [difficulty], true, setWord);
  const { loading, error, data } = state;

  // need to update when user select the level of difficulty.
  useEffect(() => {
    const defaultBoard = board(6, word.split('').length);
    setCurrentBoard(defaultBoard);
    console.log('refresh')
  }, [word, error]);




  // Back to the main page where user can choose the level of difficulty and reset the current attemps and leeter of position.
  const resetGame = () => {
    setCurrentPos((prev) => ({
      attempt: 0, letterPos: 0
    }));
    setGameEnd(false);
    setWord('');
    setDifficulty(null);
  }

  // This function will make a new game with same level of difficulty that user choose before and also reset the current attempts and letter of position. (clean board)
  const newGameHandler = () => {
    refetch().then(() => {
      setCurrentPos((prev) => ({
        attempt: 0, letterPos: 0
      }))
    });
    setGameEnd(false);
  }

  // When user hit the enter or click enter key from screen, check the answer with user's guess.
  const onEnter = () => {
    if (currentPos.letterPos !== word.length) return;  //need to add errorhandler
    const currentUserGuess = currentBoard[currentPos.attempt].join('').toLowerCase();
    console.log(currentUserGuess);
    checkDef(currentUserGuess);

    if (word.toLowerCase() === currentUserGuess || currentPos.attempt === 5) {
      // need to be delayed for css transition end.
      setTimeout(() => {
        setGameEnd(true);
      }, 1500)
      // console.log('game end')
    }
    // If there are more attempts left, reset the letter position as 0 and add attempt.
    let newPos = {};
    newPos = {
      attempt: currentPos.attempt + 1,
      letterPos: 0
    }
    setCurrentPos(newPos);
  }

  //if user hit the delete, remove current letter and letter position update previous position.
  const onDelete = () => {
    const newBoard = [...currentBoard];
    if (currentPos.letterPos === 0) return;

    newBoard[currentPos.attempt][currentPos.letterPos - 1] = '';
    setCurrentBoard(newBoard);

    let newPos = {};
    newPos = {
      attempt: currentPos.attempt,
      letterPos: currentPos.letterPos - 1
    }
    setCurrentPos(newPos);

  }

  const onSelectLetter = (text) => {

    if (!gameEnd) {
      const newBoard = [...currentBoard];
      // check if the current letter position is reaching the length of the word or current attempt
      if (currentPos.letterPos > word.length - 1 || currentPos.attempt === 6) {
        // need to add errorhandler
        return;
      }
      newBoard[currentPos.attempt][currentPos.letterPos] = text;
      setCurrentBoard(newBoard);

      let newPos = {};
      newPos = {
        attempt: currentPos.attempt,
        letterPos: currentPos.letterPos + 1
      }
      setCurrentPos(newPos);
    }
  }

  return (
    <div className="App">
      <Header />
      <Router>
        <BoardContext.Provider value={{
          currentBoard,
          setCurrentBoard,
          currentPos,
          setCurrentPos,
          onEnter,
          onDelete,
          onSelectLetter,
          word,
          setWord,
          difficulty,
          setDifficulty,
          loading,
          error,
          refetch,
          data,
        }}>
          <main>
            {gameEnd && <EndModal
              answer={word}
              newGame={newGameHandler}
              reset={resetGame}
            />}
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/board' element={
                <section>
                  <Board>
                    {loading && <p>Loading...</p>}
                    {error && <div>
                      <p>{error}</p>
                      <button onClick={refetch}>Try again</button>
                    </div>}
                  </Board>
                  <Keyboard />
                </section>
              } />
            </Routes>
          </main>

        </BoardContext.Provider>
      </Router>

    </div>
  );
}

export default App;
