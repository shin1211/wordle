import React, { useContext } from 'react';
import styles from './Letter.module.css'
import BoardContext from '../store/board-context';


const Letter = ({ letterPos, attempt, }) => {
    // grab letter from updated board;
    const { currentBoard, givenWord, currentPos } = useContext(BoardContext);

    // const letter = currentBoard[attempt][letterPos].toLowerCase();
    const letter = currentBoard[attempt][letterPos];
    const answer = givenWord[letterPos].toLowerCase();
    console.log(currentPos)


    let currentStatus = '';
    if (answer === letter.toLowerCase()) currentStatus = styles['correct'];
    if (answer !== letter.toLowerCase() && givenWord.includes(letter.toLowerCase())) currentStatus = styles['almost'];
    if (answer !== letter.toLowerCase && !givenWord.includes(letter.toLowerCase())) currentStatus = styles['wrong'];
    return <div className={`${styles['letter-container']} ${currentPos.attempt > attempt ? currentStatus : ''}`}>{letter}</div>
};
export default Letter;