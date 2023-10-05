import React from 'react';
import styles from './styles.module.scss'
import MyInput from "./components/MyInput";
import like from './assets/ThumbUpAlt.svg'

const App = () => {
    return (
        <div className={styles.wrapper}>
            wrapper dasd
            <MyInput />
            <img src={like} />
        </div>
    );
};

export default App;