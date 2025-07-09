import React, { useState } from 'react';
import { Download, Database, FileSpreadsheet, Users, Building, CreditCard, ArrowRightLeft } from 'lucide-react';

const BankingDataGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [progress, setProgress] = useState(0);

  // Helper functions for data generation
  const generateId = (prefix, index) => `${prefix}${String(index).padStart(6, '0')}`;
  
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const formatTimestamp = (date) => date.toISOString().replace('T', ' ').slice(0, 19);
  
  const randomAmount = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

  // Sample data arrays
  const cities = [
    { name: 'New York', state: 'NY', zip: '10001' },
    { name: 'Los Angeles', state: 'CA', zip: '90210' },
    { name: 'Chicago', state: 'IL', zip: '60601' },
    { name: 'Houston', state: 'TX', zip: '77001' },
    { name: 'Phoenix', state: 'AZ', zip: '85001' },
    { name: 'Philadelphia', state: 'PA', zip: '19101' },
    { name: 'San Antonio', state: 'TX', zip: '78201' },
    { name: 'San Diego', state: 'CA', zip: '92101' },
    { name: 'Dallas', state: 'TX', zip: '75201' },
    { name: 'San Jose', state: 'CA', zip: '95101' },
    { name: 'Austin', state: 'TX', zip: '78701' },
    { name: 'Jacksonville', state: 'FL', zip: '32201' },
    { name: 'Fort Worth', state: 'TX', zip: '76101' },
    { name: 'Columbus', state: 'OH', zip: '43201' },
    { name: 'Charlotte', state: 'NC', zip: '28201' },
    { name: 'San Francisco', state: 'CA', zip: '94101' },
    { name: 'Indianapolis', state: 'IN', zip: '46201' },
    { name: 'Seattle', state: 'WA', zip: '98101' },
    { name: 'Denver', state: 'CO', zip: '80201' },
    { name: 'Boston', state: 'MA', zip: '02101' },
    { name: 'Nashville', state: 'TN', zip: '37201' },
    { name: 'Memphis', state: 'TN', zip: '38101' },
    { name: 'Portland', state: 'OR', zip: '97201' },
    { name: 'Oklahoma City', state: 'OK', zip: '73101' },
    { name: 'Las Vegas', state: 'NV', zip: '89101' },
    { name: 'Detroit', state: 'MI', zip: '48201' },
    { name: 'Miami', state: 'FL', zip: '33101' },
    { name: 'Atlanta', state: 'GA', zip: '30301' },
    { name: 'Minneapolis', state: 'MN', zip: '55401' },
    { name: 'Tampa', state: 'FL', zip: '33601' }
  ];

  const firstNames = [
    'James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
    'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Lisa', 'Nancy', 'Betty', 'Dorothy', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Margaret',
    'Carol', 'Michelle', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
  ];

  const positions = [
    'Branch Manager', 'Assistant Manager', 'Senior Teller', 'Teller', 'Loan Officer', 
    'Financial Advisor', 'Customer Service Rep', 'Security Officer', 'IT Support', 'Operations Manager'
  ];

  const accountTypes = ['checking', 'savings', 'credit', 'loan'];
  const accountStatuses = ['active', 'inactive', 'closed', 'suspended'];
  const transactionTypes = ['deposit', 'withdrawal', 'transfer', 'fee', 'interest'];
  const transactionStatuses = ['pending', 'completed', 'failed', 'cancelled'];
  const genders = ['male', 'female', 'other', 'prefer_not_to_say'];

  const generateTestData = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    const data = {
      branches: [],
      employees: [],
      customers: [],
      accounts: [],
      transactions: []
    };

    // 1. Generate 100 branches
    for (let i = 1; i <= 100; i++) {
      const city = randomChoice(cities);
      const branch = {
        id: generateId('BR', i),
        name: `${city.name} ${randomChoice(['Main', 'Downtown', 'Westside', 'Eastside', 'North', 'South', 'Central', 'Plaza', 'Mall', 'Airport'])} Branch`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${randomChoice(['Main', 'Oak', 'Pine', 'Elm', 'Maple', 'Cedar', 'Park', 'First', 'Second', 'Third'])} ${randomChoice(['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd'])}`,
        city: city.name,
        state: city.state,
        zip_code: city.zip,
        manager_id: null // Will be updated after employees are created
      };
      data.branches.push(branch);
    }
    setProgress(10);

    // 2. Generate 500 employees
    for (let i = 1; i <= 500; i++) {
      const branch = randomChoice(data.branches);
      const firstName = randomChoice(firstNames);
      const lastName = randomChoice(lastNames);
      const position = randomChoice(positions);
      const employee = {
        id: generateId('EMP', i),
        branch_id: branch.id,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@bank.com`,
        phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        position: position,
        hire_date: formatDate(randomDate(new Date(2015, 0, 1), new Date(2024, 11, 31))),
        salary: randomAmount(35000, position === 'Branch Manager' ? 120000 : position === 'Assistant Manager' ? 80000 : 65000)
      };
      data.employees.push(employee);
    }
    setProgress(20);

    // Update branch managers
    const managers = data.employees.filter(emp => emp.position === 'Branch Manager');
    data.branches.forEach(branch => {
      const branchManager = managers.find(mgr => mgr.branch_id === branch.id);
      if (branchManager) {
        branch.manager_id = branchManager.id;
      }
    });

    // 3. Generate 3000 customers
    for (let i = 1; i <= 3000; i++) {
      const firstName = randomChoice(firstNames);
      const lastName = randomChoice(lastNames);
      const branch = randomChoice(data.branches);
      const customer = {
        id: generateId('CUST', i),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
        phone: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${randomChoice(['Oak', 'Pine', 'Elm', 'Maple', 'Cedar', 'Park', 'Lake', 'River', 'Hill', 'Valley'])} ${randomChoice(['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd'])}`,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: formatDate(randomDate(new Date(1950, 0, 1), new Date(2005, 11, 31))),
        gender: randomChoice(genders),
        national_id: `SSN${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        branch_id: branch.id
      };
      data.customers.push(customer);
    }
    setProgress(40);

    // 4. Generate 5000 accounts (customers can have multiple accounts)
    for (let i = 1; i <= 5000; i++) {
      const customer = randomChoice(data.customers);
      const accountType = randomChoice(accountTypes);
      const account = {
        id: generateId('ACC', i),
        customer_id: customer.id,
        account_number: `${Math.floor(Math.random() * 90000000) + 10000000}`,
        type: accountType,
        balance: randomAmount(
          accountType === 'loan' ? -50000 : 0,
          accountType === 'credit' ? 25000 : accountType === 'savings' ? 100000 : 50000
        ),
        opened_at: formatDate(randomDate(new Date(2020, 0, 1), new Date(2024, 11, 31))),
        interest_rate: accountType === 'savings' ? randomAmount(0.01, 0.05) : 
                      accountType === 'loan' ? randomAmount(0.03, 0.15) : 
                      accountType === 'credit' ? randomAmount(0.12, 0.29) : null,
        status: randomChoice(accountStatuses),
        branch_id: customer.branch_id
      };
      data.accounts.push(account);
    }
    setProgress(60);

    // 5. Generate 15000 transactions
    for (let i = 1; i <= 15000; i++) {
      const account = randomChoice(data.accounts);
      const employee = randomChoice(data.employees.filter(emp => emp.branch_id === account.branch_id));
      const transactionType = randomChoice(transactionTypes);
      
      let amount;
      if (transactionType === 'deposit') {
        amount = randomAmount(10, 10000);
      } else if (transactionType === 'withdrawal') {
        amount = randomAmount(10, 5000);
      } else if (transactionType === 'transfer') {
        amount = randomAmount(10, 5000);
      } else if (transactionType === 'fee') {
        amount = randomAmount(1, 50);
      } else { // interest
        amount = randomAmount(0.01, 500);
      }

      const transaction = {
        id: generateId('TXN', i),
        account_id: account.id,
        transaction_date: formatTimestamp(randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31))),
        amount: amount,
        type: transactionType,
        description: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} transaction`,
        status: randomChoice(transactionStatuses),
        employee_id: employee ? employee.id : null
      };
      data.transactions.push(transaction);
    }
    setProgress(80);

    // Add edge cases and corner cases
    await addEdgeCases(data);
    
    setProgress(100);
    setGeneratedData(data);
    setIsGenerating(false);
  };

  const addEdgeCases = async (data) => {
    // Edge case 1: Customer with no accounts
    const noAccountCustomer = {
      id: 'CUST999991',
      email: 'no.account@email.com',
      phone: '555-0000',
      address: '123 No Account St',
      first_name: 'No',
      last_name: 'Account',
      date_of_birth: '1990-01-01',
      gender: 'prefer_not_to_say',
      national_id: 'SSN000000001',
      branch_id: data.branches[0].id
    };
    data.customers.push(noAccountCustomer);

    // Edge case 2: Account with zero balance
    const zeroBalanceAccount = {
      id: 'ACC999991',
      customer_id: data.customers[0].id,
      account_number: '00000000',
      type: 'checking',
      balance: '0.00',
      opened_at: '2024-01-01',
      interest_rate: null,
      status: 'active',
      branch_id: data.customers[0].branch_id
    };
    data.accounts.push(zeroBalanceAccount);

    // Edge case 3: Very old customer
    const oldCustomer = {
      id: 'CUST999992',
      email: 'very.old@email.com',
      phone: '555-0001',
      address: '456 Old Timer Ave',
      first_name: 'Very',
      last_name: 'Old',
      date_of_birth: '1920-01-01',
      gender: 'male',
      national_id: 'SSN000000002',
      branch_id: data.branches[0].id
    };
    data.customers.push(oldCustomer);

    // Edge case 4: Very young customer (18 years old)
    const youngCustomer = {
      id: 'CUST999993',
      email: 'very.young@email.com',
      phone: '555-0002',
      address: '789 Young St',
      first_name: 'Very',
      last_name: 'Young',
      date_of_birth: '2006-01-01',
      gender: 'female',
      national_id: 'SSN000000003',
      branch_id: data.branches[0].id
    };
    data.customers.push(youngCustomer);

    // Edge case 5: High-value account
    const highValueAccount = {
      id: 'ACC999992',
      customer_id: data.customers[0].id,
      account_number: '99999999',
      type: 'savings',
      balance: '1000000.00',
      opened_at: '2020-01-01',
      interest_rate: '0.0250',
      status: 'active',
      branch_id: data.customers[0].branch_id
    };
    data.accounts.push(highValueAccount);

    // Edge case 6: Failed transaction
    const failedTransaction = {
      id: 'TXN999991',
      account_id: data.accounts[0].id,
      transaction_date: '2024-01-01 12:00:00',
      amount: '1000.00',
      type: 'withdrawal',
      description: 'Failed withdrawal - insufficient funds',
      status: 'failed',
      employee_id: data.employees[0].id
    };
    data.transactions.push(failedTransaction);

    // Edge case 7: Large transaction
    const largeTransaction = {
      id: 'TXN999992',
      account_id: data.accounts[0].id,
      transaction_date: '2024-01-01 13:00:00',
      amount: '50000.00',
      type: 'deposit',
      description: 'Large deposit transaction',
      status: 'completed',
      employee_id: data.employees[0].id
    };
    data.transactions.push(largeTransaction);

    // Edge case 8: Suspended account
    const suspendedAccount = {
      id: 'ACC999993',
      customer_id: data.customers[1].id,
      account_number: '11111111',
      type: 'checking',
      balance: '500.00',
      opened_at: '2023-01-01',
      interest_rate: null,
      status: 'suspended',
      branch_id: data.customers[1].branch_id
    };
    data.accounts.push(suspendedAccount);

    // Edge case 9: Employee with minimum salary
    const minSalaryEmployee = {
      id: 'EMP999991',
      branch_id: data.branches[0].id,
      name: 'Min Salary',
      email: 'min.salary@bank.com',
      phone: '555-9999',
      position: 'Teller',
      hire_date: '2024-01-01',
      salary: '25000.00'
    };
    data.employees.push(minSalaryEmployee);

    // Edge case 10: Employee with maximum salary
    const maxSalaryEmployee = {
      id: 'EMP999992',
      branch_id: data.branches[0].id,
      name: 'Max Salary',
      email: 'max.salary@bank.com',
      phone: '555-9998',
      position: 'Branch Manager',
      hire_date: '2015-01-01',
      salary: '150000.00'
    };
    data.employees.push(maxSalaryEmployee);
  };

  const generateInsertQueries = () => {
    if (!generatedData) return '';

    let queries = '';
    
    // Branches
    queries += "-- INSERT INTO branches\n";
    queries += "INSERT INTO branches (id, name, address, city, state, zip_code, manager_id) VALUES\n";
    queries += generatedData.branches.map(branch => 
      `('${branch.id}', '${branch.name.replace(/'/g, "''")}', '${branch.address.replace(/'/g, "''")}', '${branch.city}', '${branch.state}', '${branch.zip_code}', ${branch.manager_id ? `'${branch.manager_id}'` : 'NULL'})`
    ).join(',\n');
    queries += ";\n\n";

    // Employees
    queries += "-- INSERT INTO employees\n";
    queries += "INSERT INTO employees (id, branch_id, name, email, phone, position, hire_date, salary) VALUES\n";
    queries += generatedData.employees.map(emp => 
      `('${emp.id}', '${emp.branch_id}', '${emp.name.replace(/'/g, "''")}', '${emp.email}', '${emp.phone}', '${emp.position}', '${emp.hire_date}', ${emp.salary})`
    ).join(',\n');
    queries += ";\n\n";

    // Customers
    queries += "-- INSERT INTO customers\n";
    queries += "INSERT INTO customers (id, email, phone, address, first_name, last_name, date_of_birth, gender, national_id, branch_id) VALUES\n";
    queries += generatedData.customers.map(cust => 
      `('${cust.id}', '${cust.email}', '${cust.phone}', '${cust.address.replace(/'/g, "''")}', '${cust.first_name}', '${cust.last_name}', '${cust.date_of_birth}', '${cust.gender}', '${cust.national_id}', '${cust.branch_id}')`
    ).join(',\n');
    queries += ";\n\n";

    // Accounts
    queries += "-- INSERT INTO accounts\n";
    queries += "INSERT INTO accounts (id, customer_id, account_number, type, balance, opened_at, interest_rate, status, branch_id) VALUES\n";
    queries += generatedData.accounts.map(acc => 
      `('${acc.id}', '${acc.customer_id}', '${acc.account_number}', '${acc.type}', ${acc.balance}, '${acc.opened_at}', ${acc.interest_rate || 'NULL'}, '${acc.status}', '${acc.branch_id}')`
    ).join(',\n');
    queries += ";\n\n";

    // Transactions
    queries += "-- INSERT INTO transactions\n";
    queries += "INSERT INTO transactions (id, account_id, transaction_date, amount, type, description, status, employee_id) VALUES\n";
    queries += generatedData.transactions.map(txn => 
      `('${txn.id}', '${txn.account_id}', '${txn.transaction_date}', ${txn.amount}, '${txn.type}', '${txn.description.replace(/'/g, "''")}', '${txn.status}', ${txn.employee_id ? `'${txn.employee_id}'` : 'NULL'})`
    ).join(',\n');
    queries += ";\n\n";

    return queries;
  };

  const downloadInsertQueries = () => {
    const queries = generateInsertQueries();
    const blob = new Blob([queries], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banking_system_test_data.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    if (!generatedData) return;

    // Create CSV content for each table
    const createCSV = (data, headers) => {
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value || '';
        }).join(','))
      ].join('\n');
      return csvContent;
    };

    // Create a simple HTML page with all tables
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Banking System Test Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .summary { background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Banking System Test Data</h1>
    
    <div class="summary">
        <h3>Data Summary</h3>
        <p>Branches: ${generatedData.branches.length}</p>
        <p>Employees: ${generatedData.employees.length}</p>
        <p>Customers: ${generatedData.customers.length}</p>
        <p>Accounts: ${generatedData.accounts.length}</p>
        <p>Transactions: ${generatedData.transactions.length}</p>
        <p>Total Records: ${generatedData.branches.length + generatedData.employees.length + generatedData.customers.length + generatedData.accounts.length + generatedData.transactions.length}</p>
    </div>

    <h2>Branches (${generatedData.branches.length} records)</h2>
    <table>
        <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Manager ID</th>
        </tr>
        ${generatedData.branches.map(branch => `
        <tr>
            <td>${branch.id}</td>
            <td>${branch.name}</td>
            <td>${branch.address}</td>
            <td>${branch.city}</td>
            <td>${branch.state}</td>
            <td>${branch.zip_code}</td>
            <td>${branch.manager_id || ''}</td>
        </tr>`).join('')}
    </table>

    <h2>Employees (${generatedData.employees.length} records)</h2>
    <table>
        <tr>
            <th>ID</th><th>Branch ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Hire Date</th><th>Salary</th>
        </tr>
        ${generatedData.employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.branch_id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.position}</td>
            <td>${emp.hire_date}</td>
            <td>$${emp.salary}</td>
        </tr>`).join('')}
    </table>

    <h2>Customers (${generatedData.customers.length} records)</h2>
    <table>
        <tr>
            <th>ID</th><th>Email</th><th>Phone</th><th>Address</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>National ID</th><th>Branch ID</th>
        </tr>
        ${generatedData.customers.map(cust => `
        <tr>
            <td>${cust.id}</td>
            <td>${cust.email}</td>
            <td>${cust.phone}</td>
            <td>${cust.address}</td>
            <td>${cust.first_name}</td>
            <td>${cust.last_name}</td>
            <td>${cust.date_of_birth}</td>
            <td>${cust.gender}</td>
            <td>${cust.national_id}</td>
            <td>${cust.branch_id}</td>
        </tr>`).join('')}
    </table>

    <h2>Accounts (${generatedData.accounts.length} records)</h2>
    <table>
        <tr>
            <th>ID</th><th>Customer ID</th><th>Account Number</th><th>Type</th><th>Balance</th><th>Opened At</th><th>Interest Rate</th><th>Status</th><th>Branch ID</th>
        </tr>
        ${generatedData.accounts.map(acc => `
        <tr>
            <td>${acc.id}</td>
            <td>${acc.customer_id}</td>
            <td>${acc.account_number}</td>
            <td>${acc.type}</td>
            <td>$${acc.balance}</td>
            <td>${acc.opened_at}</td>
            <td>${acc.interest_rate || ''}</td>
            <td>${acc.status}</td>
            <td>${acc.branch_id}</td>
        </tr>`).join('')}
    </table>

    <h2>Transactions (${generatedData.transactions.length} records)</h2>
    <table>
        <tr>
            <th>ID</th><th>Account ID</th><th>Transaction Date</th><th>Amount</th><th>Type</th><th>Description</th><th>Status</th><th>Employee ID</th>
        </tr>
        ${generatedData.transactions.map(txn => `
        <tr>
            <td>${txn.id}</td>
            <td>${txn.account_id}</td>
            <td>${txn.transaction_date}</td>
            <td>$${txn.amount}</td>
            <td>${txn.type}</td>
            <td>${txn.description}</td>
            <td>${txn.status}</td>
            <td>${txn.employee_id || ''}</td>
        </tr>`).join('')}
    </table>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banking_system_test_data.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Banking System Test Data Generator</h1>
        <p className="text-gray-600">Generate comprehensive test data with 10K+ rows for your banking system database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Building className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Branches</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">100</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Employees</span>
          </div>
          <div className="text-2xl font-bold text-green-600">500</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">Customers</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">3,000</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center mb-2">
            <CreditCard className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">Accounts</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">5,000</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <ArrowRightLeft className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">Transactions</span>
          </div>
          <div className="text-2xl font-bold text-red-600">15,000</div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
            <div>
              <h3 className="font-medium">Realistic Data</h3>
              <p className="text-sm text-gray-600">Names, addresses, phone numbers, and emails</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
            <div>
              <h3 className="font-medium">Proper Relationships</h3>
              <p className="text-sm text-gray-600">All foreign keys properly maintained</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
            <div>
              <h3 className="font-medium">Edge Cases</h3>
              <p className="text-sm text-gray-600">Zero balances, failed transactions, suspended accounts</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
            <div>
              <h3 className="font-medium">Export Options</h3>
              <p className="text-sm text-gray-600">SQL inserts and HTML table export</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={generateTestData}
          disabled={isGenerating}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Database className="w-5 h-5 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Test Data'}
        </button>
        
        {generatedData && (
          <>
            <button
              onClick={downloadInsertQueries}
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download SQL Inserts
            </button>
            
            <button
              onClick={downloadExcel}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Download HTML Tables
            </button>
          </>
        )}
      </div>

      {isGenerating && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Generating data...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {generatedData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Data Generation Complete!</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedData.branches.length}</div>
              <div className="text-green-700">Branches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedData.employees.length}</div>
              <div className="text-green-700">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedData.customers.length}</div>
              <div className="text-green-700">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedData.accounts.length}</div>
              <div className="text-green-700">Accounts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedData.transactions.length}</div>
              <div className="text-green-700">Transactions</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-green-600">
              {generatedData.branches.length + generatedData.employees.length + generatedData.customers.length + generatedData.accounts.length + generatedData.transactions.length}
            </div>
            <div className="text-green-700">Total Records Generated</div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Edge Cases Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2 text-blue-700">
            <li>• Customer with no accounts</li>
            <li>• Account with zero balance</li>
            <li>• Very old customer (born 1920)</li>
            <li>• Very young customer (18 years old)</li>
            <li>• High-value account ($1M balance)</li>
          </ul>
          <ul className="space-y-2 text-blue-700">
            <li>• Failed transactions</li>
            <li>• Large transactions ($50K)</li>
            <li>• Suspended accounts</li>
            <li>• Minimum salary employee</li>
            <li>• Maximum salary employee</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BankingDataGenerator;