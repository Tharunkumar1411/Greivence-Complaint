import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import cogoToast from 'cogo-toast';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const HomePage = () => {
    
    const cookie = new Cookies();
    
    const [value,setValue] = useState()
    const history = useHistory(); 
    const [complaint,setComplaint] = useState({radio:"Others",comp:"Empty Complaint",suggetion:"Empty Suggetion",email:sessionStorage.getItem("mail"),date:new Date().toLocaleDateString(), status:"Pending"});

    const [state,setState] = useState(<HostelContainer />)

    const [open, setOpen] = React.useState(false);

    const [showStore,setShowStore] = useState(false)

    useEffect (() => {

        var mail = sessionStorage.getItem("mail");

        if(!mail){
            window.location.replace("/");
        }
    },[cookie]);

    function submitHandler(e){
        e.preventDefault();

        setShowStore(false)

        setOpen(false);

        axios.post("http://localhost:4000/addComplaint",complaint).then(res => {
            if(res){
                cogoToast.success(`${res.data}`);
            }else{
                cogoToast.error("something went wrong")
            }
        })
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    
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
    
    return(

        <div>
            <TopNavBar />

            <div class="stateDiv">
                {state}<br /><br />
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
            
        </div>
    )
}

export default HomePage;