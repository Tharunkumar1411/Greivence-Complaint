import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'


import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

import {Cookies} from 'react-cookie';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import ComplaintIcon from "@material-ui/icons/BookOutlined"
import LogoutIcon from "@material-ui/icons/OpenWithOutlined"
import cogoToast from 'cogo-toast';
import { Person } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

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
          <Button color="inherit" onClick={handleCompOpen}><ComplaintIcon /></Button>
          <Button color="inherit" onClick={handleClickOpen}><LogoutIcon /></Button>
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
  );
}
