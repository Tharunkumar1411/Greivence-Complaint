import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './LoginContainer/LoginPage';
import HomePage from "./HomeContainer/HomePage"
import ProfilePage from "./Profile/ProfilePage"
import AboutPage from './About/About';


function App(){
    
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/profile" component={ProfilePage} /> 
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
