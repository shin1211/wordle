import React, { useState, useEffect } from 'react';

import Board from './components/Board';

function App() {

  const [userWord, setUserWord] = useState([]);
  const [submittedWord, setSubmittedWord] = useState([]);

  // const [currentAttempt, setCurrentAttempt] = useState({ currentAttempt: 0, currentPos: 0 })



  useEffect(() => {
    const handleKeyDown = e => {
      const isChar = /^[a-z]$/.test(e.key)
      if (isChar && userWord.length < 5) {
        setUserWord(prev => [...prev, e.key])
      } else if (e.key === 'Backspace' && userWord.length > 0) {
        setUserWord(prev => {
          const temp = [...prev];
          temp.pop();
          return temp;
        })
      } else if (e.key === 'Enter') {
        setSubmittedWord(prev => [...prev, userWord]);
        setUserWord([]);
      }

      // console.log('refresh', userWord);

    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [userWord.length, userWord])
  console.log(userWord);
  console.log(submittedWord);

  return (

    <div className="App">
      <h1>wordle</h1>
      <Board onUserWord={userWord}></Board>
    </div>
  );
}

export default App;
