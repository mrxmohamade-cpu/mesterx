const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'اسم القسم مطلوب' });
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const category = await Category.create({ name, slug });
  res.status(201).json(category);
});

router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, slug: name.toLowerCase().replace(/\s+/g, '-') },
    { new: true }
  );
  if (!category) return res.status(404).json({ message: 'القسم غير موجود' });
  res.json(category);
});

router.delete('/:id', auth, async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: 'القسم غير موجود' });
  res.json({ message: 'تم الحذف بنجاح' });
});

module.exports = router;
