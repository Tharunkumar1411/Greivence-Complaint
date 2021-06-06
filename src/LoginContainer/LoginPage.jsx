import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import '@material-ui/core'
import './LoginPage.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Cookies} from 'react-cookie';

function LoginPage(){
   
    const cookie = new Cookies();
    const [details,setDetails] = useState({name:"",password:"",email:""});
    const [mailError,setMailError] = useState(true)

    

    const history = useHistory();

    useEffect(() => {

        var cookieCheck = cookie.get("jwtToken");
        if(cookieCheck){
            axios.put("https://grievence-backend.herokuapp.com/jwt",{jwt:cookie.get("jwtToken")}).then((res) => {
                //https://grievence-backend.herokuapp.com   
             
                cookie.set("mail",res.data);

                history.push("/complaint");
            })
               
        }
      
        },[cookie,history]);
 

    
    const googleAuth = () => {
        axios.get("https://grievence-backend.herokuapp.com/google").then((res)=>{
            console.log(res);
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        var pattern = new RegExp(/^[A-Za-z0-9+_.-]{2,64}@(.+)$/i);

    
        // var namePattern = new RegExp(/[aA-zZ]{7,29}"/);

        var checkPattern = pattern.test(details.email);
        setMailError(checkPattern)

    


        if(details.name.length >=3 && checkPattern){
            cookie.set("mail",details.email);

            axios.put('https://grievence-backend.herokuapp.com/signIn',details).then(res => {
                // http://localhost:4000
    
                if(res.data === 'ALLOWUSER'){
                    history.push("/complaint")
                }
                else{
                    // console.log(res)
                    cookie.set('jwtToken',res.data.token,360)
                    history.push("/complaint")
              
                }
            })
        }else{
            console.log("err")
        }
        
   
       
    }

    document.body.style.background = "linear-gradient(to right, #bbd2c5, #536976, #292e49)";

    return(
        <div className="loginBody" >
            <div className="loginHeader">
                <h2 style={{color:"rgb(40, 128, 201)",fontSize:"60px",textAlign:"center",}}>G</h2>
          
     
                <h3 style={{textAlign:"center",opacity:"2",color:"white",fontSize:"30px"}}>Grievence System</h3><br />
            </div><br /><br />
    
                <div className="login1" style={{width:'16rem',textAlign:'center'}}>
                    <Form onSubmit={submitHandler}>
                            <input minLength="12" type="email" pattern={"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"} placeholder="Email" onChange= {(e) =>{setDetails({...details,email:e.target.value})}} value={details.email}  required /><br /><br />
                        
                            <input minLength="3" type="text" autoComplete="new-password" placeholder="Username" onChange= {e =>setDetails({...details,name:e.target.value})} value={details.name} required /><br /><br />

                            <input minLength="5" type="password" autoComplete="new-password" placeholder="password"  onChange= {e =>setDetails({...details,password:e.target.value})} value={details.password} required /> <br /><br /><br />

                            <button className="buttonStyle"  type="submit" value="login" >Login</button><br /><br />
                            <button className="buttonStyle" value="Google" onClick={googleAuth}>G+</button><br /><br />

                        </Form>
                </div>
               
          
        </div>


    );
}

export default LoginPage;
