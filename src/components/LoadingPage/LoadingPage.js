import { useContext, useEffect, useState } from 'react';
import BoardContext from '../store/board-context';
import Button from '../UI/Button';
import ToggleGroup from '../UI/ToggleGroup';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import styles from './LoadingPage.module.css';

async function getWords(difficulty) {
    const response = await axios.get('https://random-word-api.herokuapp.com/word?number=10');
    const filteredWords = response.data.filter((item) => item.length === difficulty);
    if (filteredWords.length === 0) {
        throw new Error('no words');
    }
    return filteredWords;
}

const LoadingPage = ({ onStartGame }) => {
    const [worningMsg, setWorningMsg] = useState(true)
    const { difficulty, setDifficulty, wordHandler } = useContext(BoardContext);

    const [state, refetch] = useAsync(() => getWords(difficulty), [difficulty], true);
    const { loading, data: words, error } = state;
    const levelHandler = (level) => {
        setDifficulty(level);
    }

    const start = () => {

        refetch().then(() => {
            if (words) {
                wordHandler(words[0]);
                onStartGame(true);
            }
        })
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
                    onClick={start}
                    name={loading ? 'Loading...' : 'Start'}
                    btnStyle='normal'
                />
                {error && <p>{error}</p>}
            </div>
        </section>
    )
}

export default LoadingPage;



// import { useContext, useEffect, useState } from 'react';
// import BoardContext from '../store/board-context';
// import Button from '../UI/Button';
// import ToggleGroup from '../UI/ToggleGroup';
// import useFetchWords from '../../hooks/use-fetchWords';
// // import useAxiosFetch from '../../hooks/useAxiosFetch';
// import styles from './LoadingPage.module.css';

// const LoadingPage = ({ onStartGame }) => {
//     const [worningMsg, setWorningMsg] = useState(true)
//     const { difficulty, setDifficulty, wordHandler, word } = useContext(BoardContext);
//     const { sendRequest, error, isLoading, } = useFetchWords();


//     const startGameHandler = () => {
//         if (difficulty === null || undefined) {
//             setWorningMsg(true);
//             return
//         }
//         sendRequest({ url: 'https://random-word-api.herokuapp.com/word?number=100' }, difficulty);

//     }

//     const levelHandler = (level) => {
//         setDifficulty(level);
//     }
//     return (
//         <section>
//             <div className={styles['loading-container']}>
//                 <h2>Level :</h2>
//                 <div className={`${styles['input-container']} `}>
//                     <ToggleGroup levelHandler={levelHandler} />
//                     {difficulty === null &&
//                         <div className={`${styles['warning']} ${worningMsg && styles['active']}`}>
//                             <p>Please selecet the level!</p>
//                         </div>}
//                 </div>
//                 <Button
//                     onClick={startGameHandler}
//                     name={isLoading ? 'Loading...' : 'Start'}
//                     btnStyle='normal'
//                 />
//             </div>
//             {error && <p>{error}</p>}
//         </section>
//     )
// }

// export default LoadingPage;