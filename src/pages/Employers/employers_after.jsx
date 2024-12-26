import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Top Navigation Bar */}
      <nav className="w-full flex justify-between items-center py-4 px-8 bg-gray-900 text-gray-100 fixed top-0 left-0"> 
        
          <h1 className="text-xl font-bold">Jazze Employer</h1>
          <ul className="flex space-x-4">
            <li className="hover:underline" onClick={()=>navigate('/Employers/Dashboard')}>Dashboard</li>
            <li className="hover:text-gray-200" >Jobs Posted</li>
            <li className="hover:text-gray-200">Applications Received</li>
            {/* Add more items as needed */}
          </ul>
       
      </nav>

      <div className="container mx-auto py-16 flex-grow">
        {/* Hero Section */}
        <div className="bg-teal-500 p-10 rounded-lg shadow-md text-center flex-grow w-full"> 
          <h2 className="text-3xl font-bold mb-4  text-gray-900 " onClick={()=>navigate('/Employers/Jobform')}>Post a Job</h2>
          <p className="text-lg mb-6  text-gray-900">Reach top talent at leading universities.</p>
          <button className="bg-teal-400 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/Employers/Jobform')}>
            Post a Job Now
          </button>
        </div>

        {/* Premium Plans Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-4">Upgrade to Premium</h3>
          <p className="text-white mb-6">Unlock exclusive features and reach a wider pool of talent.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Premium Plan Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl text-black font-semibold mb-2">Basic</h4>
              <p className="text-gray-600">
                - Basic job posting features<br />
                - Limited access to candidate data<br />
                - Basic reporting
              </p>
              <p className="text-xl text-black font-bold mt-4">$49/month</p>
            </div>

            {/* Premium Plan Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl text-black font-semibold mb-2">Standard</h4>
              <p className="text-gray-600">
                - Enhanced job posting features<br />
                - Expanded candidate data access<br />
                - Advanced reporting
              </p>
              <p className="text-xl text-black font-bold mt-4">$99/month</p>
            </div>

            {/* Premium Plan Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl text-black font-semibold mb-2">Enterprise</h4>
              <p className="text-gray-600">
                - All premium features<br />
                - Dedicated account manager<br />
                - Custom branding options
              </p>
              <p className="text-xl text-black font-bold mt-4">Contact Us for Pricing</p>
            </div>
          </div>
        </div>

        {/* Discover Universities Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-4">Discover Universities</h3>
          <p className="text-white mb-6">
            Explore top talent pools at leading universities across the country.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* University Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <img src="university1-logo.png" alt="University 1" className="w-16 h-16 mr-4" />
              <div>
                <h4 className="text-xl text-black font-semibold">University 1</h4>
                <p className="text-gray-600">Explore top talent</p>
              </div>
            </div>

            {/* University Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <img src="university2-logo.png" alt="University 2" className="w-16 h-16 mr-4" />
              <div>
                <h4 className="text-xl text-black font-semibold">University 2</h4>
                <p className="text-gray-600">Explore top talent</p>
              </div>
            </div>

            {/* University Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <img src="university3-logo.png" alt="University 3" className="w-16 h-16 mr-4" />
              <div>
                <h4 className="text-xl text-black font-semibold">University 3</h4>
                <p className="text-gray-600">Explore top talent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;