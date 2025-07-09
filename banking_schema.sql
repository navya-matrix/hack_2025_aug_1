-- Create branches table
CREATE TABLE branches (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    manager_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create accounts table with a foreign key constraint
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    branch_id INTEGER NOT NULL,
    account_type TEXT NOT NULL,
    balance REAL NOT NULL,
    FOREIGN KEY(branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

-- Create customers table
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);