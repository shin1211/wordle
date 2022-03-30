import { useEffect, useState, useContext } from 'react';
import useFetchWords from '../../hooks/use-fetchWords';
import BoardContext from '../store/board-context';

const LoadingPage = ({ onStartGame }) => {
    const { setWord, word, setIsLoading } = useContext(BoardContext);
    // const [error, setError] = useState(null);
    const [level, setLevel] = useState(null);

    const {
        error,
        isLoading,
        sendRequest,
        // selectedWord
    } = useFetchWords(level, setWord);

    // async function fetchWordsHandler(difficulty) {
    //     setError(null);
    //     setIsLoading(false);
    //     try {
    //         const response = await fetch('https://random-word-api.herokuapp.com/word?number=50');
    //         if (!response.ok) {
    //             throw new Error('Something went wrong!')
    //         }
    //         const data = await response.json();
    //         // level of difficulty
    //         console.log(data);
    //         const selectedWord = data.filter((item) => item.length === difficulty);

    //         setWord(selectedWord[0]);
    //         setIsLoading(true);
    //     } catch (error) {
    //         setError(error.message)
    //     }

    // }

    // useEffect(() => {
    //     fetchWordsHandler();
    //     console.log(word)
    // }, [])

    const startGameHandler = () => {
        // fetchWordsHandler(level);
        sendRequest();
        onStartGame(true);
    }

    const levelHandler = (e) => {
        console.log(e.target.value)
        setLevel(+e.target.value);
    }
    return (
        <section>
            <div>
                <h2>Level :</h2>
                <input
                    type="radio"
                    name='levelOfDifficulty'
                    value='5'
                    onChange={levelHandler}
                />Nomal
                <input
                    type="radio"
                    name='levelOfDifficulty'
                    value='7'
                    onChange={levelHandler}
                />Hard
            </div>
            <h2>topic :</h2>
            {error && <p>{error}</p>}
            <button onClick={startGameHandler}>start</button>
        </section>
    )
}

export default LoadingPage;