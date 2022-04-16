import React from 'react';
import Letter from './Letter';
import { useContext, useState, useEffect } from 'react';
import BoardContext from '../store/board-context';
import styles from './Row.module.css';


const Row = ({ attempt, wordLength }) => {
    const { currentBoard, word } = useContext(BoardContext);
    const [userInput, setUserInput] = useState([]);

    useEffect(() => {
        const currentInput = currentBoard[attempt];
        setUserInput(currentInput);
    }, [attempt, currentBoard]);

    // Given a word, count the number of occurrences of all of its letters and store it in an object. Ex) 'hello' = {h:1, e:1 , l:2, o: 1}
    const charMap = [...word.split('')].reduce((obj, char) => {
        if (!obj.hasOwnProperty(char)) {
            obj[char] = 1;
        } else {
            obj[char] += 1;
        }
        return obj;
    }, {});

    // Split the logic for checking correct letter guess (isCorrect) in a given word into a separate loop and subtract the number of correct letters from the charMap before checking the isPresent.
    userInput.forEach((letter, index) => {
        if (word[index].toLowerCase() === letter.toLowerCase()) {
            charMap[letter.toLowerCase()] -= 1;
        }
    });

    return (
        <div className={styles['row-container']}>
            {
                userInput.map((letter, index) => {
                    // Now, it is already calculated correct match from charMap.
                    const isCorrect = letter.toLowerCase() === word[index];
                    let isPresent = false;
                    // it's short way to cast a variable to be a boolean (true or false) value and caught if charMap['letter'] has falsy value which is 0. If charMap['letter'] is greater than 0, return true.
                    if (!isCorrect && !!charMap[letter.toLowerCase()]) {
                        charMap[letter.toLowerCase()] -= 1;
                        isPresent = true;
                    }
                    return <Letter
                        key={index}
                        letter={letter}
                        attempt={attempt}
                        letterPos={index}
                        matched={isCorrect ? 'correct' : isPresent ? 'almost' : 'wrong'}
                    />
                })
            }
        </div>
    )
};

export default Row;


