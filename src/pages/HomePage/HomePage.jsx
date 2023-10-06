import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './homePage.module.scss'
import {AiFillCaretDown} from "react-icons/ai";
import {RxDividerVertical} from "react-icons/rx";
import Loader from "../../components/Loader/Loader";

const HomePage = ({data, chosenOption, setChosenOption, isLoading, setFilteredData, filteredData}) => {


    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    const [optionsIsShowed, setOptionsIsShowed] = useState(false)

    useEffect(() => {
        setFilteredData(  data.filter(el => el['NAME'].toLowerCase().includes(inputValue.toLowerCase()))  )
    }, [inputValue]);

    useEffect(() => {
        if (!optionsIsShowed) {
            setInputValue('')
        }
    }, [optionsIsShowed]);

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <h2>Сделайте хороший подарок</h2>
            <div className={styles.select} onBlur={(e) => {
                const currentTarget = e.currentTarget;
                requestAnimationFrame(() => {
                    if (!currentTarget.contains(document.activeElement)) {
                        setOptionsIsShowed(false);
                    }
                });
            }} tabIndex={0}>
                <div className={styles.selectButton}
                     onClick={(event) => {
                         setOptionsIsShowed(prevState => !prevState)
                     }}>
                    {
                        inputValue === '' ?
                            <div className={styles.absText} onClick={() => inputRef.current.focus()}>
                                {chosenOption ? chosenOption['NAME'] : 'Выберите товар'}
                            </div>
                            : null
                    }
                    <div className={`${styles.selectInput} ${inputValue.length > 0 && styles.selectInputMod}`}>
                        <input ref={inputRef} value={inputValue} onChange={(e) => {
                            setOptionsIsShowed(true)
                            setInputValue(e.target.value)
                        }}/>
                    </div>

                    <div className={styles.selectRightSide}>
                        <span className={styles.divider}>|</span>
                        <AiFillCaretDown/>
                    </div>

                </div>
                {
                    optionsIsShowed ?
                        <div className={styles.options}>
                            {
                                filteredData.map((el) => (
                                    <div key={el.ID} className={styles.option} onClick={(e) => {
                                        setFilteredData(data)
                                        setChosenOption(el)
                                        setOptionsIsShowed(false)
                                        console.log(el)
                                    }}>{el.NAME}</div>
                                ))
                            }
                        </div>
                        :
                        null
                }
            </div>
            {
                chosenOption ?
                    <div className={styles.homeBottom}>
                        <div className={styles.price}>
                            <span>Цена</span>
                            <span>-</span>
                            <span>{Number(chosenOption['SUMMA'])} р.</span>
                        </div>
                        <Link to={'/form'}>Купить</Link>
                    </div>
                    : null
            }
        </div>
    );
};

export default HomePage;