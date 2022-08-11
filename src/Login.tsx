import React, { useState } from 'react';
import axios from 'axios';



export  function Login() {
  const [email, setUser] = useState('');
  const [psw, setPsw] = useState('') ;

  const register = () => {
    axios.post("http://localhost:5000/api/v1/addUser", {
      email: email,
      password : psw,
    }).then((Response) => {
      console.log(Response);
    } )
  };

  return (  
    <div className="App">
        <h1 className="text">Login</h1>    
        <form className="form">
         <label className='label'>Email</label>
            <input type="email" className="email" minLength={8} required 
              onChange={(e) => {
                setUser(e.target.value)
              }}
            ></input>
            <br></br>
            <br></br>
            <label className='label'>Password</label>  
            <input type="password" minLength={8} required className="psw"
            onChange={(e) => {
              setPsw(e.target.value)
            }}
            ></input>
            <br></br>
            <br></br>
            <button className="button" onClick={register}>Login</button>
        </form>
    </div>
  );
}

