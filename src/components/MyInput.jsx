import React from 'react';
import styles from './myInput.module.scss'
const MyInput = () => {
    return (
        <div className={styles.inputWrapper}>
            <input placeholder={'myInput'}/>
        </div>
    );
};

export default MyInput;