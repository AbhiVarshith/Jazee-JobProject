import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/employer/dashboard');
        setCompanyData(response.data.dashboardData[0]); // Assuming one company per employer
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold">Error: {error}</div>;
  }

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Company Information</h2>
        <ul className="list-disc space-y-2">
          <li>Company Name: {companyData.company_name}</li>
          <li>Industry: {companyData.industry}</li>
          <li>Website: {companyData.website_url}</li>
          <li>Company Summary: {companyData.company_summary}</li>
          <li>Contact Email: {companyData.contact_email}</li>
        </ul>
      </div>

      {/* Add additional sections for employee details or other functionalities as needed */}
    </div>
  );
};

export default Dashboard;