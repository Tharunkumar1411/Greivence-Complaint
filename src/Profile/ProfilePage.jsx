import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Cookies} from 'react-cookie';
import TopNavBar from '../ComplaintContainer/TopNavBar';
import Axios from 'axios';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Grid from '@material-ui/core/Grid';

import EqualizerIcon from '@material-ui/icons/Equalizer';
const useStyles = makeStyles((theme) => ({
    rootCard:{
        marginLeft:"30px",
        border:"none",
        background:"none"
      
    },
    card:{
        width:'max-content',
        padding:'20px',
        marginBottom:'10px',
        margin:'10px',
        border:"none",
        background:"none"
    },
    android:{
        width:'50px'
    },
    card2:{
        position:'right',
        padding:'10px',
        margin:'10px',

      
    },
    bar:{
        marginBottom:'5px',  
        color:"black",
    },
    innercard:{
        width:'max-content',
        marginBottom:'10px',
        margin:'10px',
        
        marginLeft:'auto',
        marginRight:'auto',
    },
    textinCard:{
        margin:"10px"
    }
}))


const ProfilePage = (props) => {
    const [ProfilePage,setProfilePage] = useState({username:'issues to access',email:'issues to access',logedIn:""});
    const [barData,setBarData] = useState({hostel:0,academic:0,transport:0,ragging:0,others:0})

    const classes = useStyles();
    const cookie = new Cookies();

    useEffect(() => {
        Axios.post("https://grievence-backend.herokuapp.com/getComplaintCount",{Email:cookie.get("mail")}).then((res) => {
         setBarData({...barData,hostel:res.data[0],academic:res.data[1],ragging:res.data[2],transport:res.data[3],others:res.data[4]})
        })
   
    },[barData])

    const totalComplaintsCount = (barData.hostel + barData.academic + barData.transport + barData.ragging + barData.others);
 

    useEffect(() => {
        
        Axios.put("https://grievence-backend.herokuapp.com/getUserdetails",{Email:cookie.get("mail")}).then((res) => {
//https://grievence-backend.herokuapp.com
            setProfilePage({...ProfilePage,username:res.data.name,email:res.data.email,logedIn:res.data.logedIn})
        
        })

        
                                                                                     
    })

    return ( 
        <div>
            <TopNavBar /><br /><br /><br /><br /><br />

        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <div className={classes.rootCard}>

                <EmojiPeopleIcon />

                <text style={{color:"purple"}} >Be The Best Version Of You.</text><hr />

                <div className={classes.textinCard}>
                    <h5>Hi {ProfilePage.username} </h5>
                    <h5>{ProfilePage.email}</h5>
                    <h5>First loged In : {ProfilePage.logedIn}</h5>
                </div>
            </div>

             </Grid>

             <Grid item xs={12} md={6}>
             <div className={classes.innercard}>
                  
                    <EqualizerIcon />
                  <text style={{color:"purple"}} >Little By Little Becomes A Lot</text><hr />
                  
                  <h5>Total Complaintes:{totalComplaintsCount}</h5>
                  {/* <h5>Responded Com:</h5> */}
              
            
            
             </div>  
            </Grid>
         </Grid>

                <div className={classes.card2}>
                   

                   <h3>Your Progress in Grievence</h3>
                   <text>Unless We Progress, We Regress.</text><hr />

                   <div>
                       <label>Hostel</label>
                       <ProgressBar now={barData.hostel}  className={classes.bar}/>
                       <label>Transport</label>

                       <ProgressBar now={barData.transport} className={classes.bar}/>
                       <label>Ragging</label>

                       <ProgressBar now={barData.ragging}  className={classes.bar}/>
                       <label>Academic</label>

                       <ProgressBar now={barData.academic} className={classes.bar}/>
                       <label>Others</label>

                       <ProgressBar now={barData.others} className={classes.bar}/>
                   </div>
               </div>
        
          

      </div>
    )
}

export default ProfilePage

