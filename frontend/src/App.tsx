import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewEntryLogbookSite from "./NewEntryLogbookSite/NewEntryLogbookSite.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogbookSite from "./LogbookSite/LogbookSite.tsx";
import CustomerSearchSite from "./CustomerSearchSite/CustomerSearchSite.tsx";
import CustomerFileSite from "./CustomerFileSite/CustomerFileSite.tsx";
import ChooseCarSite from "./ChooseCarSite/ChooseCarSite.tsx";
import LoginSite from "./LoginSite/LoginSite.tsx";
import RegisterSite from "./RegisterSite/RegisterSite.tsx";

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/login" element={<LoginSite />} />
              <Route path="/register" element={<RegisterSite />} />
              <Route path="/" element={<ChooseCarSite />} />
              <Route path="/logbook" element={<LogbookSite />} />
              <Route path="/newentry" element={<NewEntryLogbookSite />} />
              <Route path="/customersearch" element={<CustomerSearchSite />} />
              <Route path="/customerfile" element={<CustomerFileSite />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
