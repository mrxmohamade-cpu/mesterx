const express = require('express');
const rateLimit = require('express-rate-limit');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

const orderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { message: 'طلبات كثيرة من نفس العنوان. حاول لاحقاً.' }
});

router.post('/', orderLimiter, async (req, res) => {
  const { productId, firstName, lastName, phone, state, notes = '', selectedSize, selectedColor } = req.body;

  if (!productId || !firstName || !lastName || !phone || !state || !selectedSize || !selectedColor) {
    return res.status(400).json({ message: 'يرجى ملء كل الحقول المطلوبة' });
  }

  const phoneRegex = /^[0-9+\-\s]{8,20}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'رقم الهاتف غير صالح' });
  }

  const product = await Product.findById(productId);
  if (!product || !product.isActive) return res.status(404).json({ message: 'المنتج غير متاح' });

  const order = await Order.create({
    product: product._id,
    productSnapshot: {
      name: product.name,
      price: product.offerPrice || product.price,
      image: product.images?.[0]
    },
    firstName,
    lastName,
    phone,
    state,
    notes,
    selectedSize,
    selectedColor
  });

  res.status(201).json({ message: 'تم إرسال طلبك بنجاح', orderId: order._id });
});

router.get('/', auth, async (req, res) => {
  const { phone, status } = req.query;
  const query = {};
  if (phone) query.phone = { $regex: phone, $options: 'i' };
  if (status) query.status = status;

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json(orders);
});

router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: 'الطلب غير موجود' });
  res.json(order);
});

router.get('/stats/summary', auth, async (_req, res) => {
  const [total, confirmed, cancelled] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ status: 'confirmed' }),
    Order.countDocuments({ status: 'cancelled' })
  ]);

  res.json({ total, confirmed, cancelled });
});

module.exports = router;
