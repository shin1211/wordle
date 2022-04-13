import { useContext, useState } from 'react';
import BoardContext from '../store/board-context';
import Button from '../UI/Button';
import ToggleGroup from '../UI/ToggleGroup';
import styles from './MainPage.module.css';

const MainPage = () => {
    const [worningMsg, setWorningMsg] = useState(true)
    const { difficulty, setDifficulty, loading, error, refetch } = useContext(BoardContext);

    const levelHandler = (level) => {
        setDifficulty(level);
        setWorningMsg(false)
    }

    const startHandler = () => {
        refetch();
    }

    return (
        <section>
            <div className={styles['loading-container']}>
                <h2>Level :</h2>
                <div className={`${styles['input-container']} `}>
                    <ToggleGroup levelHandler={levelHandler} />
                    {difficulty === null && worningMsg &&
                        <div className={`${styles['warning']} ${styles['active']}`}>
                            <p>Please select the level!</p>
                        </div>}
                </div>
                <Button
                    onClick={startHandler}
                    name={loading ? 'Loading...' : 'Start'}
                    btnStyle='normal'
                />
                {error && <p>{error}</p>}
            </div>
        </section>
    )
}

export default MainPage;
