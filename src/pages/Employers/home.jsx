import React,{useState,useEffect} from 'react';
import EmployerDashboard from './employers_after'; 
import Employers from './employers_before';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials=true;


const HomepageEmployer=()=>{
    const [isAuthenicated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=> {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employer/auth/status',{
                    withCredentials: true,
                });
                console.log('Auth status response:', response.data);
        setIsAuthenticated(response.data.isAuthenticated);
        console.log('Home for employers:',isAuthenicated);
            } catch(error) {
                console.error('Error in authenication statuse:',error);
                setIsAuthenticated(false);
            }
        };
        checkAuthStatus();
        const intervalId = setInterval(checkAuthStatus, 5000);

  return () => clearInterval(intervalId); 
    },[]);

    return (
        <div>
        {isAuthenicated ? (
            <div>
                <EmployerDashboard/>
            </div>
        ):(
            <div>
                <Employers/>
            </div>
        )}
        </div>);  
    };

export default HomepageEmployer
