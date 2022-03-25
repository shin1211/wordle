import Row from './Row';
import styles from './Board.module.css'
const Board = ({ onUserWord }) => {

    // need attempt props for moving next guess
    return <div className={styles['board-container']}>
        <Row attempt={0} />
        <Row attempt={1} />
        <Row attempt={2} />
        <Row attempt={3} />
        <Row attempt={4} />
    </div>
};

export default Board;