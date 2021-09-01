import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './LoginContainer/LoginPage';
import ComplaintPage from './ComplaintContainer/ComplaintPage'
import HomePage from "./HomeContainer/HomePage"
import ProfilePage from "./Profile/ProfilePage"

function App(){
    
    return (
        <div>
            <BrowserRouter>
        
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    {(sessionStorage.getItem("mail")) && <Route path="/complaint" component={ComplaintPage} />}
                     {(sessionStorage.getItem("mail")) &&<Route path="/Homepage" component={HomePage} />}
                
                    {(sessionStorage.getItem("mail")) &&<Route path="/profile" component={ProfilePage} /> }
                </Switch>
            </BrowserRouter>
           
        </div>
    )
}

export default App
