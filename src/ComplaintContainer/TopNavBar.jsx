import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Cookies} from 'react-cookie';
import axios from 'axios'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fingerprint from '@material-ui/icons/Fingerprint';

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
  const cookie = new Cookies();

  const history = useHistory(); 
  const showProfile = () => {
    history.push('/profile')
  }
  const BackToSignin = () => {

    var cook = cookie.get("token")
    axios.put("https://grievence-backend.herokuapp.com/deleteAccount",cook).then((res)  => {
        if(res) {
            cookie.remove("jwtToken");
            cookie.remove("mail");
            history.push("/");
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
          {/* <BottomNavigationAction  id="label" label="SignUp" icon={<Fingerprint />} onClick={BackToSignin}/> */}

          <Button color="inherit" onClick={showProfile}>Profile </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
