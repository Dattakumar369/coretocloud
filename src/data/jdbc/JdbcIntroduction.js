const jdbcIntroduction = {
  id: 'jdbc-introduction',
  title: 'Introduction to JDBC',
  description: 'How Java talks to databases — and why you need to know this',
  content: `
# JDBC — Connecting Java to Databases

Here's a scenario: You're building an e-commerce app. Users sign up, browse products, place orders. Where does all that data go? A database. And how does your Java code talk to that database? That's where JDBC comes in.

**JDBC** stands for **Java Database Connectivity**. It's the standard way for Java applications to interact with databases — MySQL, PostgreSQL, Oracle, you name it.

---

## Why Do You Need JDBC?

Think about it. Your Java code runs in memory. Your database stores data on disk. They're two completely different worlds. JDBC is the bridge between them.

Without JDBC (or something like it), you'd have no way to:
- Save user registrations
- Retrieve product listings
- Process orders
- Store anything permanently

Every real application needs to persist data. JDBC makes that possible.

---

## How JDBC Works — The Big Picture

Here's the basic flow:

\`\`\`
Your Java Code
      ↓
   JDBC API
      ↓
  JDBC Driver
      ↓
   Database
\`\`\`

Let me break this down:

1. **Your Java Code** — You write SQL queries and use JDBC classes
2. **JDBC API** — Standard interfaces like \`Connection\`, \`Statement\`, \`ResultSet\`
3. **JDBC Driver** — Database-specific code that knows how to talk to MySQL, Oracle, etc.
4. **Database** — Where your data actually lives

The beauty of this design? Your code uses the same JDBC API regardless of which database you're using. Want to switch from MySQL to PostgreSQL? Just change the driver. Your code stays the same.

---

## The Key Players

JDBC has a few important interfaces you'll use constantly:

**DriverManager**
- Manages database drivers
- Creates connections to the database

**Connection**
- Represents a session with the database
- You get this from DriverManager

**Statement / PreparedStatement**
- Used to execute SQL queries
- PreparedStatement is safer (prevents SQL injection)

**ResultSet**
- Holds the results of a SELECT query
- You iterate through it to get your data

---

## Your First JDBC Program

Let's connect to a MySQL database and fetch some data. Here's what the code looks like:

\`\`\`java
import java.sql.*;

public class FirstJDBC {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "password";
        
        try {
            // Step 1: Get a connection
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connected!");
            
            // Step 2: Create a statement
            Statement stmt = conn.createStatement();
            
            // Step 3: Execute a query
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            
            // Step 4: Process the results
            while (rs.next()) {
                String name = rs.getString("name");
                String email = rs.getString("email");
                System.out.println(name + " - " + email);
            }
            
            // Step 5: Clean up
            rs.close();
            stmt.close();
            conn.close();
            
        } catch (SQLException e) {
            System.out.println("Something went wrong!");
            e.printStackTrace();
        }
    }
}
\`\`\`

That's it. Five steps:
1. Connect to the database
2. Create a statement
3. Execute your query
4. Process the results
5. Close everything

---

## The JDBC URL — What's That Weird String?

You probably noticed this: \`jdbc:mysql://localhost:3306/mydb\`

Let me decode it:

| Part | Meaning |
|------|---------|
| \`jdbc:\` | Protocol — tells Java this is a JDBC connection |
| \`mysql:\` | Database type |
| \`//localhost\` | Server address (your machine) |
| \`:3306\` | Port number (MySQL's default) |
| \`/mydb\` | Database name |

Different databases have different URL formats:

\`\`\`
MySQL:      jdbc:mysql://localhost:3306/mydb
PostgreSQL: jdbc:postgresql://localhost:5432/mydb
Oracle:     jdbc:oracle:thin:@localhost:1521:xe
SQL Server: jdbc:sqlserver://localhost:1433;databaseName=mydb
\`\`\`

---

## Statement vs PreparedStatement

Here's something important. There are two ways to execute queries:

**Statement** — Simple, but dangerous
\`\`\`java
String name = "John";
stmt.executeQuery("SELECT * FROM users WHERE name = '" + name + "'");
\`\`\`

**PreparedStatement** — Safe and efficient
\`\`\`java
String name = "John";
PreparedStatement pstmt = conn.prepareStatement(
    "SELECT * FROM users WHERE name = ?"
);
pstmt.setString(1, name);
ResultSet rs = pstmt.executeQuery();
\`\`\`

Why does this matter? **SQL Injection**.

Imagine a malicious user enters this as their name:
\`\`\`
'; DROP TABLE users; --
\`\`\`

With Statement, that could delete your entire users table. With PreparedStatement, it's just treated as a string. Always use PreparedStatement for user input.

---

## Handling Results

When you run a SELECT query, you get a ResultSet. Here's how to work with it:

\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT id, name, email FROM users");

while (rs.next()) {
    int id = rs.getInt("id");           // Get by column name
    String name = rs.getString("name");
    String email = rs.getString(3);      // Or by column index (1-based)
    
    System.out.println(id + ": " + name + " - " + email);
}
\`\`\`

The \`rs.next()\` method moves to the next row and returns \`false\` when there are no more rows.

---

## CRUD Operations

JDBC supports all the basic database operations:

**Create (INSERT)**
\`\`\`java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, "John");
pstmt.setString(2, "john@email.com");
int rowsAffected = pstmt.executeUpdate();
\`\`\`

**Read (SELECT)**
\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
\`\`\`

**Update**
\`\`\`java
String sql = "UPDATE users SET email = ? WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, "newemail@email.com");
pstmt.setInt(2, 1);
int rowsAffected = pstmt.executeUpdate();
\`\`\`

**Delete**
\`\`\`java
String sql = "DELETE FROM users WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, 1);
int rowsAffected = pstmt.executeUpdate();
\`\`\`

Notice: SELECT uses \`executeQuery()\` and returns a ResultSet. INSERT/UPDATE/DELETE use \`executeUpdate()\` and return the number of affected rows.

---

## Real-World Example: User Registration

Let's see how this works in a real scenario:

\`\`\`java
public class UserService {
    private Connection conn;
    
    public boolean registerUser(String name, String email, String password) {
        String sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setString(3, hashPassword(password)); // Never store plain passwords!
            
            int rows = pstmt.executeUpdate();
            return rows > 0;
            
        } catch (SQLException e) {
            System.out.println("Registration failed: " + e.getMessage());
            return false;
        }
    }
}
\`\`\`

This is the kind of code you'll write in real applications. Clean, safe, and handles errors properly.

---

## Common Mistakes to Avoid

**1. Not closing connections**
Database connections are expensive. Always close them when you're done. Better yet, use try-with-resources:
\`\`\`java
try (Connection conn = DriverManager.getConnection(url, user, pass)) {
    // Use connection
} // Automatically closed here
\`\`\`

**2. Hardcoding credentials**
Never put database passwords in your code. Use environment variables or config files.

**3. Using Statement for user input**
Always use PreparedStatement. SQL injection is a real threat.

**4. Not handling exceptions**
Database operations can fail. Always have proper error handling.

---

## What's Next?

This was just the introduction. In the upcoming lessons, we'll cover:
- JDBC Drivers — Types and how to set them up
- Connection Pooling — For better performance
- Transactions — When you need multiple operations to succeed or fail together
- Batch Processing — For bulk operations

But first, make sure you understand the basics. Try connecting to a database and running some queries. That hands-on experience is invaluable.

> **Pro Tip:** Set up a local MySQL database and practice. Create a simple table, insert some data, query it. The more you practice, the more comfortable you'll get.
`,
  code: `// JDBC Basics Demo
// This shows the fundamental concepts without needing a real database

public class JDBCBasicsDemo {
    public static void main(String[] args) {
        System.out.println("=== JDBC Basics Demo ===");
        System.out.println();
        
        // What is JDBC?
        System.out.println("WHAT IS JDBC?");
        System.out.println("-------------");
        System.out.println("JDBC = Java Database Connectivity");
        System.out.println("It's how Java applications talk to databases.");
        System.out.println();
        
        // The flow
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("Your Code -> JDBC API -> JDBC Driver -> Database");
        System.out.println();
        
        // Key components
        System.out.println("KEY COMPONENTS:");
        System.out.println("---------------");
        System.out.println("1. DriverManager - Creates connections");
        System.out.println("2. Connection    - Session with database");
        System.out.println("3. Statement     - Executes SQL");
        System.out.println("4. ResultSet     - Holds query results");
        System.out.println();
        
        // JDBC URL examples
        System.out.println("JDBC URL EXAMPLES:");
        System.out.println("------------------");
        System.out.println("MySQL:      jdbc:mysql://localhost:3306/mydb");
        System.out.println("PostgreSQL: jdbc:postgresql://localhost:5432/mydb");
        System.out.println("Oracle:     jdbc:oracle:thin:@localhost:1521:xe");
        System.out.println();
        
        // The 5 steps
        System.out.println("5 STEPS TO USE JDBC:");
        System.out.println("--------------------");
        System.out.println("1. Load the driver (optional in modern Java)");
        System.out.println("2. Get a connection");
        System.out.println("3. Create a statement");
        System.out.println("4. Execute the query");
        System.out.println("5. Close the connection");
        System.out.println();
        
        // Code example
        System.out.println("SAMPLE CODE:");
        System.out.println("------------");
        System.out.println("Connection conn = DriverManager.getConnection(url, user, pass);");
        System.out.println("PreparedStatement pstmt = conn.prepareStatement(sql);");
        System.out.println("ResultSet rs = pstmt.executeQuery();");
        System.out.println("while (rs.next()) {");
        System.out.println("    String name = rs.getString(\\"name\\");");
        System.out.println("}");
        System.out.println("conn.close();");
        System.out.println();
        
        // Important tips
        System.out.println("IMPORTANT TIPS:");
        System.out.println("---------------");
        System.out.println("- Always use PreparedStatement (prevents SQL injection)");
        System.out.println("- Always close your connections");
        System.out.println("- Never hardcode passwords");
        System.out.println("- Handle exceptions properly");
        System.out.println();
        
        System.out.println("Ready to connect to a real database? Let's go!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Write the code to connect to a MySQL database',
      hint: 'Use DriverManager.getConnection() with the correct URL format',
      starterCode: `import java.sql.*;

public class DatabaseConnect {
    public static void main(String[] args) {
        // Database details
        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "your_password";
        
        try {
            // Get connection
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connected successfully!");
            
            // Don't forget to close!
            conn.close();
            
        } catch (SQLException e) {
            System.out.println("Connection failed!");
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
    }
  ]
};

export default jdbcIntroduction;
