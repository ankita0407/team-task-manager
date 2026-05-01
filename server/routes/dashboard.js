const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.get('/', protect, async (req, res) => {
  const taskQuery = req.user.role === 'Admin' ? {} : { assignedTo: req.user._id };
  const projectQuery = req.user.role === 'Admin' ? {} : { members: req.user._id };
  const [tasks, projects] = await Promise.all([Task.find(taskQuery), Project.countDocuments(projectQuery)]);
  const now = new Date();
  res.json({
    projects,
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'Todo').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    overdue: tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < now).length
  });
});
module.exports = router;
