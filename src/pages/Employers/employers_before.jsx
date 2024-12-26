import React from 'react';
import { useNavigate } from 'react-router-dom';

const Employers= () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col items-center justify-center">
      <nav className="w-full flex justify-between items-center py-4 px-8 bg-gray-900 text-gray-100 fixed top-0 left-0">
        <div className="text-4xl font-bold">Jazee</div>
        <div className="flex gap-8">
          <a href="#" className="text-2xl">Solutions</a>
          <a href="#" className="text-2xl *:hover:underline">Insights</a>
          <a href="#" className="text-2xl hover:underline">Pricing</a>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium" onClick={()=>navigate('/Employers/Signup')}>Get Started</button>
          <button className="bg-teal-500 text-gray-900 px-4 py-2 rounded text-sm">Contact Us</button>
        </div>
      </nav>

      <main className="text-center px-6 md:px-16 lg:px-24 mt-1">
        <h1 className="text-9xl md:text-9xl font-bold leading-snug mt-12">Empower Your Hiring Process</h1>
        <p className="mt-9 text-lg md:text-3xl">
          Leverage cutting-edge tools to enhance candidate engagement and accelerate time-to-hire. Discover the Jazee difference.
        </p>
        <button className="mt-8 bg-teal-500 text-gray-900 px-6 py-3 rounded font-medium">Explore Solutions</button>
      </main>

      <div className="mt-12 flex flex-col items-center md:flex-row md:items-start md:gap-12">
        <div className="bg-gray-100 text-gray-900 rounded-lg shadow-lg p-6 max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-bold">Alex Johnson</h4>
              <p className="text-sm">Software Engineer · 2025</p>
            </div>
          </div>
          <p className="mt-4 text-sm">
            "Jazee's platform revolutionized our hiring process. We found the perfect candidates in record time!"
          </p>
        </div>

        {/* <img
          src="https://via.placeholder.com/400x300"
          alt="User Story"
          className="rounded-lg shadow-lg mt-8 md:mt-0"
        /> */}
      </div>
    </div>
  );
};

export default Employers;
