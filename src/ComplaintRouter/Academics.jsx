import React,{useEffect,useState} from 'react';
import ComplaintCard from "../HomeContainer/ComplaintCard"
import axios from 'axios'


const AcademicContainer = () => {
    
    const [academics,setAcademics] = useState(["Testing"])


    useEffect(() => {
        axios.put("http://localhost:4000/getComplaintData",{section:"ACADEMIC"}).then((res)=>{
            //https://grievence-backend.herokuapp.com
            var array = []

            for (let index = 0; index < res.data.length; index++) {
                    for (let index1 =  (res.data[index].comp.length) - 1; index1 >= 0 ; index1--) {
                        array.push({"complaint":res.data[index].comp[index1],"time":res.data[index].date[index1]})                
                    
                    }
            }


            setAcademics(array)
    
        })
    },[])

        return(
            <div className="div">
                {academics.map((hos,i)=> <ComplaintCard key={i} comp={hos.complaint} time={hos.time} brand={"Academics"}/>)}
            </div>
        )
}

export default AcademicContainer;