import React, {useEffect, useState} from 'react';
import styles from "../styles.module.scss";
import {Outlet, useNavigate} from "react-router-dom";

const Layout = ({chosenOption, setIsLoading}) => {

    const navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        if (!chosenOption) {
            navigate('/')
        }
        setIsLoading(false)
    }, []);



    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
};

export default Layout;