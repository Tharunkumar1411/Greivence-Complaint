import React,{useState,useEffect} from 'react'
import '@material-ui/core'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase, Grid, Hidden, TextField } from '@material-ui/core';
import "./LoginPage.css"
import { AccountCircle, EmailOutlined, LockOpen } from '@material-ui/icons';

import LoginPicture from "../Assets/LoginPic.svg"
import Wave from "../Assets/wavefour.svg"
import cogoToast from 'cogo-toast';

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
    const [mailError,setMailError] = useState(true);

    const history = useHistory();

    useEffect(() => {

        var cookieCheck = sessionStorage.getItem("jwtToken");
        if(cookieCheck){
            axios.put("https://grievence-backend.herokuapp.com/jwt",{jwt:sessionStorage.getItem("jwtToken")}).then((res) => {
                //https://grievence-backend.herokuapp.com   
             
                sessionStorage.setItem("mail",res.data);

                history.push("/home");
            })
               
        }
      
        },[cookie,history]);
 


    const submitHandler = (e) => {
        e.preventDefault()

        var pattern = new RegExp(/^[A-Za-z0-9+_.-]{2,64}@(.+)$/i);

    
        // var namePattern = new RegExp(/[aA-zZ]{7,29}"/);

        var checkPattern = pattern.test(details.email);

        setMailError(checkPattern)

        if(details.name.length >=3 && checkPattern){

            console.log("done",details)

           
            axios.put('http://grievence-backend.herokuapp.com/signIn',details).then(res => {
//grievence-backend.herokuapp.com
            sessionStorage.setItem("mail",details.email)
            
            if(res.data == "ALLOWUSER"){

                sessionStorage.setItem("jwtToken",res.data.token);

                cogoToast.success("Login Sucessfull");

                history.push("/home")
                      
            }else{
                
                sessionStorage.setItem("jwtToken",res.data.token);

                cogoToast.success("Login Sucessfull");

                history.push("/home")


            }
            })
        }else{


            (!checkPattern)? cogoToast.error("Enter Valid Mail Id"): cogoToast.error("Enter Valid Username")

       
        }
  
    }


    return(
 

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
