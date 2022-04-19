import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ErrorModal.module.css'
const Backdrop = () => {
    return <div className={styles['backdrop']} ></div>
}
const ErrorModalOverlay = ({ setIsError }) => {

    useEffect(() => {
        setTimeout(() => {
            setIsError(false);
        }, 1300)
    })
    return (
        <div className={styles['modal']}>
            <p>Word not found</p>
        </div>
    )
};

const ErrorModal = ({ setIsError }) => {

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ErrorModalOverlay
                    setIsError={setIsError}
                />,
                document.getElementById("overlay-root")
            )}
        </>
    )
}

export default ErrorModal;