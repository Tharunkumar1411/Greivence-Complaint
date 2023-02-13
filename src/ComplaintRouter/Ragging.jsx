import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'
import { Grid } from '@material-ui/core';

const RaggingContainer = () => {
    const [raggings,setRagging] = useState(["Testing"])


    useEffect(() => {
        axios.put("https://grievence-back.onrender.com/getComplaintData",{section:"RAGGING"}).then((res)=>{

            var array = []
            var timeLog = []

            for (let index = 0; index < res.data.length; index++) {
                for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                    array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1]})                
                }
        }
        setRagging(array)
        })
    },[]);

        return(
        <Grid container spacing={2}>    
            {raggings.map((hos,i) => {
                return(
                    <Grid item xs={12} sm={6} md={6} key={i} >
                        <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Ragging"}/>
                    </Grid>
                )
            })}
        </Grid>
        )
}

export default RaggingContainer;