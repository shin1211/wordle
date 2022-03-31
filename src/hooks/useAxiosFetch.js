import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, difficulty) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if (isMounted) {

                    const filteredWords = response.filter((item) => item.length === difficulty);
                    setData(filteredWords[0])
                    // setData(response.data)
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function');
            isMounted = false;
            source.cancel();
        }

        return cleanUp
    }, [dataUrl, difficulty]);


    return { data, fetchError, isLoading }
}

export default useAxiosFetch;