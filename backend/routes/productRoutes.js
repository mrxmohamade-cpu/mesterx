const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const {
    minPrice,
    maxPrice,
    category,
    size,
    color,
    sort = 'latest',
    featured,
    active = 'true'
  } = req.query;

  const query = {};
  if (active !== 'all') query.isActive = active === 'true';
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);
  if (category) query.category = category;
  if (size) query.sizes = size;
  if (color) query.colors = color;
  if (featured) query.featured = featured === 'true';

  const sortMap = {
    latest: { createdAt: -1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 }
  };

  const products = await Product.find(query).populate('category').sort(sortMap[sort] || sortMap.latest);
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category');
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  res.json(product);
});

router.post('/', auth, async (req, res) => {
  const payload = req.body;
  const product = await Product.create({ ...payload, slug: payload.name.toLowerCase().replace(/\s+/g, '-') });
  res.status(201).json(product);
});

router.put('/:id', auth, async (req, res) => {
  const payload = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...payload, slug: payload.name.toLowerCase().replace(/\s+/g, '-') },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  res.json(product);
});

router.patch('/:id/toggle', auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  product.isActive = !product.isActive;
  await product.save();
  res.json(product);
});

router.delete('/:id', auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  res.json({ message: 'تم حذف المنتج' });
});

module.exports = router;
