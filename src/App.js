import {Home} from "./pages/home";
import Students from "./pages/Students/students"
import Employers from "./pages/Employers/employers_before";
import { Universities } from "./pages/universities";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignupPage from "./pages/Students/signup";
import SigninPage from "./pages/Students/signin";
import ProfilePage from "./pages/Students/profile";
import EmployerSignup from "./pages/Employers/signup";
import EmployerSignin from "./pages/Employers/signin";
import EmployerDashboard from "./pages/Employers/employers_after";
import Dashboard from "./pages/Employers/dashboard";
import JobPostForm from "./pages/Employers/jobpost";
import HomepageEmployer from "./pages/Employers/home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Students" element ={<Students />} />
          <Route path="/Employers" element = {<Employers/>} />
          <Route path="/Universities" element = {<Universities />} />
          <Route path="/Students/Signup" element={<SignupPage />} />
          <Route path="/Students/Signin" element={<SigninPage />} />
          <Route path="/Students/Profile" element={<ProfilePage/>} />
          <Route path="/Employers/Signup" element={<EmployerSignup/>}/>
          <Route path="/Employers/Signin" element={<EmployerSignin/>}/>
          <Route path="/Employers/after" element={<EmployerDashboard/>}/>
          <Route path="/Employers/Dashboard" element={<Dashboard/>}/>
          <Route path="/Employers/Jobform" element={<JobPostForm/>}/>
          <Route path="/Employers/Home" element = {<HomepageEmployer/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
