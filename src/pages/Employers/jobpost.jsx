// Frontend (JobPostForm.js)

import React, { useState } from 'react';
import axios from 'axios';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    companyId: '', // Get companyId from session or context
    title: '',
    description: '',
    location: '',
    salaryRange: '',
    jobType: '',
    postedDate: new Date().toISOString().slice(0, 10), // Get current date
    applicationDeadline: '',
    cgpaCriteria: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/jobs', formData);

      if (response.status === 201) {
        alert('Job posted successfully!');
        // Optionally, redirect or display success message
      } else {
        alert('Error posting job.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location:
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
            <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">
              Salary Range:
            </label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type:
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700">
              Posted Date:
            </label>
            <input
              type="date"
              id="postedDate"
              name="postedDate"
              value={formData.postedDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              readOnly // Make it read-only to prevent manual changes
            />
          </div>
          <div className="mb-4">
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
              Application Deadline:
            </label>
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cgpaCriteria" className="block text-sm font-medium text-gray-700">
            CGPA Criteria:
          </label>
          <input
            type="number"
            step="0.01"
            id="cgpaCriteria"
            name="cgpaCriteria"
            value={formData.cgpaCriteria}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;