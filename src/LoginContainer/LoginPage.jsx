import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import '@material-ui/core'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase, Grid, Hidden, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import "./LoginPage.css"
import { AccountCircle, EmailOutlined, LockOpen } from '@material-ui/icons';
import { Button } from 'bootstrap';
import { Fragment } from 'react';
import LoginPicture from "../Assets/LoginPic.svg"
import Wave from "../Assets/wavefour.svg"
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh", /* Magic here */
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position:"fiexed",
      overflow:"hidden",

    
    },

    header:{
  
        textAlign:"center", 
        color:"#245d70"
    }

   
  }));

function LoginPage(){

    const classes = useStyles();
   
    const cookie = new Cookies();
    const [details,setDetails] = useState({name:"", password:"", email:"", rememberMe:false});
    const [mailError,setMailError] = useState(true)

    

    const history = useHistory();

    useEffect(() => {

        var cookieCheck = cookie.get("jwtToken");
        if(cookieCheck){
            axios.put("https://grievence-backend.herokuapp.com/jwt",{jwt:cookie.get("jwtToken")}).then((res) => {
                //https://grievence-backend.herokuapp.com   
             
                cookie.set("mail",res.data);

                history.push("/complaint");
            })
               
        }
      
        },[cookie,history]);
 

    
    const googleAuth = () => {
        axios.get("https://grievence-backend.herokuapp.com/google").then((res)=>{
            console.log(res);
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        var pattern = new RegExp(/^[A-Za-z0-9+_.-]{2,64}@(.+)$/i);

    
        // var namePattern = new RegExp(/[aA-zZ]{7,29}"/);

        var checkPattern = pattern.test(details.email);
        setMailError(checkPattern)

        if(details.name.length >=3 && checkPattern){

            console.log("done",details)

           
            axios.put('https://grievence-backend.herokuapp.com/signIn',details).then(res => {

            sessionStorage.setItem("mail",details.email)
  
            if(res.data == "ALLOWUSER"){

                history.push("/complaint")
                      
            }else{

                history.push("/complaint");

            }
            })
        }else{
            console.log("err",details)
        }
  
    }


    return(
        // <div className="loginBody" >
        //     <div className="loginHeader">
        //         <h2 style={{color:"rgb(40, 128, 201)",fontSize:"60px",textAlign:"center",}}>G</h2>
          
     
        //         <h3 style={{textAlign:"center",opacity:"2",color:"white",fontSize:"30px"}}>Grievence System</h3><br />
        //     </div><br /><br />
    
        //         <div className="login1" style={{width:'16rem',textAlign:'center'}}>
        //             <Form onSubmit={submitHandler}>
        //                     <input minLength="12" type="email" pattern={"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"} placeholder="Email" onChange= {(e) =>{setDetails({...details,email:e.target.value})}} value={details.email}  required /><br /><br />
                        
        //                     <input minLength="3" type="text" autoComplete="new-password" placeholder="Username" onChange= {e =>setDetails({...details,name:e.target.value})} value={details.name} required /><br /><br />

        //                     <input minLength="5" type="password" autoComplete="new-password" placeholder="password"  onChange= {e =>setDetails({...details,password:e.target.value})} value={details.password} required /> <br /><br /><br />

        //                     <button className="buttonStyle"  type="submit" value="login" >Login</button><br /><br />
        //                     {/* <button className="buttonStyle" value="Google" onClick={googleAuth}>G+</button><br /><br /> */}

        //                 </Form>
        //         </div>
               
          
        // </div>

        <div style={{backgroundImage:`url(${Wave})`,inset:"0",backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
         

            <div className={classes.root}>
                        

                        <Grid container spacing={3}>

                            <Hidden xsDown>
                                <Grid item xs={12} sm={6} display={{ xs: "none", lg: "block" }}>

                                        <img src={LoginPicture} alt="loginPicture" style={{width:"100%"}}/>
                                
                                </Grid>
                            </Hidden>

                            <Grid item xs={12} sm={6} display={{ xs: "none", lg: "block" }}>
                                    
                                    <h1 className={classes.header} >Grievence Log In</h1>
                                    <form onSubmit={submitHandler} style={{padding:"0.5rem"}}>
                                    
                                        <Grid container spacing={1} alignItems="flex-end" >
                                            <Grid item>
                                                <AccountCircle />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="input-with-icon-grid" onChange= {e =>setDetails({...details,name:e.target.value})} value={details.name} type="text" label="Username" />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <LockOpen />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="input-with-icon-grid" type="password"  onChange= {e =>setDetails({...details,password:e.target.value})} value={details.password} label="Password" />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <EmailOutlined />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="input-with-icon-grid" type="email" minLength="3" onChange= {(e) =>{setDetails({...details,email:e.target.value})}} value={details.email} pattern={"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"} label="Email" />
                                            </Grid>
                                        </Grid><br />
                                    
                                        <input type="checkbox" onChange={(e) => setDetails({...details, rememberMe:!details.rememberMe})}/><label>Remember me</label><br />

                                        <ButtonBase   type="submit" style={{color:"white", backgroundColor:"rgb(104, 125, 212)", width:"12rem",
                                         padding:"0.5rem", borderRadius:"1.5rem", display:"flex", marginRight:"auto", marginLeft:"auto"
                                         }}>
                                             Log In
                                        </ButtonBase>
                                    </form>

                            </Grid>
                        </Grid>


                    </div>

        </div>
       


    );
}

export default LoginPage;
