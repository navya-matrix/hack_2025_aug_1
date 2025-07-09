import sqlite3

def load_schema_and_data(schema_file, data_file):
    # Create an in-memory SQLite database
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()

    # Load and execute schema
    with open(schema_file, 'r') as schema:
        schema_sql = schema.read()
        cursor.executescript(schema_sql)

    # Load and execute test data
    with open(data_file, 'r') as data:
        data_sql = data.read()
        cursor.executescript(data_sql)

    # Verify data loading
    cursor.execute("SELECT * FROM branches;")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

    # Close connection
    conn.close()

# File paths
schema_file = "banking_schema_orig.sql"
data_file = "data/banking_test_data_now.sql"

# Load schema and data
load_schema_and_data(schema_file, data_file)