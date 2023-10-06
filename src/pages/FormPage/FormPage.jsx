import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from './formPage.module.scss'
import {IMaskInput} from "react-imask";
import axios from "axios";

const FormPage = ({chosenOption, isLoading, setInputsValue, inputsValue}) => {

    const navigate = useNavigate()
    const ref = useRef(null);
    const inputRef = useRef(null);

    const submitForm = async () => {
        if (!inputsValue.nameError && inputsValue.phoneError === '' && inputsValue.emailError === '') {
            await axios.post('https://sycret.ru/service/api/api?ApiKey=011ba11bdcad4fa396660c2ec447ef14&MethodName=OSSale', {
                MethodName: 'OSSale',
                ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
                ID: chosenOption['ID'],
                Generic_key: chosenOption['PRIMARYKEY'],
                TableName: chosenOption['TABLENAME'],
                PrimaryKey: chosenOption['PRIMARYKEY'],
                Price: chosenOption['PRICE'],
                Summa: chosenOption['SUMMA'],
                ClientName: inputsValue.name,
                Phone: inputsValue.phone,
                Email: inputsValue.email,
                PaymentTypeId: 2,
                UseDelivery: 0,
                isGift: 0,
                MsgText: inputsValue.msg,
                PName: 'AA',
                PPhone: '123'
            }).then((response) => {
                console.log(response.data)
                navigate('/payment')
            })
        }
    }

    const onClickName = () => {
        if (inputsValue.name === '') {
            setInputsValue({
                ...inputsValue,
                nameError: true
            })
        } else {
            setInputsValue({
                ...inputsValue,
                nameError: false
            })
        }
    }

    const onClickPhone = () => {

        if (inputsValue.phone === '') {
            setInputsValue({
                ...inputsValue,
                phoneError: 'Телефон должен быть заполнен'
            })
        } else {
            if (inputsValue.phone.length !== 10) {
                setInputsValue({
                    ...inputsValue,
                    phoneError: 'Вы ввели некорректный телефон'
                })
            } else {
                setInputsValue({
                    ...inputsValue,
                    phoneError: ''
                })
            }
        }
    }

    const onClickEmail = () => {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (inputsValue.email === '') {
            setInputsValue({
                ...inputsValue,
                emailError: 'Почта должна быть заполнена'
            })
        } else {
            if (!regEmail.test(inputsValue.email)) {
                setInputsValue({
                    ...inputsValue,
                    emailError: 'Указан неверный формат почты'
                })
            } else {
                setInputsValue({
                    ...inputsValue,
                    emailError: ''
                })
            }
        }
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <div className={styles.title}>{chosenOption['NAME']}</div>
                <div className={styles.inputWrapper}>
                    <div className={`${styles.inputTitle} ${inputsValue.nameError && styles.inputTitleError}`}>ФИО *</div>
                    <input placeholder={'Введите имя'} onBlur={onClickName} name={'name'} value={inputsValue.name}
                           className={inputsValue.nameError ? styles.inputError : undefined}
                           onChange={(event) => {
                               setInputsValue({...inputsValue, name: event.target.value})
                           }}/>
                    {inputsValue.nameError && <div className={styles.inputTitleError}>Имя должно быть заполнено</div>}
                </div>
                <div className={styles.inputWrapper}>
                    <div className={`${styles.inputTitle} ${inputsValue.phoneError !== '' ? styles.inputTitleError : undefined}`}>Телефон *</div>
                    {/*<input name={'phone'}  value={inputsValue.phone} onChange={(event) => {
                        setInputsValue({...inputsValue, phone: event.target.value})
                    }} />*/}
                    <IMaskInput
                        className={inputsValue.phoneError !== '' ? styles.inputError : undefined}
                        onBlur={onClickPhone}
                        name={'phone'}
                        mask={'+7 (000) 000-00-00'}
                        value={inputsValue.phone}
                        unmask={true}
                        ref={ref}
                        lazy={false}
                        inputRef={inputRef}
                        onAccept={
                            (value, mask) => setInputsValue({
                                ...inputsValue,
                                phone: value
                            })
                        }
                        placeholder='Номер...'
                    />
                    {inputsValue.phoneError !== '' && <div className={styles.inputTitleError}>{inputsValue.phoneError}</div>}
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputTitle}>Сообщение</div>
                    <textarea placeholder={'Сообщение...'} name={'msg'} value={inputsValue.msg} onChange={(event) => {
                        setInputsValue({...inputsValue, msg: event.target.value})
                    }}/>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={`${styles.inputTitle} ${inputsValue.emailError !== '' ? styles.inputTitleError : undefined}`}>Почта *</div>
                    <input placeholder={'Введите почту'} onBlur={onClickEmail} name={'email'} value={inputsValue.email}
                           className={inputsValue.emailError !== '' ? styles.inputError : undefined}
                           onChange={(event) => {
                               setInputsValue({...inputsValue, email: event.target.value})
                           }}/>
                    {inputsValue.emailError !== '' && <div className={styles.inputTitleError}>{inputsValue.emailError}</div>}

                </div>
                <a href={'https://sycret.ru'}>Правила</a>
            </form>
            <div className={styles.buttons}>
                <Link to={'/'}>Назад</Link>
                <button onClick={() => submitForm()}>Оплатить</button>
            </div>
        </div>
    );
};

export default FormPage;