import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"



export  function Login() {
  const [email, setUser] = useState('');
  const [password, setPsw] = useState('') ;  
  const navigate = useNavigate();

  const login = () => {
    if(email!=='' && password!=='')
   { axios.post("http://localhost:5000/api/v1/users", {
      email: email,
      password : password,
    }).then((Response) => {
      if(Response.data.errors === true)
      {
        navigate("/Livre");
      }
      else
      {
        toast(Response.data.data)
      }

    } )}
    else{
      toast("the values shouldn't be null !!!")
    }
  };

  return (  
    <div className="App">       
        <div className="form">
        <h1 className="text">Login</h1>  
            <input type="email" className="email" minLength={8} required placeholder="Email" 
             onFocus={(e) => 
              e.target.placeholder=""}
            onBlur={(e) => 
              e.target.placeholder="Email"}
              onChange={(e) => {
                setUser(e.target.value)
              }}
            ></input>
            <br></br>
            <br></br>
            <input type="password" minLength={8} required className="psw" placeholder="Password" 
             onFocus={(e) => 
              e.target.placeholder=""}
            onBlur={(e) => 
              e.target.placeholder="Password"}
            onChange={(e) => {
              setPsw(e.target.value)
            }}
            ></input>
            <br></br>
            <br></br>
            <button className="button" onClick={login}>Login</button>
            <ToastContainer />
        </div>
    </div>
  );
}

