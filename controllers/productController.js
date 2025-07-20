const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get All Products with Filters
exports.getProducts = async (req, res, next) => {
  try {
    const {
      name,
      category,
      minPrice,
      maxPrice,
      instock,
      minInventory,
      maxInventory,
      minDiscount,
      maxDiscount,
      createdAfter,
      createdBefore
    } = req.query;

    let query = {};

    // 🔍 Name Search
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // 📂 Category
    if (category) {
      query.category = category;
    }

    // 💰 Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // ✅ In Stock
    if (instock === 'true') query.instock = true;
    if (instock === 'false') query.instock = false;

    // 📦 Inventory Range
    if (minInventory || maxInventory) {
      query.inventory = {};
      if (minInventory) query.inventory.$gte = parseInt(minInventory);
      if (maxInventory) query.inventory.$lte = parseInt(maxInventory);
    }

    // 🎯 Discount Range
    if (minDiscount || maxDiscount) {
      query.discount = {};
      if (minDiscount) query.discount.$gte = parseFloat(minDiscount);
      if (maxDiscount) query.discount.$lte = parseFloat(maxDiscount);
    }

    // 🕓 Created Date
    if (createdAfter || createdBefore) {
      query.createdAt = {};
      if (createdAfter) query.createdAt.$gte = new Date(createdAfter);
      if (createdBefore) query.createdAt.$lte = new Date(createdBefore);
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update Product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete Product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
