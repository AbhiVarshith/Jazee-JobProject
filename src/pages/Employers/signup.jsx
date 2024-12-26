import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EmployerSignup() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    work_email: '',
    password: '',
    role: '',
    company_name: '',
    location: '',
    industry: '',
    website_url: '',
    contact_email: '',
    comapany_summary:'',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic here (e.g., password matching, email format)

    // Make API request to your server (replace with actual endpoint)
    try {
      const response = await axios.post('http://localhost:5000/api/employee/signup', formData);
      alert(response.data.message); // Show success message
      navigate('/Employers/Home');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign Up as an Employer</h1>
        <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500" onClick={()=>navigate('/Employers/Signin')}>
                Sign In if already a user
        </button>

      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Name (Include your first name) ;
            </label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            ></input>
            </div>  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address (use your work email):
            </label>
            <input
              type="email"
              id="work_email"
              name="work_email"
              value={formData.work_email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div> */}

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Your Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Role</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Hiring Manager">Hiring Manager</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Company Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industry:
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Company Website:
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Contact Email:
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlfor='company_summary' className='block text-sm font-medium text-gray-700'>
                Company description (in less than 100 words);
            </label>
            <input
            type="text"
            id="company_summary"
            name="company_summary"
            value={formData.company_summary}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            ></input>
            </div>  
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>

      {/* Partner logos section (you can customize this) */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Partner Universities</h2>
        <div className="flex flex-wrap justify-center">
          {/* Add your partner logo images here */}
          <img
            src="path/to/logo1.png"
            alt="Partner Logo 1"
            className="w-24 h-12 mx-4 mb-4"
          />
          <img
            src="path/to/logo2.png"
            alt="Partner Logo 2"
            className="w-24 h-12 mx-4 mb-4"
          />
          {/* Add more logos as needed */}
        </div>
      </div>
    </div>
  );
}

export default EmployerSignup;