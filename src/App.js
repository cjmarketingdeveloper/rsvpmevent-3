import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StartScreen from "./pages/StartScreen";
import ClinicScreen from "./pages/ClinicScreen";
import Franchisee from "./pages/Franchisee";
import VIPScreen from "./pages/VIPScreen";
import Potential from "./pages/Potential";
import Exhibitor from "./pages/Exhibitor";
import TradeShow  from "./pages/TradeShow";

function App() {
  return (
    <>
      <Router>
        <div className="main-outer-container">
          <Routes>
            <Route path="/" element={<StartScreen />}/>  
            <Route path="/franchisee" element={<Franchisee />}/> 
            <Route path="/clinic" element={<ClinicScreen />}/> 
            <Route path="/vip" element={<VIPScreen />}/> 
            <Route path="/potential" element={<Potential />}/> 
            <Route path="/exhibitor" element={<Exhibitor />}/> 
            <Route path="/tradeshow" element={<TradeShow />}/> 
          </Routes>
        </div>
      </Router>
     <ToastContainer />
    </>
  );
}

export default App;
