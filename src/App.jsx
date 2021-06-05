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
                    <Route path="/complaint" component={ComplaintPage} />
                     <Route path="/Homepage" component={HomePage} />
                
                    <Route path="/profile" component={ProfilePage} /> 
                </Switch>
            </BrowserRouter>
           
        </div>
    )
}

export default App
