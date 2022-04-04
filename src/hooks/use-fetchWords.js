

import { useState, useCallback } from 'react';

const useFetchWords = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [newWord, setNewWord] = useState('');
    const sendRequest = useCallback(async (requestConfig, difficulty, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            // level of difficulty
            const filteredWords = data.filter((item) => item.length === difficulty);

            if (filteredWords.length === 0) {
                throw new Error('Something happend during api call. Try again.');
            }
            setNewWord(filteredWords[0])
            // applyData(filteredWords[0]);
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);

    }, []);

    return {
        error,
        isLoading,
        sendRequest,
        newWord
    }
};

export default useFetchWords;