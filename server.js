require('dotenv').config();
const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

app.use(cors());
app.use(express.json());

// Authentic Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Product Routes
app.use('/api/products', require('./routes/productRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send("API Running");
});

// Swagger setup
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// IMPORTANT: This keeps server alive
app.listen(3000, () => {
  console.log("Server running on port 3000");
});