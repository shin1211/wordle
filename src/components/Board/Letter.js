import React, { useContext } from 'react';
import styles from './Letter.module.css'
import BoardContext from '../store/board-context';


const Letter = ({ letterPos, attempt, letter, matched }) => {
    const { currentPos } = useContext(BoardContext);


    let currentStatus = '';
    if (matched === 'correct') {
        currentStatus = styles['correct']
    };
    if (matched === 'almost') {
        currentStatus = styles['almost']
    };
    if (matched === 'wrong') {
        currentStatus = styles['wrong']
    };

    // need to fix this part. It works fine but... could be more simple way?
    const delayAnimation = styles[`delay-${letterPos}`];


    return (
        <div className={`${styles['letter-container']} ${currentPos.attempt > attempt && currentStatus} ${delayAnimation}`}>
            <span className={letter && styles['guess']}>
                {letter}
            </span>
        </div >)
};
export default Letter;



