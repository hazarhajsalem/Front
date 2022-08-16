import { Livre } from './Livre';
import {Login} from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<Login/>}/>
          <Route  path="/Livre" element={<Livre/>}/>
        </Routes>
      </Router>
      </>
    
  );
}

export default App;
 

