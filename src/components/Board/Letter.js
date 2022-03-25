import React, { useContext } from 'react';
import BoardContext from '../store/board-context';


const Letter = ({ letterPos, attempt, styles, }) => {
    // grab letter from updated board;
    const { currentBoard } = useContext(BoardContext);

    const letter = currentBoard[attempt][letterPos];

    return <div className={styles}>{letter}</div>
};
export default Letter;