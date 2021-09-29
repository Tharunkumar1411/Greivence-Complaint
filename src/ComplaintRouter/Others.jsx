import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'

const OtherContainer = () => {
    const [others,setOthers] = useState(["Testing"]);

    useEffect(() => {
        axios.put("https://gire-backend.herokuapp.com/getComplaintData",{section:"OTHERS"}).then((res)=>{

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
            <div className="div">
                {others.map((hos,i)=> <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Others"}/>)}
            </div>
        )
}

export default OtherContainer;