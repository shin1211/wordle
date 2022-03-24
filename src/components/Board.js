import Row from './Row';
import styles from './Board.module.css'
const Board = ({ onUserWord }) => {

    const givenWord = 'money';
    return <div className={styles['board-container']}>
        <Row onUserWord={onUserWord} givenWord={givenWord} />
        <Row onUserWord={''} givenWord={givenWord} />
        <Row onUserWord={''} givenWord={givenWord} />
        <Row onUserWord={''} givenWord={givenWord} />
        <Row onUserWord={''} givenWord={givenWord} />
    </div>
};

export default Board;