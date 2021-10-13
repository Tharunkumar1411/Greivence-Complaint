import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopNavBar from '../ComplaintContainer/TopNavBar';
import Axios from 'axios';
import Avatar from 'react-avatar';
import { Card } from '@material-ui/core';

import Hostel from '@material-ui/icons/RoomServiceOutlined';
import Transport from '@material-ui/icons/EmojiTransportationOutlined';
import Academic from '@material-ui/icons/BookOutlined';
import Ragging from '@material-ui/icons/RemoveCircleOutline';
import Other from '@material-ui/icons/QuestionAnswerOutlined';
import { DataGrid } from '@mui/x-data-grid';




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

const columns = [
    {
        field: 'complaint',
        headerName: 'COMPLAINT',
        width:200
    },
    {
        field: 'suggetion',
        headerName: 'SUGGETION',
        width:200
    }
];

const ProfilePage = (props) => {
    const [ProfilePage,setProfilePage] = useState({username:'issues to access',email:'issues to access',logedIn:""});
    const [barData,setBarData] = useState({hostel:0,academic:0,transport:0,ragging:0,others:0})
    const classes = useStyles();
    const [data, setData] = useState([])

    useEffect(() => {

        Axios.post("https://gire-backend.herokuapp.com/getComplaintCount",{Email:sessionStorage.getItem("mail")}).then((res) => {
        //  console.log(res)
        setBarData({...barData,hostel:res.data[0],academic:res.data[1],ragging:res.data[2],transport:res.data[3],others:res.data[4]})
        });
        
        Axios.put("https://gire-backend.herokuapp.com/getUserdetails",{Email:sessionStorage.getItem("mail")}).then((res) => {
            //https://gire-backend.herokuapp.com/
            setProfilePage({...ProfilePage,username:res.data.name,email:res.data.email,logedIn:res.data.logedIn})
        });
        
    },[]);

    useEffect(() => {
        fetch(`https://gire-backend.herokuapp.com/getDetailsForChart?Email=${sessionStorage.getItem("mail")}`).then((data) => (data.json()).then((data) => {
            
        var compData = [...data[0].comp, ...data[1].comp, ...data[2].comp, ...data[3].comp, ...data[4].comp];
        var suggData = [...data[0].suggetion, ...data[1].suggetion, ...data[2].suggetion, ...data[3].suggetion, ...data[4].suggetion]

            var gridData = [];
            // eslint-disable-next-line array-callback-return
            compData.map((value,index) => {
                if(value !== 0){
                    return gridData.push({
                        id: index + 1,
                        complaint: value,
                        suggetion: suggData[index]
                    })
                }
            });
            setData(gridData);
        }));
    },[]);

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
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        onRowClick = {(data) => {
                            console.log(data.row.complaint)
                        }}
                    />                    

                </div>
        </div>
    </div>
    )
}

export default ProfilePage

