import React, { useContext } from 'react';
import BoardContext from '../store/board-context';
const Key = ({ keyValue }) => {
    const {
        currentPos,
        onEnter,
        onDelete,
        onSelectLetter } = useContext(BoardContext);

    const selectKeyHandler = (e) => {
        console.log(currentPos);

        if (e.target.textContent === 'ENTER') {
            onEnter();
        } else if (e.target.textContent === 'DELETE') {
            onDelete();
        } else {
            onSelectLetter(e.target.textContent);
        }


    }
    return <button className='' onClick={selectKeyHandler}>{keyValue}</button>
};

export default Key;