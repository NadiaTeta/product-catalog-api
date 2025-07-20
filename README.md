# 🛍️ Product Catalog API

A RESTful API built using **Node.js**, **Express**, and **MongoDB (via Mongoose)** that enables management of products, categories, variants, and inventory for an e-commerce product catalog.

---

## 📦 Features

- Full CRUD for **products** and **categories**
- Product **variants** (e.g., size, color)
- **Inventory tracking** and **discount management**
- Category management with filtering
- Swagger/OpenAPI documentation

---

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud e.g., Atlas)

### Clone the Repository

```sh
git clone https://https://github.com/NadiaTeta/product-catalog-api.git
cd product-catalog-api
```

Install Dependencies
```sh
npm install
```

Set Up Environment Variables
Create a .env file and add your MongoDB connection string:
```sh
MONGODB_URI=mongodb://localhost:27017/product_catalog
PORT=5000
```
Start the Server
```sh
npm run dev
```

##  API Documentation
Access the Swagger UI at: 
```sh
http://localhost:5000/api-docs
```
### Categories Endpoints

Method	Endpoint	Description
GET	    /api/categories	    Retrieve all categories
POST	  /api/categories	    Create a new category
DELETE	/api/categories/:id	Delete a category by ID

Example Request: POST /api/categories
```sh
{
  "name": "Electronics"
}
```
Example Response
```sh
{
  "_id": "64b99e372be68938f9d5e1b5",
  "name": "Electronics"
}
```
### Products Endpoints
Method	Endpoint	Description

GET	    /api/products	    Get all products
POST	  /api/products	    Create new product
GET	    /api/products/:id	Get product by ID
PUT	    /api/products/:id	Update product by ID
DELETE	/api/products/:id	Delete product by ID

Example Request: POST /api/products
```sh
{
  "name": "iPhone 13",
  "price": 1099,
  "category": "Electronics",
  "instock": true,
  "discount": 10,
  "inventory": 50,
  "variants": [
    { "color": "Black", "size": "128GB" },
    { "color": "Blue", "size": "256GB" }
  ]
}
```
Example Response
```sh
{
  "_id": "64b99e372be68938f9d5e1b7",
  "name": "iPhone 13",
  "price": 1099,
  "category": "Electronics",
  "instock": true,
  "discount": 10,
  "inventory": 50,
  "variants": [
    { "color": "Black", "size": "128GB" },
    { "color": "Blue", "size": "256GB" }
  ]
}
```
### Status Codes

Code	Description
```sh
200	OK
201	Created
204	No Content (Deleted)
400	Bad Request
404	Not Found
500	Internal Server Error
```

## Assumptions & Limitations
Category names must be unique (validation not enforced in DB unless indexed).

Product category is stored as a string; no population of category references.

No authentication or authorization implemented.

Inventory management is basic and does not support transactional safety for large-scale concurrency.

## Contribution
Feel free to fork and submit pull requests for enhancements like:

Advanced filtering, sorting, pagination


📄 License
This project is open-source and licensed under the MIT License.
