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

import Hostel from '@material-ui/icons/RoomServiceOutlined';
import Transport from '@material-ui/icons/EmojiTransportationOutlined';
import Academic from '@material-ui/icons/BookOutlined';
import Ragging from '@material-ui/icons/RemoveCircleOutline';
import Other from '@material-ui/icons/QuestionAnswerOutlined';

import { DataGrid } from '@mui/x-data-grid';


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
        display:"flex",
        gap:"1rem",
        width:"fit-content",
        textAlign:"center",
        display:"flex",
        flexDirection:"row",
        padding:"1rem",
        opacity:"0.9",
        background: "linear-gradient(280deg, rgba(2,0,36,1) 0%, rgba(79,112,194,1) 28%)"

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
        Axios.post("https://gire-backend.herokuapp.com/getComplaintCount",{Email:sessionStorage.getItem("mail")}).then((res) => {
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'complaint',
            headerName: 'COMPLAINTS',
            width: 150,
            editable: true,
        },
        {
            field: 'state',
            headerName: 'STATE',
            width: 150,
            editable: true,
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,
        {
            field: "time",
            headerName: "DATE",
            sortable: false,
            width: 160,
        },
        
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    useEffect(() => {
        
        Axios.put("https://gire-backend.herokuapp.com/getUserdetails",{Email:sessionStorage.getItem("mail")}).then((res) => {
//https://gire-backend.herokuapp.com/
            setProfilePage({...ProfilePage,username:res.data.name,email:res.data.email,logedIn:res.data.logedIn})
        });

        Axios.put("https://gire-backend.herokuapp.com/getDetailsForChart", {email: sessionStorage.getItem("mail")}).then((res) => {
            console.log(res)
        })
    });


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
                            <h6><Hostel /> {barData.hostel}</h6>
                            <h6><Academic /> {barData.academic}</h6>
                            <h6><Transport /> {barData.transport}</h6>
                            <h6><Ragging /> {barData.ragging}</h6>
                            <h6><Other /> {barData.others}</h6>

                        </Card>
                    </Fragment>

                </div>


                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>

            </div>

    </div>
    )
}

export default ProfilePage

