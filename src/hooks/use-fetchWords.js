import { useState, useCallback } from 'react';
const useFetchWords = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
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
            const filteredWords = await data.filter((item) => item.length === difficulty);
            if (filteredWords.length === 0) {
                throw new Error('Something happend during api call. Try again.');
            }
            applyData(filteredWords[0]);
            // return filteredWords;
        } catch (err) {
            console.log(err.message);
            setError(err.message)
        } finally {

            // this part making error. Need to figure out.
            setIsLoading(false);
        }
    }, []);

    return {
        error,
        isLoading,
        sendRequest,
    }
};

export default useFetchWords;