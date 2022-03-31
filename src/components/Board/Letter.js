import React, { useContext, useEffect } from 'react';
import styles from './Letter.module.css'
import BoardContext from '../store/board-context';


const Letter = ({ letterPos, attempt, }) => {
    // grab letter from updated board;
    const { currentBoard, word, currentPos } = useContext(BoardContext);
    // const letter = currentBoard[attempt][letterPos].toLowerCase();
    const letter = currentBoard[attempt][letterPos] || '';
    const answer = word[letterPos].toLowerCase();

    let currentStatus = '';
    if (answer === letter.toLowerCase()) currentStatus = styles['correct'];
    if (answer !== letter.toLowerCase() && letter !== '' && word.includes(letter.toLowerCase())) currentStatus = styles['almost'];
    if (answer !== letter.toLowerCase() && !word.includes(letter.toLowerCase())) currentStatus = styles['wrong'];

    // need to fix this part. It works fine but... could be more simple way?
    const delayAnimation = styles[`delay-${letterPos}`]


    return (
        <div className={`${styles['letter-container']} ${currentPos.attempt > attempt && currentStatus} ${delayAnimation}`
        }>
            <span className={letter !== '' ? styles.guess : ''}>
                {letter}
            </span>

        </div>)
};
export default Letter;