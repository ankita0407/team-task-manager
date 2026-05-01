Team Task Manager - Full Stack Web Application
A complete MERN stack Team Task Manager where users can create projects, assign tasks, track task status, and view dashboard analytics with Admin/Member role-based access.

Live Links
🔗 Live Website: https://team-task-manager-production-5630.up.railway.app
🔗 Backend API Health Check: https://team-task-manager-production-be95.up.railway.app/api/health

Features
Features
Signup and login authentication using JWT
Admin and Member roles
Admin can create/delete projects
Admin can add team members to projects
Admin can create/delete tasks and assign them to users
Members can view only their assigned tasks
Members can update task status
Dashboard with total tasks, completed tasks, pending tasks, in-progress tasks, overdue tasks, and project count
REST APIs with validation and MongoDB relationships
Railway-ready deployment setup
Tech Stack
Frontend: React, Vite, Axios, React Router
Backend: Node.js, Express.js
Database: MongoDB Atlas
Authentication: JWT + bcrypt
Deployment: Railway

Folder Structure
team-task-manager/
├── client/              # React frontend
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # REST APIs
│   └── middleware/      # Auth middleware
├── package.json
├── railway.json
├── .env.example
└── README.md
How to Run Locally
1. Install dependencies
npm install
2. Create environment file
Create a .env file in the root folder and add:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
3. Start the project
npm run dev
Frontend will run on Vite and backend will run on port 5000.

How to Deploy on Railway
1. Push project to GitHub
git init
git add .
git commit -m "Initial Team Task Manager app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
2. Deploy on Railway
Open Railway
Click New Project
Select Deploy from GitHub repo
Choose this repository
Add environment variables:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
Railway will build and deploy automatically.
Important Notes
First create an Admin account from the signup page.
Admin can create projects and tasks.
Member users can only see their assigned tasks and update their status.
For MongoDB Atlas, allow network access from 0.0.0.0/0 so Railway can connect.
API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
GET /api/auth/users
Projects
GET /api/projects
POST /api/projects Admin only
PUT /api/projects/:id Admin only
DELETE /api/projects/:id Admin only
Tasks
GET /api/tasks
POST /api/tasks Admin only
PATCH /api/tasks/:id/status
PUT /api/tasks/:id Admin only
DELETE /api/tasks/:id Admin only
Dashboard
GET /api/dashboard
Demo Video Points
In your 2-5 minute demo video, show:

Signup as Admin
Signup as Member
Admin login
Create project and add team members
Create task and assign it
Member login and update task status
Dashboard progress and overdue count
Live Railway URL and GitHub repo Deployment update update
