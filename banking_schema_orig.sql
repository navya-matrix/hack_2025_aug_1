-- Banking System Database Schema
-- Create tables in order to respect foreign key constraints

-- 1. Create branches table first (referenced by other tables)
CREATE TABLE branches (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    manager_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Create customers table
CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(500),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    national_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    branch_id VARCHAR(50),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 3. Create employees table
CREATE TABLE employees (
    id VARCHAR(50) PRIMARY KEY,
    branch_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 4. Create accounts table
CREATE TABLE accounts (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    opened_at DATE NOT NULL,
    interest_rate DECIMAL(5,4),
    status VARCHAR(20) DEFAULT 'active',
    branch_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 5. Create transactions table
CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY,
    account_id VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(15,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    employee_id VARCHAR(50),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Add foreign key constraint for branches.manager_id after employees table is created
ALTER TABLE branches 
ADD CONSTRAINT fk_branches_manager 
FOREIGN KEY (manager_id) REFERENCES employees(id);

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_branch ON customers(branch_id);
CREATE INDEX idx_accounts_customer ON accounts(customer_id);
CREATE INDEX idx_accounts_number ON accounts(account_number);
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_employees_branch ON employees(branch_id);

-- Add check constraints for data validation
ALTER TABLE accounts 
ADD CONSTRAINT chk_account_type 
CHECK (type IN ('checking', 'savings', 'credit', 'loan'));

ALTER TABLE accounts 
ADD CONSTRAINT chk_account_status 
CHECK (status IN ('active', 'inactive', 'closed', 'suspended'));

ALTER TABLE transactions 
ADD CONSTRAINT chk_transaction_type 
CHECK (type IN ('deposit', 'withdrawal', 'transfer', 'fee', 'interest'));

ALTER TABLE transactions 
ADD CONSTRAINT chk_transaction_status 
CHECK (status IN ('pending', 'completed', 'failed', 'cancelled'));

ALTER TABLE customers 
ADD CONSTRAINT chk_gender 
CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say'));