import Letter from './Letter';
import { useContext, useState, useEffect } from 'react';
import BoardContext from '../store/board-context';
import styles from './Row.module.css';


const Row = ({ attempt, wordLength }) => {
    const { currentBoard, word } = useContext(BoardContext);
    const [userInput, setUserInput] = useState([]);
    useEffect(() => {
        // console.log(currentBoard)
        const currentInput = currentBoard[attempt];
        setUserInput(currentInput);

    }, [attempt, currentBoard,]);


    // const wordCount = useMemo(() => {
    //     return [...word.split('')].reduce((acc, char) => {
    //         if (!acc.hasOwnProperty(char)) {
    //             acc[char] = 1;
    //         } else {
    //             acc[char] += 1;
    //         }
    //         return acc;
    //     }, {})
    // }, [word])

    // const charMap = { ...wordCount };


    const charMap = [...word.split('')].reduce((acc, char) => {
        if (!acc.hasOwnProperty(char)) {
            acc[char] = 1;
        } else {
            acc[char] += 1;
        }
        return acc;
    }, {});

    //  Need to filter first to check 
    userInput.forEach((letter, index) => {
        if (word[index].toLowerCase() === letter.toLowerCase()) {
            charMap[letter.toLowerCase()] -= 1;
        }
    });

    return (
        <div className={styles['row-container']}>

            {
                userInput.map((letter, index) => {

                    const isCorrect = letter.toLowerCase() === word[index];
                    let isPresent = false;
                    if (!isCorrect && !!charMap[letter.toLowerCase()]) {
                        charMap[letter.toLowerCase()] -= 1;
                        isPresent = true;
                    }
                    return (
                        <Letter
                            key={index}
                            letter={letter}
                            matched={isCorrect ? 'correct' : isPresent ? 'almost' : 'wrong'}
                            attempt={attempt}
                            letterPos={index}
                        />
                    )
                })
            }
        </div>
    )
};

export default Row;