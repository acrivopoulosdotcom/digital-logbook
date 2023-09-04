import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewEntrySite from "./NewEntrySite/NewEntrySite.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogbookSite from "./LogbookSite/LogbookSite.tsx";
import CustomerSearchSite from "./CustomerSearchSite/CustomerSearchSite.tsx";
import CustomerFileSite from "./CustomerFileSite/CustomerFileSite.tsx";
import ChooseCarSite from "./ChooseCarSite/ChooseCarSite.tsx";
import LoginSite from "./LoginSite/LoginSite.tsx";
import RegisterSite from "./RegisterSite/RegisterSite.tsx";
import StatisticsSite from "./StatisticsSite/StatisticsSite.tsx";
import AddCarSite from "./AddCarSite/AddCarSite.tsx";
import AccessDataSite from "./AccessDataSite/AccessDataSite.tsx";
import SettingsSite from "./SettingsSite/SettingsSite.tsx";
import EntriesSite from "./EntriesSite/EntriesSite.tsx";
import SelectStatisticsSite from "./SelectStatisticSite/SelectStatisticSite.tsx";
import StatisticIndividualSite from "./StatisticIndividualSite/StatisticIndividualSite.tsx";

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/login" element={<LoginSite />} />
              <Route path="/register" element={<RegisterSite />} />
              <Route path="/" element={<ChooseCarSite />} />
              <Route path="/logbook" element={<LogbookSite />} />
              <Route path="/accessdata" element={<AccessDataSite />} />
              <Route path="/settings" element={<SettingsSite />} />
              <Route path="/choosecar" element={<ChooseCarSite />} />
              <Route path="/addcar" element={<AddCarSite />} />
              <Route path="/statistics" element={<StatisticsSite />} />
              <Route path="/selectstatistic" element={<SelectStatisticsSite />} />
              <Route path="/statisticindividual" element={<StatisticIndividualSite />} />
              <Route path="/newentry" element={<NewEntrySite />} />
              <Route path="/entries" element={<EntriesSite />} />
              <Route path="/customersearch" element={<CustomerSearchSite />} />
              <Route path="/customerfile" element={<CustomerFileSite />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
