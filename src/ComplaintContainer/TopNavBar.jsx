import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import {Cookies} from 'react-cookie';

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
  
  }
}));

export default function TopNavBar() {

  const [open, setOpen] = React.useState(false);
  const cookie = new Cookies();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function Logout() {
      
    var cook = sessionStorage.getItem("mail")
    axios.put("https://gire-backend.herokuapp.com/deleteAccount",cook).then((res)  => {
        if(res) {
            sessionStorage.removeItem("mail");
            cookie.remove("jwtToken");
            window.location.replace("/");
            setOpen(false);
        }
        

    })
}

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Grievence of VCET
          </Typography>

          <Button color="inherit" onClick={handleClickOpen}>LogOut </Button>
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
    </div>
  );
}
