import React,{useState, useEffect} from 'react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Badge from '@mui/material/Badge';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import  CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import  DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import  DialogTitle from '@mui/material/DialogTitle';
import  FormControlLabel from '@mui/material/FormControlLabel';
import  Grid from '@mui/material/Grid';
import  Hidden from '@mui/material/Hidden';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';


import Hostell from "@mui/icons-material/RoomServiceOutlined";
import Transport from "@mui/icons-material/EmojiTransportationOutlined";
import Academic from "@mui/icons-material/BookOutlined";
import Ragging from "@mui/icons-material/RemoveCircleOutline";
import Other from "@mui/icons-material/QuestionAnswerOutlined";


import HostelContainer from "../ComplaintRouter/Hostel";
import TransportContainer from "../ComplaintRouter/Transport"
import AcademicContainer from "../ComplaintRouter/Academics"
import RaggingContainer from "../ComplaintRouter/Ragging"
import OtherContainer from "../ComplaintRouter/Others"

import TopNavBar from "../ComplaintContainer/TopNavBar"
import {Cookies} from 'react-cookie';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Draggable from 'react-draggable';
import { Router, useHistory } from 'react-router-dom';

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
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    app:{
      position:'fixed',
    },
  }));

const HomePage = () => {
    
    const cookie = new Cookies();
    const classes = useStyles();

    const [value,setValue] = useState()
  
    const [complaint,setComplaint] = React.useState({radio: null,comp: null,suggetion: null,email:sessionStorage.getItem("mail"),date:new Date().toLocaleDateString(), status:"Pending", response: 'NILL'});

    const [openComp, setComp] = React.useState(false);
  
    const [state,setState] = useState(<HostelContainer />);

    const navigate = useHistory();

    // useEffect(() => {
    //     axios.post("https://grievence-back.onrender.com/getComplaintCount",{"email": sessionStorage.getItem("mail")}).then((data) => {
    //         console.log(data);
    //     })
    // })

    useEffect (() => {

        var mail = sessionStorage.getItem("mail");

        if(!mail){
            window.location.replace("/");
        }
    },[cookie]);
    

    function show(Value){

        switch (Value) {
            case 'hostel':
                setState(<HostelContainer />);
                break;
            case 'trans':
                setState(<TransportContainer />)
                break;
            case 'academic':
                setState(<AcademicContainer />)
                break
            case 'ragging':
                setState(<RaggingContainer />)
                break
            case 'other':
                setState(<OtherContainer />)
                break
            default:
                break;
        }
    }

    const handleCompOpen = () => {
        setComp(true);
    };
    const handleCompClose = () => {
        setComp(false);
    };
    
    function submitHandler(e){
      e.preventDefault();
    
      if(complaint.radio == null){
        cogoToast.info("Select a field you want to raise your grievence!")
      }else if(complaint.comp == null){
        cogoToast.info("Empty Grievence can't acceptable!")
      }
    
      axios.post("https://grievence-back.onrender.com/addComplaint",complaint).then(res => {
          if(res){
              cogoToast.success(`${res.data}`);
              handleCompClose();
          }else{
              cogoToast.error("something went wrong");
              handleCompClose();
          }
      })
    }


    
    return(

        <div style={{overflow:"hidden"}}>
            <TopNavBar />

            <div class="stateDiv">
            <Grid container spacing={2}>
                <Hidden xsDown>
                    <Grid item xs={4}>
                        <Card style={{margin:"1rem"}}>
                            <CardContent>Total Response</CardContent>
                            <CardContent>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                                    <Badge badgeContent={4} color="primary" >
                                        <Hostell />
                                    </Badge>

                                    <Badge  badgeContent={0} color="primary"><Transport /></Badge>
                                    <Badge  badgeContent={0} color="primary"><Academic /></Badge>
                                    <Badge  badgeContent={0} color="primary"><Ragging /></Badge>
                                    <Badge badgeContent={10} color="primary"> <Other /></Badge>
                            </div>
                            
                            </CardContent>
                            <CardContent style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                                <Button style={{fontWeight:"bold"}} onClick={handleCompOpen}>Grievence</Button>
                                <Button style={{fontWeight:"bold"}} onClick={() => navigate.push("/profile")}>Profile</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Hidden>

                <Grid item xs={12} md={8} sm={8}>
                    {state}<br /><br />
                </Grid>
            </Grid>
            
            </div>

            <BottomNavigation id="bottomNav"
                style={{zIndex:"1"}}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    show(newValue)
                }}
                showLabels
            >
                    <BottomNavigationAction  id="label" label="Hostel" value="hostel" icon={<Badge  badgeContent={0} color="primary"><Hostell /></Badge>}/>
                    <BottomNavigationAction  id="label" label="Transport" value="trans" icon={<Badge  badgeContent={0} color="primary"><Transport /></Badge>} />
                    <BottomNavigationAction  id="label" label="Academic" value="academic" icon={<Badge  badgeContent={0} color="primary"><Academic /></Badge>} />
                    <BottomNavigationAction  id="label" label="Ragging" value="ragging" icon={<Badge  badgeContent={0} color="primary"><Ragging /></Badge>} />
                    <BottomNavigationAction  id="label" label="Other" value="other" icon={<Badge badgeContent={0} color="primary"> <Other /></Badge>} />
            </BottomNavigation>
            

            <Dialog
                open={openComp}
                onClose={handleCompClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                fullWidth="true"
            >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Grievence Complaint
            </DialogTitle>

            <DialogContent>

            <form>
                <RadioGroup aria-label="gender" name="gender1" row>
                <FormControlLabel   control={<Radio />} label="Hostel" value="Hostel"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                <FormControlLabel  control={<Radio />} label="Ragging" value="Ragging" onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                <FormControlLabel control={<Radio />} label="Academics" value="Academics"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                <FormControlLabel control={<Radio />} label="Other" value="Others"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                <FormControlLabel   control={<Radio />} label="Transport" value="Transport"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                </RadioGroup>
                <TextField
                    id="filled-multiline-static"
                    label="Complaint"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={e => setComplaint({...complaint,comp:e.target.value})}
                    style={{padding:"0.5rem"}}
                    />


                <TextField
                    id="filled-multiline-static"
                    label="Suggetion"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={e => setComplaint({...complaint,suggetion:e.target.value})}
                    style={{padding:"0.5rem"}}
                />
            </form>
            </DialogContent>
            <DialogActions>

                <Button autoFocus onClick={handleCompClose} color="primary">
                Cancel
                </Button>

                <Button onClick={submitHandler} color="primary" className={classes.postBtn}>
                Post
                </Button>
            </DialogActions>
            </Dialog>

</div>

    )
}

export default HomePage;