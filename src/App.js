import React, { useState, useEffect, useReducer } from 'react';
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
}

const wordReducer = (state, action) => {
  switch (action.type) {
    case 'CORRECT':
      return {
        ...state,
        correctLetters: [...state.correctLetters, action.val],
      };
    case 'INCLUDED':
      return {
        ...state,
        closedLetters: [...state.closedLetters, action.val],
      };
    case 'WRONG':
      return {
        ...state,
        wrongLetters: [...state.wrongLetters, action.val]
      };

    case 'RESET':
      return {
        correctLetters: [],
        closedLetters: [],
        wrongLetters: [],
      }
    default:
      return {
        correctLetters: [],
        closedLetters: [],
        wrongLetters: [],
      }
  }
}

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [word, setWord] = useState('');
  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentPos, setCurrentPos] = useState({ attempt: 0, letterPos: 0 });
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [letterStatus, dispatch] = useReducer(wordReducer, {
    correctLetters: [],
    closedLetters: [],
    wrongLetters: [],
  })
  const [state, refetch] = useAsync(() => getWords(difficulty), [difficulty], true, setGameStart, setWord);
  const { loading, error } = state;


  // need to update when user select the level of difficulty.
  useEffect(() => {
    const defaultBoard = board(6, word.split('').length);
    setCurrentBoard(defaultBoard);
  }, [word, gameStart]);

  const wordHandler = (word) => {
    setWord(word);
  }
  // Back to the main page where user can choose the level of difficulty and reset the current attemps and leeter of position.
  const resetGame = () => {
    setGameStart(false);
    setCurrentPos((prev) => ({
      attempt: 0, letterPos: 0
    }));
    // setWord('');
    setGameEnd(false);
    dispatch({ type: 'RESET' });
  }

  // This function will make a new game with same level of difficulty that user choose before. 
  // and also reset the current attempts and letter of position. (clean board)
  const newGameHandler = () => {
    refetch().then(() => {
      setCurrentPos((prev) => ({
        attempt: 0, letterPos: 0
      }))
      // if (currentPos.attempt === 5 || givenWord.toLowerCase() === currentBoard[currentPos.attempt].join('').toLowerCase())
    });
    dispatch({ type: 'RESET' });
    setGameEnd(false);
  }

  // When user hit the enter or click enter key from screen, check the answer with user's guess.
  const onEnter = (keys) => {
    const newBoard = [...currentBoard];
    if (currentPos.letterPos !== word.length) return;  //need to add errorhandler

    // when user got the correct answer, escape the game?
    if (word.toLowerCase() === currentBoard[currentPos.attempt].join('').toLowerCase() || currentPos.attempt === 5) {
      setGameEnd(true);
      console.log('game end')
    }
    // Check the words 
    newBoard[currentPos.attempt].forEach((letter, index) => {
      if (word[index].toLowerCase() === letter.toLowerCase()) {
        dispatch({ type: 'CORRECT', val: letter.toLowerCase() })
      } else if (word.includes(letter.toLowerCase())) {
        dispatch({ type: 'INCLUDED', val: letter.toLowerCase() })
      } else {
        dispatch({ type: 'WRONG', val: letter.toLowerCase() })
      }
    });


    // If there are more attempts left, reset the letter position as 0 and add attempt.
    let newPos = {};
    newPos = {
      attempt: currentPos.attempt + 1,
      letterPos: 0
    }
    setCurrentPos(newPos);
    setCurrentBoard(newBoard);
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
        wordHandler,
        loading,
        error,
        refetch,
        letterStatus,
        dispatch
      }}>
        <main>
          {gameEnd && <EndModal
            answer={word}
            newGame={newGameHandler}
            reset={resetGame}
          />}
          {!gameStart && <MainPage />}

          {gameStart &&
            <>
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
            </>}
        </main>

      </BoardContext.Provider>
    </div>
  );
}

export default App;
