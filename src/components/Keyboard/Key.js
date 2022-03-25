import React, { useContext } from 'react';
import BoardContext from '../store/board-context';
const Key = ({ keyValue }) => {
    const { currentBoard, setCurrentBoard, currentPos, setCurrentPos } = useContext(BoardContext);

    const selectKey = (e) => {
        console.log(currentPos);
        // grab current board and update with new letter.
        const newBoard = [...currentBoard];

        if (e.target.textContent === 'ENTER') {
            if (currentPos.letterPos !== newBoard[0].length) return;  //need to add errorhandler
            setCurrentPos(prev => ({
                attempt: prev.attempt + 1,
                letterPos: 0
            }))
        } else if (e.target.textContent === 'DELETE') {
            if (currentPos.letterPos === 0) return;
            newBoard[currentPos.attempt][currentPos.letterPos - 1] = '';
            setCurrentPos((prev) => ({
                ...prev,
                letterPos: prev.letterPos--
            }))
        } else {

            if (currentPos.letterPos > newBoard[0].length - 1) {
                // need to add errorhandler
                console.log('finish')
                return;
            } else {
                newBoard[currentPos.attempt][currentPos.letterPos] = e.target.textContent;
                setCurrentBoard(newBoard);

                setCurrentPos((prev) => ({
                    ...prev,
                    letterPos: prev.letterPos++
                }))
                console.log('update letterpos');
            }

        }


    }
    return <button className='' onClick={selectKey}>{keyValue}</button>
};

export default Key;