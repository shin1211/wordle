import React, { useContext } from 'react';
import BoardContext from '../store/board-context';
const Key = ({ keyValue }) => {
    const {
        onEnter,
        onDelete,
        onSelectLetter } = useContext(BoardContext);

    const selectKeyHandler = (e) => {
        e.preventDefault();
        if (e.target.textContent === 'ENTER') {
            onEnter();
        } else if (e.target.textContent === 'DELETE') {
            onDelete();
        } else {
            onSelectLetter(e.target.textContent);
        }


    }
    return <button className='' onClick={(e) => selectKeyHandler(e)}>{keyValue}</button>
};

export default Key;