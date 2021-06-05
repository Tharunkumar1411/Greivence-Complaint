import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'

const TransportContainer = () => {

    const [transports,setTransport] = useState(["Testing"])


    useEffect(() => {
    axios.put("https://grievence-backend.herokuapp.com/getComplaintData",{section:"TRANSPORT"}).then((res)=>{
        //https://grievence-backend.herokuapp.com
        const array = []
        for (let index = 0; index < res.data.length; index++) {
            for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1]})                
            }
    }
    setTransport(array)
    })
},[]);

        return(
            <div className="div">
                {transports.map((hos,i)=> <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Transport"}/>)}
            </div>
        )
}

export default TransportContainer;