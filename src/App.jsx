import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './LoginContainer/LoginPage';
import ComplaintPage from './ComplaintContainer/ComplaintPage'
import HomePage from "./HomeContainer/HomePage"
import ProfilePage from "./Profile/ProfilePage"
import {Cookies} from 'react-cookie';

function App(){
  const cookie = new Cookies();

 
    return (
        <div>
            <BrowserRouter>
        
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    {(cookie.get("mail")) && <Route path="/complaint" component={ComplaintPage} />}
                     {(cookie.get("mail")) &&<Route path="/Homepage" component={HomePage} />}
                
                    {(cookie.get("mail")) &&<Route path="/profile" component={ProfilePage} /> }
                </Switch>
            </BrowserRouter>
           
        </div>
    )
}

export default App
