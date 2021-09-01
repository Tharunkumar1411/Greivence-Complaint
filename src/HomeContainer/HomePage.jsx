import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
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

import TopNavBar from "../ComplaintContainer/TopNavBar"
import axios from 'axios'
import {Cookies} from 'react-cookie';
import { Badge } from '@material-ui/core';

const HomePage = () => {
    
    const cookie = new Cookies();
    const [value,setValue] = useState()
  
    const [state,setState] = useState(<HostelContainer />)


    const history = useHistory(); 

    
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
    function BackHome() {
        history.push("/complaint");
    }
    function Logout() {
      
        var cook = cookie.get("token")
        axios.put("https://grievence-backend.herokuapp.com/deleteAccount",cook).then((res)  => {
            if(res) {
                sessionStorage.removeItem("jwtToken");
                sessionStorage.removeItem("mail");
                window.location.replace("/");
            }
            

        })
    }

    
    return(

        <div>
            <TopNavBar /><br /><br /><br />


            <button id='dropdown-basic' onClick = {BackHome}>Home</button>
            <button id='dropdown-basic' onClick = {Logout}>LogOut</button>

        
                {state}<br /><br /><br />
           
                <BottomNavigation id="BottomNavigation"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    show(newValue)
                    console.log(newValue)
                }}
                showLabels
                >
                <BottomNavigationAction  id="label" label="Hostel" value="hostel" icon={<Badge  badgeContent={0} color="primary"><Hostell /></Badge>}/>
                <BottomNavigationAction  id="label" label="Transport" value="trans" icon={<Badge  badgeContent={0} color="primary"><Transport /></Badge>} />
                <BottomNavigationAction  id="label" label="Academic" value="academic" icon={<Badge  badgeContent={0} color="primary"><Academic /></Badge>} />
                <BottomNavigationAction  id="label" label="Ragging" value="ragging" icon={<Badge  badgeContent={0} color="primary"><Ragging /></Badge>} />
                <BottomNavigationAction  id="label" label="Other" value="other" icon={<Badge badgeContent={0} color="primary"> <Other /></Badge>} />
                </BottomNavigation>
            
        </div>
    )
}

export default HomePage;