import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'

const RaggingContainer = () => {
    const [raggings,setRagging] = useState(["Testing"])


    useEffect(() => {
        axios.put("https://grievence-backend.herokuapp.com/getComplaintData",{section:"RAGGING"}).then((res)=>{

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
            <div className="div">
                {raggings.map((hos,i)=> <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Ragging"}/>)}
            </div>
        )
}

export default RaggingContainer;