import styles from './Header.module.css'
const Header = () => {
    return (
        <header className={styles['header-container']}>
            <h1>Wordle</h1>
        </header>
    )
}

export default Header;