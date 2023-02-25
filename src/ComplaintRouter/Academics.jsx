import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'
import { Grid } from '@mui/material';


const AcademicContainer = () => {
    
    const [academics,setAcademics] = useState(["Testing"])

    useEffect(() => {
        axios.put("https://grievence-back.onrender.com/getComplaintData",{section:"ACADEMIC"}).then((res)=>{
            //https://grievence-backend.herokuapp.com
            var array = []

            for (let index = 0; index < res.data.length; index++) {
                    for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                        array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1], "status":res.data[index].status[index],})
                    }
            }

            setAcademics(array)
    
        })
    },[]);


        return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <Grid container spacing={2}>
                {academics.map((hos,i) => {
                    return(
                        <Grid item xs={12} sm={6} md={6} key={i} >
                            <ComplaintCard key={i} comp={hos.complaint} status={hos.status} response={hos.response} time={hos.time} brand={"Academics"}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>

        )
}

export default AcademicContainer;