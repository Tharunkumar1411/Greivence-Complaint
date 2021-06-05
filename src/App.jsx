import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './LoginContainer/LoginPage';
import ComplaintPage from './ComplaintContainer/ComplaintPage'


function App(){
  

 
    return (
        <div>
            <BrowserRouter>
        
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/complaint" component={ComplaintPage} />
                    {/*  <Route path="/admin" component={AdminPage} /> */}
                    {/*  <Route path="/BackToSignin" component={LoginForm} /> */}
                    {/*  <Route path="/ToContact" component={ToContact} /> */}
                    {/* <Route path="/ToAbout" component={ToAbout} /> */}
                    {/* <Route path="/profile" component={Profile} />  */}
                </Switch>
            </BrowserRouter>
           
        </div>
    )
}

export default App
