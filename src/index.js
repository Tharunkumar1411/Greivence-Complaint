import React from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import './App.css'
import { CookiesProvider } from "react-cookie";

import {BrowserRouter as Router} from 'react-router-dom';
ReactDOM.render(
    <Router>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Router>
,document.getElementById('root'))