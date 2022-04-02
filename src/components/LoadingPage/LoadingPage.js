import { useContext, useState } from 'react';
import BoardContext from '../store/board-context';
import Button from '../UI/Button';
import useFetchWords from '../../hooks/use-fetchWords';
import styles from './LoadingPage.module.css';
// import useAxiosFetch from '../../hooks/useAxiosFetch';


const LoadingPage = ({ onStartGame }) => {
    const [modal, setModal] = useState(false)
    const { difficulty, setDifficulty, wordHandler } = useContext(BoardContext);
    const { sendRequest, error, isLoading, word } = useFetchWords();

    const startGameHandler = () => {
        if (difficulty === null || undefined) {
            setModal(true);
            return
        }
        sendRequest({ url: 'https://random-word-api.herokuapp.com/word?number=50' }, difficulty, wordHandler).then(() => {
            if (!isLoading && word !== '') {
                onStartGame(true);
            }
        })
    }

    const levelHandler = (level) => {
        // setDifficulty(+e.target.value);
        setDifficulty(level);
    }
    return (
        <section>
            <div className={styles['loading-container']}>
                <h2>Level :</h2>
                <div className={`${styles['input-container']} `}>
                    {/* <label htmlFor="noraml"> Normal </label>
                    <input
                        id='noraml'
                        type="radio"
                        name='levelOfDifficulty'
                        value='5'
                        onChange={levelHandler}
                    />
                    <label htmlFor="hard">Hard</label>
                    <input
                        id='hard'
                        type="radio"
                        name='levelOfDifficulty'
                        value='7'
                        onChange={levelHandler}
                    /> */}
                    <Button name='Normal' onClick={() => { levelHandler(5) }} />
                    <Button name='Hard' onClick={() => { levelHandler(7) }} />

                    {difficulty === null &&
                        <div className={`${styles['warning']} ${modal && styles['active']}`}>
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