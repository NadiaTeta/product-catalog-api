require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');
const errorHandler = require('./middleware/errorHandler');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());
app.use('/api/categories', categoryRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// API Routes
app.use('/api/products', productRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Custom Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
