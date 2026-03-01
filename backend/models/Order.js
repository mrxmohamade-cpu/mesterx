const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productSnapshot: {
      name: String,
      price: Number,
      image: String
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    state: { type: String, required: true, trim: true },
    notes: { type: String, default: '' },
    selectedSize: { type: String, required: true },
    selectedColor: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
