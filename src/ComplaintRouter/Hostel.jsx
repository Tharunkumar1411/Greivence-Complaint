import React,{useEffect, useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'

const HostelContainer = () => {
    const [hostels,setHostels] = useState(["Testing"])
     
    useEffect(() => {
        axios.put("https://grievence-backend.herokuapp.com/getComplaintData",{section:"HOSTEL"}).then((res)=>{
            //https://grievence-backend.herokuapp.com
       
            var array = []

          

            for (let index = 0; index < res.data.length; index++) {
                for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                    array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1]})                
                }
        }
        setHostels(array)
    
        })
    },[])
  
        return(
            <div className="div">
                {hostels.map((hos,i)=> <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Hostels"} />)}
            </div>
        )
}

export default HostelContainer;