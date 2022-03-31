import React, { useState, useCallback } from 'react';
const useFetchWords = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
                throw new Error('Something went wrong!')
            }
            const data = await response.json();
            // level of difficulty
            const filteredWords = data.filter((item) => item.length === difficulty);
            applyData(filteredWords[0])
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
        // this part making error. Need to figure out.
    }, []);
    return {
        error,
        isLoading,
        sendRequest,
    }
};

export default useFetchWords;