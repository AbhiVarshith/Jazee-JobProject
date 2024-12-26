const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
  {
    origin:'http://localhost:3000',
    credentials:true
  }
));

app.use(
  session({
    secret: 'ec70dcedc7658182eab591f81111a49efb8c6737b4e7e7df61b5ac835ab920ec',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'lax',
    },
  })
);


const db = mysql.createConnection({
    host: process.env.DB_HOST,     // Add credentials to .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.message);
      return;
    }
    console.log('Connected to MySQL database');
  });

  app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query failed' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Signup API
app.post('/api/students/signup', async (req, res) => {
  const {
    name,
    email,
    password,
    university_id,
    degree_program,
    graduation_year,
    profile_summary,
    cgpa,
    referral,
    endorsements,
    achievements,
  } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = `INSERT INTO Students (
      name, email, password_hash, university_id, degree_program, graduation_year, 
      profile_summary, cgpa, referral, endorsements, achievements
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        name,
        email,
        hashedPassword,
        university_id,
        degree_program,
        graduation_year,
        profile_summary,
        cgpa,
        referral,
        endorsements,
        achievements,
      ],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signin API
app.post('/api/students/signin', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM Students WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create session
    req.session.userId = user.student_id;
    req.session.save();
    console.log('Session created:', req.session);
    res.status(200).json({ message: 'Login successful', user: { id: user.student_id, name: user.name } });
  });
});

// Logout API
app.post('/api/students/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/api/students/profile', async (req, res) => {
  try {
    const query = `
     SELECT 
    Students.name AS student_name, 
    Students.email, 
    Students.university_id, 
    Students.degree_program, 
    Students.graduation_year, 
    Students.profile_summary, 
    Students.cgpa, 
    Students.referral, 
    Students.endorsements, 
    Students.achievements, 
    Universities.name AS university_name
FROM 
    Students
LEFT JOIN 
    Universities ON Students.university_id = Universities.university_id
WHERE 
    Students.student_id = ?`;


    // Use the existing `db` connection
    db.query(query, [req.session.userId], (err, results) => {
      if (err) {
        console.error('Error fetching profile:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(results[0]);
    });
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    res.status(500).json({ error: 'Unexpected Internal Server Error' });
  }
});


app.get('/api/students/auth/status', (req, res) => {
  console.log('Session on status check:', req.session);
  if (req.session.userId) {
    res.status(200).json({ isAuthenticated: true, user: { id: req.session.userId } });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});


//Employers api's

app.post('/api/employee/signup', async (req, res) => {
  const {
      name,
      work_email,
      password,
      role,
      company_name,
      location,
      industry,
      website_url,
      contact_email,
      company_summary,
  } = req.body;

  const hashed_password = await bcrypt.hash(password, 10);



  const findCompanyQuery = 'SELECT company_id FROM Companies WHERE name = ?';
  const insertCompanyQuery = 'INSERT INTO Companies (name, location,industry, website_url, company_summary, contact_email) VALUES (?,?, ?, ?, ?, ?)';
  const insertEmployeeQuery = 'INSERT INTO Employee (name, hashed_password, company_id, role, work_email) VALUES (?, ?, ?, ?, ?)';

  // Check if the company exists
  db.query(findCompanyQuery, [company_name], (err, companyResults) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
      }

      let company_id;
      if (companyResults.length > 0) {
          // Company exists, get its ID
          company_id = companyResults[0].company_id;
          addEmployee(company_id);
      } else {
          // Insert new company and get its ID
          db.query(insertCompanyQuery, [company_name, location, industry, website_url, company_summary, contact_email], (err, insertResults) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'Internal server error' });
              }
              company_id = insertResults.insertId;
              addEmployee(company_id);
          });
      }

      function addEmployee(company_id) {
          db.query(insertEmployeeQuery, [name, hashed_password, company_id, role, work_email], (err, employeeResults) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'Internal server error' });
              }

              // Create session
              req.session.userId = employeeResults.insertId;
              req.session.save();
              console.log('Session created:', req.session);
              res.status(201).json({ message: 'Employee added successfully', employeeId: employeeResults.insertId });
          });
      }
  });
});

app.post('/api/employer/signin', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM Employee WHERE work_email = ?';
  db.query(query, [email], async (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const employer = results[0];

      // Compare password
      const passwordMatch = await bcrypt.compare(password, employer.hashed_password);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create session
      req.session.employerId = employer.company_id;
      req.session.save();
      console.log('Session created:', req.session);
      res.status(200).json({ message: 'Login successful', employer: { id: employer.company_id, name: employer.name } });
  });
});

app.get('/api/employer/dashboard', (req, res) => {
  // if (!req.session || !req.session.employerId) {
  //     return res.status(401).json({ message: 'Unauthorized access' });
  // }

  const employerId = req.session.employerId;

  const query = `
      SELECT 
          e.name AS employee_name, 
          e.role, 
          c.name AS company_name, 
          c.industry, 
          c.website_url, 
          c.company_summary, 
          c.contact_email
      FROM Employee e
      JOIN Companies c ON e.company_id = c.company_id
      WHERE c.company_id = ?
  `;

  db.query(query, [employerId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({ dashboardData: results });
  });
});

app.post('/api/jobs', (req, res) => {
  const { companyId, title, description, location, salaryRange, jobType, postedDate, applicationDeadline, cgpaCriteria } = req.body;

  // Check if employer is signed in (replace with your session check logic)
  if (!req.session || !req.session.employerId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const query = `
    INSERT INTO Jobs (companyId, title, description, location, salaryRange, jobType, postedDate, applicationDeadline, cgpaCriteria)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [companyId, title, description, location, salaryRange, jobType, postedDate, applicationDeadline, cgpaCriteria], (err, result) => {
    if (err) {
      console.error('Error posting job:', err);
      return res.status(500).json({ message: 'Error posting job.' });
    }

    res.status(201).json({ message: 'Job posted successfully!', jobId: result.insertId });
  });
});

app.get('/api/employer/auth/status', (req, res) => {
  console.log('Session on status check:', req.session);
  if (req.session.userId) {
    res.status(200).json({ isAuthenticated: true, user: { id: req.session.userId } });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });