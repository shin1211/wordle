import { useContext, useEffect, useState } from 'react';
import BoardContext from '../store/board-context';
import Button from '../UI/Button';
import ToggleGroup from '../UI/ToggleGroup';
import useFetchWords from '../../hooks/use-fetchWords';
// import useAxiosFetch from '../../hooks/useAxiosFetch';
import styles from './LoadingPage.module.css';

const LoadingPage = ({ onStartGame }) => {
    const [worningMsg, setWorningMsg] = useState(true)
    const { difficulty, setDifficulty, wordHandler, word } = useContext(BoardContext);
    const { sendRequest, error, isLoading, newWord } = useFetchWords();


    const startGameHandler = () => {
        if (difficulty === null || undefined) {
            setWorningMsg(true);
            return
        }
        sendRequest({ url: 'https://random-word-api.herokuapp.com/word?number=50' }, difficulty);
        console.log(newWord);

        // sendRequest();

    }


    const levelHandler = (level) => {
        setDifficulty(level);
    }
    return (
        <section>
            <div className={styles['loading-container']}>
                <h2>Level :</h2>
                <div className={`${styles['input-container']} `}>
                    <ToggleGroup levelHandler={levelHandler} />
                    {difficulty === null &&
                        <div className={`${styles['warning']} ${worningMsg && styles['active']}`}>
                            <p>Please selecet the level!</p>
                        </div>}
                </div>
                <Button
                    onClick={startGameHandler}
                    name={isLoading ? 'Loading...' : 'Start'}
                    btnStyle='normal'
                />
            </div>
            {error && <p>{error}</p>}
        </section>
    )
}

export default LoadingPage;