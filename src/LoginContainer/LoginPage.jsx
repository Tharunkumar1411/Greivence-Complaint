import React,{useState,useEffect} from 'react'
import '@material-ui/core'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase, Grid, Hidden, TextField } from '@material-ui/core';
import { AccountCircle, EmailOutlined, LockOpen } from '@material-ui/icons';

import LoginPicture from "../Assets/LoginPic.svg"
import Wave from "../Assets/wavefour.svg"
import cogoToast from 'cogo-toast';

import Dialog from '@material-ui/core/Dialog';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Bars     } from 'react-loading-icons'

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

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
    },

    button:{
        color:"white",
        backgroundColor:"rgb(112, 105, 212)", 
        width:"12rem",
        padding:"0.5rem", 
        borderRadius:"1.5rem", 
        display:"flex", 
        marginRight:"auto", 
        marginLeft:"auto"
    }

}));

function LoginPage(){

    const classes = useStyles();
    const cookie = new Cookies();
    const [details,setDetails] = useState({name:"", password:"", email:"", rememberMe:false});
    const [mailError,setMailError] = useState(true);
    const [open, setOpen] = React.useState(false);

    const history = useHistory();

    useEffect(() => {

        var cookieCheck = cookie.get("jwtToken");
        
        if(cookieCheck){
            axios.put("https://gire-backend.herokuapp.com/jwt",{jwt:cookieCheck}).then((res) => {
                //https://gire-backend.herokuapp.com/  
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

            handleClickOpen();

            axios.put('https://gire-backend.herokuapp.com/signIn',details).then(res => {
            //grievence-backend.herokuapp.com
            sessionStorage.setItem("mail",details.email)
            
            if(res.data.sign){
                console.log(res.data.sign)
                if(details.rememberMe){
                    cookie.set("jwtToken", res.data.token, {expires:new Date(Date.now() + 5 * 1000)})
                }
                // sessionStorage.setItem("jwtToken",res.data.token);
                //cookie 

                history.push("/home")
            }else{
                cogoToast.error("Enter Valid Password")
            }
            })
        }else{

            (!checkPattern)? cogoToast.error("Enter Valid Mail Id"): cogoToast.error("Enter Valid Username")

        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };



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
                                    <form onSubmit={submitHandler} autoComplete="off" style={{padding:"0.5rem"}}>
                                    
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

                                        <ButtonBase   type="submit" className={classes.button} >
                                            Log In
                                        </ButtonBase>
                                    </form>

                            </Grid>
                        </Grid>


            </div>

            <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth="true"
            style={{opacity:"0.8", }}
        >
            <DialogTitle style={{ cursor: 'move', textAlign:"center" }} id="draggable-dialog-title"> 

                Loading   <Bars   stroke="#2b4e75" strokeOpacity={.500} />

            </DialogTitle>


        </Dialog>

    </div>


    );
}

export default LoginPage;
