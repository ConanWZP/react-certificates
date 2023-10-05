import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from './payment.module.scss'

const PaymentPage = ({isLoading}) => {

    const [isPaying, setIsPaying] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsPaying(false)
        }, 1000)
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {
                    isPaying ?
                        <div>Оплата...</div>
                        :
                        <>
                            <div>Оплата прошла</div>
                            <Link to={'/'}>На главную</Link>
                        </>
                }
            </div>

        </div>
    );
};

export default PaymentPage;