const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

const {
  createProduct, getProduct, getProducts, updateProduct, deleteProduct
} = require('../controllers/productController');

// GET all products with optional query parameters
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, name, minDiscount, maxDiscount, minInventory, maxInventory, instock, createAfter, createBefore } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (minDiscount || maxDiscount) {
      filter.discount = {};
      if (minDiscount) filter.discount.$gte = Number(minDiscount);
      if (maxDiscount) filter.discount.$lte = Number(maxDiscount);
    }

    if (minInventory || maxInventory) {
      filter.inventory = {};
      if (minInventory) filter.inventory.$gte = Number(minInventory);
      if (maxInventory) filter.inventory.$lte = Number(maxInventory);
    }

    if (instock !== undefined) {
      filter.instock = instock === 'true'; // Convert string to boolean
    }

    if (createAfter || createBefore) {
      filter.createdAt = {};
      if (createAfter) filter.createdAt.$gte = new Date(createAfter);
      if (createBefore) filter.createdAt.$lte = new Date(createBefore);
    }

    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
//router.post('/', createProduct);

router.post('/', async (req, res) => {
  try {
    // Find the category by name
    const category = await Category.findOne({ name: req.body.category });

    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    //Create product with category _id
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: category._id, // use the category's ObjectId
      instock: req.body.instock,
      discount: req.body.discount,
      inventory: req.body.inventory,
      variants: req.body.variants || []
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes with product ID
router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
