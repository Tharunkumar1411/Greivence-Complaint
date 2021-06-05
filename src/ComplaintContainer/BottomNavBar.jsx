import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Info from '@material-ui/icons/Info';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {Cookies} from 'react-cookie';


export default function BottomNavBar() {
  const history = useHistory();

  const cookie = new Cookies();
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

  const ToAbout = () => {
    history.push('/ToAbout');
  }

  return (
    <BottomNavigation id="BottomNavigation"
    showLabels
    >
      <BottomNavigationAction  id="label" label="SignUp" icon={<Fingerprint />} onClick={BackToSignin}/>
      <BottomNavigationAction  id="label" label="About" icon={<Info />} onClick={ToAbout}/>
      {/* <BottomNavigationAction  id="label" label="Contact" icon={<ContactSupport onClick={ToContact}/>} /> */}
    </BottomNavigation>
  );
}
