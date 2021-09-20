import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Cookies} from 'react-cookie';
import TopNavBar from '../ComplaintContainer/TopNavBar';
import Axios from 'axios';
import Avatar from 'react-avatar';
import WaveBackground from "../Assets/waveBack.svg";
import PersonImage from "../Assets/Person.jpg";
import { Card, CardContent } from '@material-ui/core';
import { CardBody } from 'reactstrap';


import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({


    rootCard:{
        marginLeft:"30px",
        border:"none",
        background:"none"

    },

    card:{
        width:"fit-content",
        textAlign:"center",
        display:"flex",
        flexDirection:"column",
        padding:"1rem",
        opacity:"0.5"
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
    },



    Forflex:{
        display:"flex",
        flexDirection:"column",
        gap:"4rem",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"2rem",
        paddingBottom:"2rem",
        [theme.breakpoints.up("sm")]: {
            flexDirection:"row",
            
        },
    },




}))


const ProfilePage = (props) => {
    const [ProfilePage,setProfilePage] = useState({username:'issues to access',email:'issues to access',logedIn:""});
    const [barData,setBarData] = useState({hostel:0,academic:0,transport:0,ragging:0,others:0})

    const classes = useStyles();




    useEffect(() => {
        Axios.post("https://grievence-backend.herokuapp.com/getComplaintCount",{Email:sessionStorage.getItem("mail")}).then((res) => {
        //  console.log(res)
        setBarData({...barData,hostel:res.data[0],academic:res.data[1],ragging:res.data[2],transport:res.data[3],others:res.data[4]})
        })
   
    },[barData])

    const totalComplaintsCount = (barData.hostel + barData.academic + barData.transport + barData.ragging + barData.others);
 
    const chartData = [
        { field: 'Hostel', percentage: barData.hostel },
        { field: 'Academic', percentage: barData.academic },
        { field: 'Transport', percentage: barData.transport },
        { field: 'Ragging', percentage: barData.ragging },
        { field: 'Others', percentage: barData.others },
    
      ];


    useEffect(() => {
        
        Axios.put("https://grievence-backend.herokuapp.com/getUserdetails",{Email:sessionStorage.getItem("mail")}).then((res) => {
//https://grievence-backend.herokuapp.com
            setProfilePage({...ProfilePage,username:res.data.name,email:res.data.email,logedIn:res.data.logedIn})
        })
                                                                                    
    })


    return ( 
        <div classname={classes.root}>

            <div>
                <TopNavBar />
            </div>

            <div style={{paddingTop:"5rem",}}>

            <Avatar name = {`${ProfilePage.username}`} alt="Picture" color="rgb(219, 218, 215)" round style={{display:"flex",marginLeft:"auto", marginRight:"auto" }}/>

                <h2 style={{textAlign:"center"}}>{ProfilePage.username}</h2>
                <h6 style={{textAlign:"center"}}>{ProfilePage.email}</h6>

                <div className={classes.Forflex}>
                    <Fragment>
                        <Card className={classes.card} >
                            <h6>Hostel {barData.hostel}</h6>
                            <h6>Academic {barData.academic}</h6>
                            <h6>Transport {barData.transport}</h6>
                            <h6>Ragging {barData.ragging}</h6>
                            <h6>Others {barData.others}</h6>

                        </Card>
                    </Fragment>

                </div>


                    <div className={classes.chart}>
                    <Chart
                            data={chartData} 
                        >
                            <ArgumentAxis />
                
                            <BarSeries
                                valueField="percentage"
                                argumentField="field"
                                color="rgb(65, 112, 186)"
                                barWidth="0.5"
                            />
                            <Title text="Complaint Percentage" />
                            <Animation />
                        </Chart>
                    </div>
                       

             
            </div>

      </div>
    )
}

export default ProfilePage

