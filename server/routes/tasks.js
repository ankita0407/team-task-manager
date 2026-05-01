const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  const query = req.user.role === 'Admin' ? {} : { assignedTo: req.user._id };
  if (req.query.project) query.project = req.query.project;
  const tasks = await Task.find(query).populate('project', 'name').populate('assignedTo', 'name email').populate('createdBy', 'name').sort({ dueDate: 1 });
  res.json(tasks);
});

router.post('/', protect, adminOnly, [
  body('title').trim().notEmpty(), body('project').notEmpty(), body('assignedTo').notEmpty(), body('dueDate').isISO8601()
], async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const project = await Project.findById(req.body.project);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!project.members.map(String).includes(String(req.body.assignedTo))) return res.status(400).json({ message: 'Assigned user must be a project member' });
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(await task.populate(['project', 'assignedTo', 'createdBy']));
});

router.patch('/:id/status', protect, async (req, res) => {
  if (!['Todo', 'In Progress', 'Completed'].includes(req.body.status)) return res.status(400).json({ message: 'Invalid status' });
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'Admin' && String(task.assignedTo) !== String(req.user._id)) return res.status(403).json({ message: 'You can update only your assigned tasks' });
  task.status = req.body.status; await task.save();
  res.json(await task.populate(['project', 'assignedTo', 'createdBy']));
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['project', 'assignedTo', 'createdBy']);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});
router.delete('/:id', protect, adminOnly, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});
module.exports = router;
