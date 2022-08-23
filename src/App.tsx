import { Livre } from './Livre';
import {Login} from './Login';
import { Books } from './Books';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import "./App.css";


function App() {
 


   return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<Login/>}/>
          <Route  path="/Livre" element={<Livre/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Books" element={<Books/>}/>
        </Routes>
      </Router>
      </>
  );
}


export default App;