const mongoose = require('mongoose');


// Define the variant schema for product variations
const variantSchema = new mongoose.Schema({
  color: String,
  size: String
}, { _id: false }); // prevents automatic _id for each variant

// Define the main product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
  },
  instock: {
    type: Boolean,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  inventory: {
    type: Number,
    default: 0
  },
  
  variants: [variantSchema]
}, { timestamps: true });



module.exports = mongoose.model('Product', productSchema);
