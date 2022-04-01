import React, { useContext } from 'react';
import BoardContext from '../store/board-context';
import styles from './Key.module.css'
const Key = ({ keyValue, pressed }) => {
    const {
        onEnter,
        onDelete,
        onSelectLetter } = useContext(BoardContext);

    const activeStyles = pressed ? styles['active'] : '';
    const selectKeyHandler = (e) => {
        if (e.target.textContent === 'ENTER') {
            onEnter();
        } else if (e.target.textContent === 'DELETE') {
            onDelete();
        } else {
            onSelectLetter(e.target.textContent);
        }


    }
    return <span className={`${styles.key} ${activeStyles}`} onClick={(e) => selectKeyHandler(e)}>{keyValue}</span>
};

export default Key;