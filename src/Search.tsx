import  {useState, useEffect} from "react";
import axios from 'axios';
import {ToastContainer, toast } from "react-toastify";
function Search(){
    const[datas, setDatas] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);


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
        <>
        <body>
        <header>
          <div className="searchBar">
            <input 
                type="text"
                name="search"
                id="searchBar"
                placeholder="Search" 
                onChange={handleSearchTerm}               
            />
          </div>
          </header>
          <section className="section">
             {modal && (
            <div className="modal-search">
            <div onChange={handleSearchTerm} className='search'></div>
            <div className="search_results"> 
                {datas.filter((val:any) => {
                 if( searchTerm !==''){
                    console.log(val)
                    if(val.isbn.toLowerCase( ).includes(searchTerm.toLowerCase()))
                    { 
                       
                        return val.isbn.toLowerCase( ).includes(searchTerm.toLowerCase());
                    }
                    else
                    {
                    if(val.titre.toLowerCase( ).includes(searchTerm.toLowerCase()))
                    { return val.titre.toLowerCase( ).includes(searchTerm.toLowerCase());}
                    else
                    {   
                        if(val.categorie.toLowerCase( ).includes(searchTerm.toLowerCase()))
                        { return val.categorie.toLowerCase( ).includes(searchTerm.toLowerCase());}
                        else{
                            if(val.auteur.toLowerCase( ).includes(searchTerm.toLowerCase()))
                        { return val.auteur.toLowerCase( ).includes(searchTerm.toLowerCase());}
                        }
                    }
                    }
                
                    }
                
                    })
                    .map((val:any) => {
                    return <div className="search_result" key={val.isbn}>
                        {val.titre}
                        </div>
                    })}
            </div>
            <ToastContainer />
            </div> 
        )}
        </section>
        </body>
        </>
    )
}

export default Search;




