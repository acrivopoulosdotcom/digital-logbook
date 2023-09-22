import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewEntrySite from "./NewEntrySite/NewEntrySite.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogbookSite from "./LogbookSite/LogbookSite.tsx";
import SelectDaySite from "./SelectDaySite/SelectDaySite.tsx";
import LoginSite from "./LoginSite/LoginSite.tsx";
import RegisterSite from "./RegisterSite/RegisterSite.tsx";
import AddLabelSite from "./AddLabelSite/AddLabelSite.tsx";
import LabelOverviewSite from "./LabelOverviewSite/LabelOverviewSite.tsx";
import SelectLabelSite from "./SelectLabelSite/SelectLabelSite.tsx";
import SelectStatusSite from "./SelectStatusSite/SelectStatusSite.tsx";
import {useState} from "react";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes.tsx";

function App() {
    const [user, setUser]= useState("testeingabe")
    const [userId, setUserId] = useState("")


  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<LoginSite setUser={setUser}/>}/>
              <Route path="/login" element={<LoginSite setUser={setUser}/>}/>
              <Route path="/register" element={<RegisterSite />} />
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="/home" element={<LogbookSite user={user} setUserId={setUserId}/>} />
                  <Route path="/labelOverview" element={<LabelOverviewSite user={user} userId={userId}/>} />
                  <Route path="/addLabel" element={<AddLabelSite user={user} userId={userId}/>} />
                  <Route path="/selectLabel" element={<SelectLabelSite user={user} userId={userId}/>} />
                  <Route path="/newEntry" element={<NewEntrySite user={user} userId={userId}/>} />
                  <Route path="/selectStatus" element={<SelectStatusSite user={user} userId={userId}/>} />
                  <Route path="/selectDay" element={<SelectDaySite user={user} userId={userId}/>} />
              </Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
