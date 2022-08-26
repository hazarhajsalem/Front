import  {useState, useEffect} from "react";
import axios from 'axios';
import photo from "./userlogo.png";
import {useNavigate} from "react-router-dom";


export function SearchLivre(){
    const[datas, setDatas] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();


    const navlogin =() =>
    {
        navigate("/Login");
    }
    

    useEffect(  () =>  {
        try{
            axios.get("http://localhost:5000/api/v1/get")
            .then((Response) => Response.data)
            .then((data)=>setDatas(data) );
        }
        catch(e){
            console.log(e)
        }
        })

    const handleSearchTerm = (e:any) => {
        setModal(!modal);
        let value = e.target.value;
        value.length>2 && setSearchTerm(value);
    }

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    return(
    
        <body>
            <header>
            <div className='container'>
            <div className='trigger' >             
             <img src ={photo} onClick={navlogin} alt=""/>  
             <p className="textsearch"  onClick={navlogin} >Login admin</p>
              </div>
              </div>
          </header>
          <section>
          <div className="searchLivre">
            <input 
                type="text"
                name="search"
                id="searchBar"
                placeholder="Search" 
                onChange={handleSearchTerm}               
                />
          </div>
          {modal &&
            <div >
            <div onChange={handleSearchTerm} ></div>
            <div className="result-livre"> 
                {datas.filter((val:any) => {
                    console.log("type of",typeof(searchTerm))
                 if( searchTerm !==''){
                    
                    return val.titre.toLowerCase( ).includes(searchTerm.toLowerCase());}

                    })
                    .map((val:any) => {
                    return <div className="result-return" key={val.isbn}>
                        {val.titre}
                        </div>
                    })}
            </div>
            </div> 
}
            </section>
            </body>
        
    )
}