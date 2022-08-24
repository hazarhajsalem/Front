import  {useState, useEffect} from "react";
import axios from 'axios';
function Search(){
    const[datas, setDatas] = useState([]);
    const[searchTerm, setSearchTerm] = useState([]);
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
          <div className="searchBar">
            <input 
                type="text"
                name="search"
                id="searchBar"
                placeholder="Search" 
                onChange={handleSearchTerm}               
            />
          </div>

        {modal && (
            <div className="modal-search">
            <div onChange={handleSearchTerm} className="search"></div>
            <div className="search_results"> 
                {datas.filter((val:any) => {
                    console.log("type of",typeof(searchTerm))
                return val.titre.toLowerCase( ).includes(searchTerm);
                    })
                    .map((val:any) => {
                    return <div className="search_result" key={val.isbn}>
                        {val.titre}
                        </div>
                    })}
            </div>
            </div> 
        )}


        </>
    )
}

export default Search;




