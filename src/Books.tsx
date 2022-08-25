import axios from 'axios';
import { useEffect, useState } from 'react';
import { mutate } from "swr";
import book from "./books.png";
import logout from "./logout.png";
import photo from "./userlogo.png";
import {useNavigate} from "react-router-dom";
import Search from './Search';

export  function Books() {
    const[books, setBooks] = useState([])
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const[getisbn, setGetisbn] = useState([]);
    const [getedit, setGetedit] = useState([]);
    const[isElementDeleted, setIsElementDeleted] = useState(false);
    const[isElementEditing, setIsElementEditing] = useState(false);
    const[open, setOpen] = useState(false);
    const navigate = useNavigate();

    const navbook =() =>
    {
        navigate("/Livre");
    }
    
    const navlogout =() =>
    {
        navigate("/SearchLivre");
    }
    

    const getBooks = async () => {
        try{
            const data = await axios.get("http://localhost:5000/api/v1/get");
            setBooks(data.data);
        }
        catch(e){
            console.log(e)
        }
    }
    
    const getBooktitre = async (isbn:any) => {
       setModal(!modal);
          const data = axios.post("http://localhost:5000/api/v1/getLivre",{
            isbn : isbn,
          });
          data.then((Response) => 
          {
            setGetisbn(Response.data)
          }
          )
  }

  async function handleRemoveButtonOnClickEvent(id:any) {
    try {
        mutate(
          `http://localhost:5000/api/v1/deleteLivre`,
            await fetch(`http://localhost:5000/api/v1/deleteLivre`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                method: "DELETE",
                body: JSON.stringify({isbn:id}),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        throw Error("Error while delete selection!");
                    }
                    setIsElementDeleted(!isElementDeleted)
                })
        );
    } catch (e) {
       console.log(e)
    }
}


const toggleModal = (elt:any) => {
  setModal1(!modal1);

  const data = axios.post("http://localhost:5000/api/v1/getLivre",{
            isbn : elt.isbn,
          });
          data.then((Response) => 
          {
            setGetedit(Response.data)
          }
          )
  
};
const update = (elt:any) => {
  setModal1(!modal1);
  axios.post('http://localhost:5000/api/v1/Update', {
    isbn :elt.isbn,
    titre :elt.titre,
    auteur :elt.auteur,
    categorie:elt.categorie,
  }).then(() => {
     setIsElementEditing(!isElementEditing)
})

}

    useEffect(() => {
        getBooks();
    },[isElementDeleted,isElementEditing])    

    
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    if(modal1) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }



    return(
      <div className="App">
          <div className="form">
              <table className="table">
            <thead>
              <tr>
                  <th className="text">BOOK</th>
                  <th className="text">Edit</th>
                  <th className="text">Delete</th>
                  <th className="text">Show details</th>
              </tr>
              </thead>
              <tbody>                
                  {books.map((Elemnet:any ) => (
                  <tr>                   
                    <td> 
                      {Elemnet.titre}  </td>
                    <td><button onClick={()=>{
                      toggleModal(Elemnet)}}> Edit </button></td> 
                    <td><button onClick={()=>{
                      handleRemoveButtonOnClickEvent(Elemnet.isbn)}}> Delete </button></td> 
                    <td><button onClick={()=>{                      
                      getBooktitre(Elemnet.isbn)
                    }}> Details </button></td>
                    </tr>
                      
                  ))} 
                    
                  {modal && (
          <div className="modal">
            <div onClick={() =>{ getBooktitre('')}} className="overlay"></div>
            <div className="modal-content">
              <h2>Book Details</h2>
              <p>
              {
                getisbn.map((Element:any) =>(
                  <p> 
                    Title : {Element.titre}<br/>
                    Author: {Element.auteur}<br/>
                    Genre: {Element.categorie}<br/>
                    ISBN: {Element.isbn}
                  </p>
                  
              ))} 
              </p>
              <button className="close-modal" onClick={() =>{ getBooktitre('')}}>
                X
              </button>
            </div>
          </div>
        )}

        {modal1 && (
          <div className="modal">
            <div onClick={() =>{ toggleModal('')}} className="overlay"></div>
            <div >
            
              
                {
                  getedit.map((Element:any) =>(
                    <div className="form">
                      <h2>Editing</h2>
                      <br/><br/>
                      ISBN:{Element.isbn}<br/>
                      Titre:<input type="text" className="input" required defaultValue={Element.titre} onChange={(e) => Element.titre=e.target.value} /><br/>
                      Author:<input type="text" className="input" required defaultValue={Element.auteur} onChange={(e) => Element.auteur=e.target.value} /><br/>
                      Genre:<input type="text" className="input" required defaultValue={Element.categorie} onChange={(e) => Element.categorie=e.target.value} /><br/>
                      <br/><br/>
                      <button className="button" type="submit" onClick={() =>{ update(Element)}}>Update</button>
                      </div>
                      
                  
              ))} 
              <button className="close-modal" onClick={() =>{ toggleModal('')}}>
                X
              </button>
            </div>
          </div>
        )}

      
              </tbody>                   
          </table>
           </div>
           <div className='container'>
           <Search/>
            <div className='trigger' onClick={()=>{setOpen(!open)}}>
            <img src ={photo}  alt=""/> 
            </div>
            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <h3>MY ACCOUNT</h3>
                <ul>
                  <DropdownItem image={book} text={"Add book"} click={navbook}/> 
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

  










  