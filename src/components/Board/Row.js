import Letter from './Letter';
import { useContext, useState, useEffect } from 'react';
import BoardContext from '../store/board-context';
import styles from './Row.module.css';


const Row = ({ attempt, wordLength }) => {
    const { currentBoard, word, currentPos, letterStatus } = useContext(BoardContext);
    const [userInput, setUserInput] = useState([]);
    // console.log(currentBoard[attempt]);
    console.log(userInput);
    // const letter = currentBoard[attempt][letterPos] || '';
    // const answer = word[letterPos].toLowerCase();

    useEffect(() => {
        const currentInput = currentBoard[attempt];
        setUserInput(currentInput);
    }, [attempt, currentBoard]);

    return (
        <div className={styles['row-container']}>
            {
                userInput.map((letter, index) => (
                    <Letter
                        key={index}
                        letter={letter}
                    />
                ))
                // Array(wordLength).fill('').map((_, index) =>
                //     <Letter
                //         key={index}
                //         attempt={attempt}
                //         letterPos={index}
                //     />)
            }
        </div>
    )
};

export default Row;