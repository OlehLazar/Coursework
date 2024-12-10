import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/shared/DefaultLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AboutUsPage from "./pages/AboutUsPage";
import PatientsPage from "./pages/PatientsPage";
import MeetingsPage from "./pages/MeetingsPage";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<RegistrationPage />}/>
          <Route path="/aboutUs" element={<AboutUsPage />}/>
          <Route path="/patients" element={<PatientsPage />}/>
          <Route path="/meetings" element={<MeetingsPage />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App