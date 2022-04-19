import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from './Button';
import styles from './EndModal.module.css'

const Backdrop = () => {
    return <div className={styles['backdrop']} ></div>
}
const EndModalOverlay = ({ word, newGameHandler, resetGame }) => {

    let navigate = useNavigate();

    return (
        <div className={styles['modal']}>
            <h2>Game End</h2>
            <h3>Answer : <span className={styles['answer']}>{word}</span></h3>
            <div className={styles['btn-container']}>
                <Button onClick={newGameHandler} btnStyle='modal' name='Try again with new word!' />
                <Button onClick={() => {
                    resetGame();
                    navigate("/");
                }} btnStyle='modal' name='Back to main page' />
            </div>
        </div>
    )
};

const EndModal = ({ answer, newGame, reset }) => {

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <EndModalOverlay
                    word={answer}
                    newGameHandler={newGame}
                    resetGame={reset}
                />,
                document.getElementById("overlay-root")
            )}
        </>
    )
}

export default EndModal;