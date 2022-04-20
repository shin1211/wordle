import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardContext from '../store/board-context';
import Row from './Row';
import styles from './Board.module.css'
const Board = ({ children }) => {
    const { word } = useContext(BoardContext);
    let navigate = useNavigate();
    useEffect(() => {
        if (!word) {
            navigate("/");
        }
    }, [word, navigate])

    return (
        // <div className={styles['board-container']}>
        //     {children}
        //     <Row attempt={0} wordLength={word.length} />
        //     <Row attempt={1} wordLength={word.length} />
        //     <Row attempt={2} wordLength={word.length} />
        //     <Row attempt={3} wordLength={word.length} />
        //     <Row attempt={4} wordLength={word.length} />
        //     <Row attempt={5} wordLength={word.length} />
        // </div>

        <div className={styles['board-container']}>
            {children}
            {Array(6).fill('').map((_, index) => {
                return <Row key={index} attempt={index} wordLength={word.length} />
            })}
        </div>

    )
};

export default Board;