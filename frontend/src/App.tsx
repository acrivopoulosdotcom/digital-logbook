import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewEntrySite from "./NewEntrySite/NewEntrySite.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogbookSite from "./LogbookSite/LogbookSite.tsx";
import SelectDaySite from "./SelectDaySite/SelectDaySite.tsx";
import LoginSite from "./LoginSite/LoginSite.tsx";
import RegisterSite from "./RegisterSite/RegisterSite.tsx";
import AddLabelSite from "./AddLabelSite/AddLabelSite.tsx";
import AccessDataSite from "./AccessDataSite/AccessDataSite.tsx";
import SettingsSite from "./SettingsSite/SettingsSite.tsx";
import EntriesSite from "./EntriesSite/EntriesSite.tsx";
import EditLabelSite from "./EditLabelSite/EditLabelSite.tsx";
import LabelOverviewSite from "./LabelOverviewSite/LabelOverviewSite.tsx";
import SelectLabelSite from "./SelectLabelSite/SelectLabelSite.tsx";
import SelectStatusSite from "./SelectStatusSite/SelectStatusSite.tsx";

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/login" element={<LoginSite />} />
              <Route path="/register" element={<RegisterSite />} />
              <Route path="/" element={<LogbookSite />} />
              <Route path="/logbook" element={<LogbookSite />} />
              <Route path="/accessdata" element={<AccessDataSite />} />
              <Route path="/settings" element={<SettingsSite />} />
              <Route path="/labelOverview" element={<LabelOverviewSite />} />
              <Route path="/addLabel" element={<AddLabelSite />} />
              <Route path="/editLabel" element={<EditLabelSite />} />
              <Route path="/selectLabel" element={<SelectLabelSite />} />
              <Route path="/newEntry" element={<NewEntrySite />} />
              <Route path="/entries" element={<EntriesSite />} />
              <Route path="/selectStatus" element={<SelectStatusSite />} />
              <Route path="/selectDay" element={<SelectDaySite />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
