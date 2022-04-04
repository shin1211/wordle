import { useContext } from 'react';
import BoardContext from '../store/board-context';
import Row from './Row';
import styles from './Board.module.css'
const Board = () => {
    const { word } = useContext(BoardContext)
    // need attempt props for moving next guess
    // if (word === '') {
    //     return <div className={styles['board-container']}>
    //         Loading...
    //     </div>
    // }
    return (
        <div className={styles['board-container']}>
            <Row attempt={0} wordLength={word.length} />
            <Row attempt={1} wordLength={word.length} />
            <Row attempt={2} wordLength={word.length} />
            <Row attempt={3} wordLength={word.length} />
            <Row attempt={4} wordLength={word.length} />
        </div>
    )
};

export default Board;