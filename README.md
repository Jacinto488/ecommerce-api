# 🛒 E-Commerce Backend API

A fully functional RESTful backend API for an e-commerce platform built
with **Node.js, Express, and PostgreSQL**.

This project demonstrates backend architecture, database design,
authentication, cart management, checkout processing, order history, and
API documentation using Swagger.

------------------------------------------------------------------------

## Features

-   User Registration & Login
-   Product CRUD Operations
-   Shopping Cart Logic
-   Checkout Flow (Simulated Payment)
-   Order Creation & Order History
-   Swagger API Documentation
-   PostgreSQL Relational Database
-   Postman Tested Endpoints

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   pg (node-postgres)
-   Swagger (OpenAPI 3.0)
-   Nodemon

------------------------------------------------------------------------

## Project Structure

. ├── controllers/ ├── routes/ ├── config/ ├── docs/ ├── swagger.yaml
├── server.js └── package.json

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/yourusername/ecommerce-api.git cd
ecommerce-api

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root:

PORT=3000 DATABASE_URL=your_postgresql_connection_string

###  Run the Server

npm run dev

Server runs on:

http://localhost:3000

------------------------------------------------------------------------

## API Documentation

Swagger documentation available at:

http://localhost:3000/api-docs

------------------------------------------------------------------------

## Core API Endpoints

### Auth

POST /api/auth/register\
POST /api/auth/login

### Products

GET /api/products\
GET /api/products/:id\
POST /api/products\
PUT /api/products/:id\
DELETE /api/products/:id

### Cart

GET /api/carts/:userId\
POST /api/carts/:userId

### Checkout

POST /api/carts/:cartId/checkout

### Orders

GET /api/orders/user/:userId\
GET /api/orders/:orderId

------------------------------------------------------------------------

##  Business Logic Highlights

### Cart Logic

-   Creates cart if none exists
-   Prevents duplicate product entries
-   Updates quantity if item already exists

### Checkout Flow

1.  Validate cart exists
2.  Ensure cart is not empty
3.  Simulate payment processing
4.  Create order record
5.  Move cart items → order_items
6.  Empty cart

------------------------------------------------------------------------

##  Future Improvements

-   JWT Authentication Middleware
-   Stripe Payment Integration
-   Inventory Management
-   Deployment (Render / Railway)
-   Unit Testing (Jest)

------------------------------------------------------------------------

##  Author

Jacinto Vieira\
Junior Fullstack Developer

------------------------------------------------------------------------

## License

This project is for educational and portfolio purposes.
