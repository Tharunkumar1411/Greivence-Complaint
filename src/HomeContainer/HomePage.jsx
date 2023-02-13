import React,{useState, useEffect} from 'react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Hostell from '@material-ui/icons/RoomServiceOutlined';
import Transport from '@material-ui/icons/EmojiTransportationOutlined';
import Academic from '@material-ui/icons/BookOutlined';
import Ragging from '@material-ui/icons/RemoveCircleOutline';
import Other from '@material-ui/icons/QuestionAnswerOutlined';

import HostelContainer from "../ComplaintRouter/Hostel";
import TransportContainer from "../ComplaintRouter/Transport"
import AcademicContainer from "../ComplaintRouter/Academics"
import RaggingContainer from "../ComplaintRouter/Ragging"
import OtherContainer from "../ComplaintRouter/Others"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import TopNavBar from "../ComplaintContainer/TopNavBar"
import {Cookies} from 'react-cookie';
import { Badge, Button, Card, CardContent, Grid, Hidden, makeStyles, Paper } from '@material-ui/core';
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