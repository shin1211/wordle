import { useState } from 'react';
const useFetchWords = (difficulty, applyData) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const sendRequest = async () => {
        setError(null);
        setIsLoading(false);
        try {
            const response = await fetch('https://random-word-api.herokuapp.com/word?number=50');
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const data = await response.json();
            // level of difficulty
            const filteredWords = data.filter((item) => item.length === difficulty);
            console.log(filteredWords);
            // setWord(selectedWord[0]);
            applyData(filteredWords[0])
            setIsLoading(true);
        } catch (error) {
            setError(error.message)
        }
    }
    return {
        error,
        isLoading,
        sendRequest,
    }
};

export default useFetchWords;