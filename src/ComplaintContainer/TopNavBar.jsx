import React from 'react';
import axios from 'axios'


import {Cookies} from 'react-cookie';

import Draggable from 'react-draggable';

import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Person from '@mui/icons-material/Person';
import PersonPinCircle from '@mui/icons-material/PersonPinCircle';

import AppBar from '@mui/material/AppBar';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


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

function PaperComponent(props) {
  return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
      </Draggable>
  );
}
export default function TopNavBar() {
  
  const [complaint,setComplaint] = React.useState({radio: null,comp: null,suggetion: null,email:sessionStorage.getItem("mail"),date:new Date().toLocaleDateString(), status:"Pending", response: 'NILL'});

  const [open, setOpen] = React.useState(false);
  const [openComp, setComp] = React.useState(false);

  const cookie = new Cookies();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      console.log(res);
      if(res){
          cogoToast.success(`${res.data}`);
          handleCompClose();
      }else{
          cogoToast.error("something went wrong");
          handleCompClose();
      }
  })
}


  function Logout() {
      
    var cook = sessionStorage.getItem("mail")
    axios.put("https://grievence-back.onrender.com/deleteAccount",cook).then((res)  => {
        if(res) {
            sessionStorage.removeItem("mail");
            cookie.remove("jwtToken");
            window.location.replace("/");
            setOpen(false);
        }
        

    })
}

  const classes = useStyles();
  const navigate = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Grievence
          </Typography>
          <Button color="inherit" onClick={() => navigate.push("/profile")}><Person /></Button>
          <Button color="inherit" onClick={handleCompOpen}><PersonPinCircle /></Button>
          <Button color="inherit" onClick={handleClickOpen}><LogoutOutlined /></Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Grievence Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sure you want to logout from Grievence?!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Logout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

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
                  <FormControlLabel  control={<Radio />} label="Hostel" value="Hostel"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
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
  );
}
