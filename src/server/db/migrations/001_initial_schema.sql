-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100) UNIQUE,
  category VARCHAR(100),
  unit VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER NOT NULL,
  safety_stock INTEGER NOT NULL,
  ordering_cost DECIMAL(10,2),
  holding_cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  buyer_address VARCHAR(42) NOT NULL,
  seller_address VARCHAR(42) NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  status VARCHAR(50) NOT NULL,
  transaction_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory History table
CREATE TABLE inventory_history (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Predictions table
CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  predicted_demand INTEGER NOT NULL,
  confidence DECIMAL(5,2) NOT NULL,
  seasonality_factor DECIMAL(5,2),
  trend VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);