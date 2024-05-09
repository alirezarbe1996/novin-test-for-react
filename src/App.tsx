import React from 'react';
import './App.css';
import {StateContextProvider} from "./StateContext";
import MainRouter from "./router/MainRouter";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <StateContextProvider>
            <ToastContainer
                position="top-left"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                draggable
            />
            <MainRouter/>
        </StateContextProvider>
    );
}

export default App;