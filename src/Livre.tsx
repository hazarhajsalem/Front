import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import book from "./books.png";
import logout from "./logout.png";
import photo from "./userlogo.png";
import {useNavigate} from "react-router-dom"

export  function Livre() {

const baseURL ="http://localhost:5000/api/v1/add";
const [isbn, setIsbn] = useState('');
const [titre, setTitre] = useState('') ;
const [auteur, setAuteur] = useState('');
const [categorie, setCategorie] = useState('') ;
const[open, setOpen] = useState(false);
const navigate = useNavigate();

const navbook =() =>
{
    navigate("/Books");
}

const navlogout =() =>
{
    navigate("/Login");
}


useEffect(() => {
  axios.get(`${baseURL}/1`).then((response) => {
    setIsbn(response.data);
  });
}, []);

const add = () => {
  if(isbn.length > 7 && titre!=='' && auteur!=='' && categorie!=='' )
  {
      axios.post(baseURL, {
        isbn : isbn,
        titre : titre,
        auteur : auteur,
        categorie: categorie,
      }).then((response) => {
        if (response.data.data){
              if(response.data.data ==='ISBN exist !!')
            {    toast('ISBN exist !!')
                  
            }        
              else 
            { 
                    toast('Add successfully ^_^')
            }
            }
      } )
  }
  else
  {
    if(isbn.length < 8)
    toast(" Length of ISBN should be > 7")
    else
    {
        toast("the values shouldn't be null")
    }
  }
};
  return (  
    <div className="App">
        <div className="form">
            <h1 className="text">Create Book</h1> 
            <input type="text" className="input" placeholder="Title" required 
             onFocus={(e) =>
               e.target.placeholder=""} 
             onBlur={(e) =>
               e.target.placeholder="Title"}  
             onChange={(e) => {
               setTitre(e.target.value)
            }}
            />
            <br></br>
            <br></br>
            <input type="text" className="input" placeholder="Author" required 
              onFocus={(e) => 
                e.target.placeholder=""} 
              onBlur={(e) => 
                e.target.placeholder="Author"} 
              onChange={(e) => {
                setAuteur(e.target.value)
              }}
            />
            <br></br>
            <br></br>
            <input type="text" className="input" placeholder="Genre" required 
              onFocus={(e) => 
                e.target.placeholder=""}
              onBlur={(e) => 
                e.target.placeholder="Genre"}
              onChange={(e) => {
                setCategorie(e.target.value)
            }}
            />
            <br></br>
            <br></br>
            <input type="text" className="input" placeholder="ISBN" required 
              onFocus={(e) => 
                e.target.placeholder=""} 
              onBlur={(e) =>
                 e.target.placeholder="ISBN"} 
              onChange={(e) => {
                setIsbn(e.target.value)
              }}
            />
            <br></br>
            <br></br>
            <button className="button" onClick={add}>Add book</button>
            <ToastContainer />
        </div>

        <div className='container'>
          <div className='trigger' onClick={()=>{setOpen(!open)}}>
          <img src ={photo}  alt=""/> 
          </div>
          <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
              <h3>MY ACCOUNT</h3>
              <ul>
                <DropdownItem image={book} text={"Books"} click={navbook}/> 
                <DropdownItem image={logout} text={"Logout"} click={navlogout}/>
              </ul>
          </div>
        </div>
      </div>
  );
}

function DropdownItem(props : any)
{
  return( 
    <li className="dropdownItem">
      <img src={props.image} alt="" width="20px"></img> &nbsp;&nbsp;
      <text onClick={props.click}> {props.text} </text>     
    </li>
  );
}



