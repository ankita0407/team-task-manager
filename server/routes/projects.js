const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const Task = require('../models/Task');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  const query = req.user.role === 'Admin' ? {} : { members: req.user._id };
  const projects = await Project.find(query).populate('createdBy', 'name email').populate('members', 'name email role').sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/', protect, adminOnly, [body('name').trim().notEmpty(), body('members').isArray({ min: 1 })], async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const members = [...new Set([...req.body.members, String(req.user._id)])];
  const project = await Project.create({ name: req.body.name, description: req.body.description || '', members, createdBy: req.user._id });
  res.status(201).json(await project.populate('members', 'name email role'));
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('members', 'name email role');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await Task.deleteMany({ project: req.params.id });
  res.json({ message: 'Project and related tasks deleted' });
});
module.exports = router;
