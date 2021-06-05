import React, { useState,useEffect } from 'react';
import './ComplaintPage.css'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Row, Col} from 'reactstrap';
import Reply from '@material-ui/icons/Reply';
import TextField from '@material-ui/core/TextField';
import Hotel from '@material-ui/icons/Hotel';

import Books from '@material-ui/icons/BookOutlined';


import Avoid from '@material-ui/icons/RemoveCircleOutline';


import Bus from '@material-ui/icons/EmojiTransportationOutlined';

import Other from '@material-ui/icons/QuestionAnswerOutlined';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TopNavBar from './TopNavBar'
import {Cookies} from 'react-cookie';
import { Grid } from '@material-ui/core';
import DoDont from "./DoDont"


const ComplaintPage = () => {
    const cookie = new Cookies();

    const [complaint,setComplaint] = useState({radio:"Others",comp:"Empty Complaint",suggetion:"Empty Suggetion",email:cookie.get("mail"),date:new Date().toLocaleDateString()});

    const [showStore,setShowStore] = useState(false)

    const [compCount,setCompCount] = useState({HostelComplaint:0,AcademicComplaint:0,TransportComplaint:0,RaggingComplaint:0,UnknownComplaint:0})

    const history = useHistory();
   
    useEffect (() => {
     

        var mail = cookie.get("mail");
      

        
       
            axios.post("https://grievence-backend.herokuapp.com/getComplaintCount",{Email:mail}).then(res => {
                //https://grievence-backend.herokuapp.com
                setCompCount({...compCount,HostelComplaint:res.data[0],AcademicComplaint:res.data[1],RaggingComplaint:res.data[2],TransportComplaint:res.data[3],UnknownComplaint:res.data[4]})
            })
    },[cookie]);

    function submitHandler(e){
        e.preventDefault();

        setShowStore(false)

        axios.post("https://grievence-backend.herokuapp.com/addComplaint",complaint).then(res => {
            if(res){
               console.log(res)
            }else{
                alert("enter correct inpost")
            }
        })
    }

    function HomePage(){
        history.push("/Homepage");
    }
   
   function complaintshow(){
        setShowStore(true);
   }

    return(
        <div>
            <TopNavBar /><br /><br /><br />           
          
            <Row >
                    <Col xs="12" md="12">
                    <h5 className="quoteBox"><i>
                        PROBLEM...? 
                     </i> Write a grievence  </h5>
                    </Col>
                </Row> 
            <button onClick = {HomePage} id="button-design1">Dashboard</button>
            <button onClick = {complaintshow} id="button-design1">Complaint</button>       
            <br></br>
         

            <div className="modal-wrapper" style={{display: showStore ? 'block' : 'none' }}>
                        <div className="modal-header">
                            <text>Complaint Model</text>
                    
                        </div>

                        <div className="modal-content">
                            <div className="modal-body">
                 <form>
                    <h3>Field</h3>
                    
                    <RadioGroup aria-label="gender" name="gender1" row>
                        <FormControlLabel   control={<Radio />} label="Hostel" value="Hostel"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                        <FormControlLabel  control={<Radio />} label="Ragging" value="Ragging" onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                        <FormControlLabel control={<Radio />} label="Academics" value="Academics"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                        <FormControlLabel control={<Radio />} label="Other" value="Others"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                        <FormControlLabel   control={<Radio />} label="Transport" value="Transport"  onChange={e => setComplaint({...complaint,radio:e.target.value})} required/>
                    </RadioGroup>       

                    <TextField
                        id="standard-multiline-flexible"
                        label="Complaint"
                        multiline
                        rowsMax={12}
                        onChange={e => setComplaint({...complaint,comp:e.target.value})}
                        />

               
                    <TextField
                        id="standard-multiline-flexible"
                        label="Suggetion"
                        multiline
                        rowsMax={12}
                        onChange={e => setComplaint({...complaint,suggetion:e.target.value})}
                        />

                </form>
               
        </div>
        <div className="modal-footer">
            <button onClick={submitHandler} id="button-design2">Submit</button>
        </div>
      </div>
    </div>
           

      <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
                            <div class="frame">
                                <div class="card">
                                    <div class="flip hvr-outline-in">
                                        
                                        <div class="front">
                                            <h4>Hostlers</h4>
                                            <button className="reply"><Hotel/></button>
                                            {/* <button className="reply"><Food/></button>
                                            <button className="reply"><Room/></button> */}
                                        </div>
                                        
                                        <div class="back">
                                             {/* <text><strong>Your complaints {HostelComplaint}</strong></text><br /> */}
                                             <text id="rotateContainer"><strong> {compCount.HostelComplaint} Complaints Yours</strong></text><br />
                                             <button className="reply"><Reply/></button>
                                             
                                        </div>

                                    </div>
                                
                                </div>
                            </div>
               
          </Grid>
          <Grid item xs={12} md={4}>
          <div class="frame">
                                <div class="card">
                                    <div class="flip hvr-outline-in">
                                        
                                        <div class="front">
                                            <h4>Academics</h4>
                                            <button className="reply"><Books/></button>
                                            {/* <button className="reply"><Faculty/></button>
                                            <button className="reply"><ClassRoom/></button> */}
                                        </div>
                                        
                                        <div class="back">
                                             {/* <text><strong>Your complaints {AcademicComplaint}</strong></text><br /> */}
                                             <text id="rotateContainer"><strong> {compCount.AcademicComplaint} Complaints Yours</strong></text><br />
                                             <button className="reply"><Reply/></button>
                                        </div>
                                    </div>
                                </div>
                            </div><br />
          </Grid>
          <Grid item xs={12} md={4}>
          <div class="frame">
                               <div class="card">
                                   <div class="flip hvr-outline-in">
                                       
                                       <div class="front">
                                           <h4>Ragging</h4>
                                           <button className="reply"><Avoid/></button>
                                            {/* <button className="reply"><Teasing/></button>
                                            <button className="reply"><Missbehave/></button> */}
                                       </div>
                                       
                                       <div class="back">
                                            {/* <text><strong>Your complaints {RaggingComplaint}</strong></text><br /> */}
                                            <text id="rotateContainer"><strong> {compCount.RaggingComplaint} Complaints Yours</strong></text><br />
                                            <button className="reply"><Reply/></button>
                                       </div>

                                   </div>
                               
                               </div>

                           
                           </div><br />
          </Grid>

      </Grid>

      <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <div class="frame">
                               <div class="card">
                                   <div class="flip hvr-outline-in">
                                       
                                       <div class="front">
                                           <h4>Transport</h4>
                                           <button className="reply"><Bus/></button>
                                            {/* <button className="reply"><Comfort/></button>
                                            <button className="reply"><Report/></button> */}
                                       </div>
                                       
                                       <div class="back">
                                            {/* <text><strong>Your complaints {TransportComplaint}</strong></text><br /> */}
                                            <text id="rotateContainer"><strong> {compCount.TransportComplaint} Complaints Yours</strong></text><br />
                                            <button className="reply"><Reply/></button>
                                       </div>
                                   </div>
                               </div>
                           </div><br />
          </Grid>
          <Grid item xs={12} md={6}>
               <div class="frame">
                               <div class="card">
                                   <div class="flip hvr-outline-in">
                                       
                                       <div class="front">
                                           <h4>Others</h4>
                                           <button className="reply"><Other /></button>
                                       </div>
                                       
                                       <div class="back">
                                            {/* <text><strong>Your complaints {UnknownComplaint}</strong></text><br /> */}
                                            <text id="rotateContainer"><strong> {compCount.UnknownComplaint} Complaints Yours</strong></text><br />
                                            <button className="reply"><Reply/></button>
                                       </div>
                                   </div>                        
                               </div>
                           </div><br />
          </Grid>

      </Grid>

                <DoDont />

                {/* <BottomNavBar /> */}
                

     
        </div>
    )
}



export default ComplaintPage;