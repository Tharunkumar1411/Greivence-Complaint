import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'
import { Grid } from '@material-ui/core';

const OtherContainer = () => {
    const [others,setOthers] = useState(["Testing"]);

    useEffect(() => {
        axios.put("https://grievence-back.onrender.com/getComplaintData",{section:"OTHERS"}).then((res)=>{

            var array = []

            for (let index = 0; index < res.data.length; index++) {
                for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                    array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1]})                
                }
        }
        setOthers(array)
        })
    },[]);

        return(
        <Grid container spacing={2}>    
            {others.map((hos,i) => {
                return(
                    <Grid item xs={12} sm={4} md={4} key={i} >
                        <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Others"}/>
                    </Grid>
                )
            })}
        </Grid>
        )
}

export default OtherContainer;