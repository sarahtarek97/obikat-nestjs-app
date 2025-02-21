# NestJS Obikat Task

This is a NestJS application that connects to a PostgreSQL database and implements authentication, user management, customer creation, and order management.

## Features

- **User Authentication** (Login with JWT)
- **User Registration** (Register new user)
- **Create Customers** (Store customer data)
- **Create Orders** (Assign orders to customers)
- **Customer Dashboard** (Retrieve the most ordering customer within a given date range)
- **Products Data** (Retrieve All Products)
- **New Products** (Add new Products)
- **Top Ordered Products** (Retrieve the most ordered products, sorted from highest to lowest)
- **JWT Protection** (All APIs except login are secured)

## Installation

### 1. Clone the Repository

```sh
git clone (https://github.com/sarahtarek97/obikat-nestjs-app)
cd obikat-nestjs-app
```

### 2. Install Dependencies

```sh
npm install --legacy-peer-deps
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory

### 5. Start the Server

```sh
npm run start:dev
```

## API Endpoints

### **Authentication**

- `POST /auth/login` → Accepts `{ username, password }` and returns JWT token valid for an hour

### **Users**

- `POST /users/register` → Accepts `{ username, password }` and Creates a new user

### **Customers**

- `POST /customers/create` → Accepts `{ name }` Creates a new customer

### **Products**

- `POST /products/create` → Accepts `{ name }` Creates a new product
- `GET /products` get all products

### **Orders**

- `POST /orders/create` → Accepts {
  "customerId": 6,
  "products": [
  {
  "productId": 1,
  "quantity": 2
  }
  ]
  } Places an order for a customer

### **Dashboard & Reports**

- `GET /customers/topOrder?startDate=2025-02-20&endDate=2025-02-20` → Give a date range and will returns the most ordering customer in a date range

- `GET /orders/topProduct` → Returns the most ordered products sorted from highest to lowest.

## Technologies Used

- **NestJS** (TypeScript framework)
- **PostgreSQL** (Database)
- **TypeORM** (ORM for database operations)
- **JWT Authentication** (Secures APIs)
