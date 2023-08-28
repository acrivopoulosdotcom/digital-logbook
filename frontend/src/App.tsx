import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewEntryLogbookPage from "./NewEntryLogbookPage/NewEntryLogbookPage.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<NewEntryLogbookPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
