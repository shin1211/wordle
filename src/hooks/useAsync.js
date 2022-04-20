import { useReducer, useEffect } from 'react';


function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
// The default value of the skip parameter is set to false, and if this value is true, useEffect is set to not do anything.

function useAsync(callback, deps = [], skip = false, setWord) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false
    });
    // Check if there are no arguments in refetch function (Ex: In the case that refetching the api call due to api error in board component, it doesn't need argument for refetch)
    const fetchData = async (navigate = () => { }) => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data, });
            await setWord(data[0]);
            // if (typeof setWord === 'function') await setWord(data[0])
            if (typeof navigate === 'function') navigate("/board");
        } catch (e) {
            dispatch({ type: 'ERROR', error: e.message });
        }
    };

    useEffect(() => {
        if (skip) return;
        fetchData();
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
}

export default useAsync;
