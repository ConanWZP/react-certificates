import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import MyInput from "./components/MyInput";
import like from './assets/ThumbUpAlt.svg'
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import FormPage from "./pages/FormPage/FormPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import Layout from "./layout/Layout";

const App = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [chosenOption, setChosenOption] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [inputsValue, setInputsValue] = useState({
        name: '',
        phone: '',
        msg: '',
        email: '',
        nameError: false,
        phoneError: '',
        emailError: ''
    })
    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(`https://sycret.ru/service/api/api?MethodName=OSGetGoodList&ismob=0&ApiKey=011ba11bdcad4fa396660c2ec447ef14`)
        setData(response.data.data)
        setFilteredData(response.data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getData()

    }, []);

    return (
        <BrowserRouter>

                <Routes>
                    <Route path={'/'} element={<Layout chosenOption={chosenOption} setIsLoading={setIsLoading} />}>
                        <Route path={''} element={<HomePage data={data} chosenOption={chosenOption}
                                                            setChosenOption={setChosenOption} isLoading={isLoading}
                                                            filteredData={filteredData} setFilteredData={setFilteredData} />} />
                        <Route path={'form'} element={<FormPage chosenOption={chosenOption} isLoading={isLoading} inputsValue={inputsValue} setInputsValue={setInputsValue} />} />
                        <Route path={'payment'} element={<PaymentPage isLoading={isLoading} />} />
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/'} /> }/>
                </Routes>
        </BrowserRouter>
    );
};

export default App;