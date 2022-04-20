import React, { useContext } from 'react';
import BoardContext from '../store/board-context';
import styles from './Key.module.css'
const Key = ({ keyValue, pressed, correct, included, disable }) => {

    const {
        onEnter,
        onDelete,
        onSelectLetter,
    } = useContext(BoardContext);
    const activeStyles = pressed ? styles['active'] : '';
    const keyStyle = keyValue === 'ENTER' || keyValue === 'DELETE' ? (styles['big-key']) : (styles['key']);

    const newStyle = correct ? styles.correct : included ? styles.included : disable ? styles.disable : '';

    const selectKeyHandler = (e) => {
        if (e.target.textContent === 'ENTER') {
            onEnter();
        } else if (e.target.textContent === 'DELETE') {
            onDelete();
        } else {
            onSelectLetter(e.target.textContent);
        }
    }
    return <span className={`${keyStyle} ${activeStyles} ${newStyle}`} onClick={(e) => selectKeyHandler(e)}>{keyValue}</span>
};

export default Key;