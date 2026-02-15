const jspIntroduction = {
  id: 'jsp-introduction',
  title: 'Introduction to JSP',
  description: 'What is JSP and why use it?',
  content: `
# Introduction to JSP — Dynamic Web Pages Made Easy

JavaServer Pages (JSP) is a technology that helps you create dynamic web content. Instead of writing Java code to generate HTML (like in servlets), you write HTML with embedded Java code. It's the natural way to build web pages.

---

## What is JSP?

JSP is a server-side technology that lets you embed Java code directly in HTML pages. When a user requests a JSP page, the server processes the Java code and sends back pure HTML to the browser.

\`\`\`jsp
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Hello, <%= request.getParameter("name") %>!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

---

## Why Use JSP?

### Servlet Approach (Hard Way)

\`\`\`java
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Welcome</title></head>");
        out.println("<body>");
        out.println("<h1>Hello, " + request.getParameter("name") + "!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}
\`\`\`

### JSP Approach (Easy Way)

\`\`\`jsp
<!DOCTYPE html>
<html>
<head><title>Welcome</title></head>
<body>
    <h1>Hello, <%= request.getParameter("name") %>!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

**Much cleaner!** The HTML structure is visible, and Java code is only where needed.

---

## How JSP Works

\`\`\`
1. Browser requests page.jsp
2. Server checks if JSP is compiled
3. If not, translates JSP to Servlet
4. Compiles the Servlet
5. Executes the Servlet
6. Returns HTML to browser
\`\`\`

### Behind the Scenes

Your JSP file gets converted to a servlet automatically:

**hello.jsp:**
\`\`\`jsp
<h1>Hello, <%= name %></h1>
\`\`\`

**Becomes (simplified):**
\`\`\`java
public class hello_jsp extends HttpServlet {
    public void _jspService(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter out = response.getWriter();
        out.write("<h1>Hello, ");
        out.print(name);
        out.write("</h1>");
    }
}
\`\`\`

---

## JSP vs Servlet

| Feature | JSP | Servlet |
|---------|-----|---------|
| Primary content | HTML with Java | Java with HTML |
| Best for | Presentation/View | Business logic/Controller |
| Ease of design | Easy for designers | Hard for designers |
| Compilation | Auto-compiled | Manual compile |
| Changes | Hot reload | Restart needed |

### When to Use What

- **JSP:** Display data, forms, user interface
- **Servlet:** Process forms, business logic, database operations
- **Best Practice:** Use both together (MVC pattern)

---

## Your First JSP

### 1. Create the File

Save as \`hello.jsp\` in your web application's root:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>My First JSP</title>
</head>
<body>
    <h1>Welcome to JSP!</h1>
    
    <%-- This is a JSP comment --%>
    
    <p>Server time: <%= new java.util.Date() %></p>
    
    <% 
        String name = request.getParameter("name");
        if (name == null) {
            name = "Guest";
        }
    %>
    
    <p>Hello, <%= name %>!</p>
    
    <form method="get">
        <input type="text" name="name" placeholder="Enter your name">
        <button type="submit">Greet Me</button>
    </form>
</body>
</html>
\`\`\`

### 2. Access It

Open in browser: \`http://localhost:8080/yourapp/hello.jsp\`

---

## JSP Syntax Overview

### Expression: <%= %>

Output a value:

\`\`\`jsp
<p>2 + 2 = <%= 2 + 2 %></p>
<p>Name: <%= user.getName() %></p>
\`\`\`

### Scriptlet: <% %>

Execute Java code:

\`\`\`jsp
<%
    for (int i = 1; i <= 5; i++) {
        out.println("<p>Line " + i + "</p>");
    }
%>
\`\`\`

### Declaration: <%! %>

Declare methods or variables:

\`\`\`jsp
<%!
    private int counter = 0;
    
    public String formatDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
%>
\`\`\`

### Directive: <%@ %>

Page configuration:

\`\`\`jsp
<%@ page language="java" contentType="text/html" %>
<%@ page import="java.util.*, java.text.*" %>
<%@ include file="header.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
\`\`\`

---

## Real-World Example: Product List

\`\`\`jsp
<%@ page import="java.util.*, com.example.Product" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Product Catalog</title>
</head>
<body>
    <h1>Our Products</h1>
    
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
        
        <c:forEach var="product" items="\${products}">
            <tr>
                <td>\${product.id}</td>
                <td>\${product.name}</td>
                <td>$\${product.price}</td>
                <td>
                    <a href="cart?action=add&id=\${product.id}">Add to Cart</a>
                </td>
            </tr>
        </c:forEach>
    </table>
    
    <c:if test="\${empty products}">
        <p>No products available.</p>
    </c:if>
</body>
</html>
\`\`\`
`,
  code: `// JSP Introduction Demo
// Demonstrates JSP concepts and syntax

import java.util.*;

public class JspIntroDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Introduction Demo ===\\n");
        
        // 1. WHAT IS JSP
        System.out.println("1. WHAT IS JSP?");
        System.out.println("   -------------");
        System.out.println("   JSP = JavaServer Pages");
        System.out.println("   - Server-side technology");
        System.out.println("   - HTML with embedded Java code");
        System.out.println("   - Automatically compiled to servlets");
        System.out.println();
        
        // 2. JSP VS SERVLET COMPARISON
        System.out.println("2. JSP VS SERVLET");
        System.out.println("   ---------------");
        System.out.println();
        
        System.out.println("   SERVLET (Java with HTML):");
        System.out.println("   -------------------------");
        String servletCode = 
            "   out.println(\\"<html>\\");\\n" +
            "   out.println(\\"<body>\\");\\n" +
            "   out.println(\\"<h1>Hello, \\" + name + \\"!</h1>\\");\\n" +
            "   out.println(\\"</body>\\");\\n" +
            "   out.println(\\"</html>\\");";
        System.out.println(servletCode);
        System.out.println();
        
        System.out.println("   JSP (HTML with Java):");
        System.out.println("   ---------------------");
        String jspCode = 
            "   <html>\\n" +
            "   <body>\\n" +
            "   <h1>Hello, <%= name %>!</h1>\\n" +
            "   </body>\\n" +
            "   </html>";
        System.out.println(jspCode);
        System.out.println();
        
        // 3. HOW JSP WORKS
        System.out.println("3. HOW JSP WORKS");
        System.out.println("   --------------");
        System.out.println("   1. Browser requests page.jsp");
        System.out.println("   2. Server translates JSP to Servlet");
        System.out.println("   3. Server compiles the Servlet");
        System.out.println("   4. Server executes the Servlet");
        System.out.println("   5. HTML response sent to browser");
        System.out.println();
        
        // 4. JSP SYNTAX ELEMENTS
        System.out.println("4. JSP SYNTAX ELEMENTS");
        System.out.println("   --------------------");
        System.out.println();
        
        System.out.println("   Expression: <%= expression %>");
        System.out.println("   Example: <%= 2 + 2 %> outputs: 4");
        System.out.println();
        
        System.out.println("   Scriptlet: <% code %>");
        System.out.println("   Example: <% for(int i=0; i<5; i++) { %>");
        System.out.println();
        
        System.out.println("   Declaration: <%! declaration %>");
        System.out.println("   Example: <%! int count = 0; %>");
        System.out.println();
        
        System.out.println("   Directive: <%@ directive %>");
        System.out.println("   Example: <%@ page import=\\"java.util.*\\" %>");
        System.out.println();
        
        System.out.println("   Comment: <%-- comment --%>");
        System.out.println("   (Not sent to browser)");
        System.out.println();
        
        // 5. SIMULATE JSP PROCESSING
        System.out.println("5. SIMULATING JSP PROCESSING");
        System.out.println("   --------------------------");
        
        String jspTemplate = 
            "<html>\\n" +
            "<body>\\n" +
            "<h1>Hello, <%= name %>!</h1>\\n" +
            "<p>Today is <%= date %></p>\\n" +
            "<ul>\\n" +
            "<% for(item : items) { %>\\n" +
            "  <li><%= item %></li>\\n" +
            "<% } %>\\n" +
            "</ul>\\n" +
            "</body>\\n" +
            "</html>";
        
        System.out.println("   JSP Template:");
        System.out.println("   " + jspTemplate.replace("\\n", "\\n   "));
        System.out.println();
        
        // Process the template
        Map<String, Object> data = new HashMap<>();
        data.put("name", "John");
        data.put("date", new Date().toString());
        data.put("items", Arrays.asList("Apple", "Banana", "Orange"));
        
        String output = processJsp(jspTemplate, data);
        
        System.out.println("   Processed Output:");
        System.out.println("   " + output.replace("\\n", "\\n   "));
        System.out.println();
        
        // 6. COMPARISON TABLE
        System.out.println("6. JSP VS SERVLET COMPARISON");
        System.out.println("   --------------------------");
        System.out.println("   | Feature      | JSP              | Servlet          |");
        System.out.println("   |--------------|------------------|------------------|");
        System.out.println("   | Content      | HTML with Java   | Java with HTML   |");
        System.out.println("   | Best for     | Presentation     | Business logic   |");
        System.out.println("   | Design       | Easy for UI      | Hard for UI      |");
        System.out.println("   | Compilation  | Auto-compiled    | Manual compile   |");
        System.out.println("   | Changes      | Hot reload       | Restart needed   |");
        System.out.println();
        
        // 7. BEST PRACTICES
        System.out.println("7. BEST PRACTICES");
        System.out.println("   ---------------");
        System.out.println("   1. Use JSP for presentation (View)");
        System.out.println("   2. Use Servlets for logic (Controller)");
        System.out.println("   3. Use JavaBeans for data (Model)");
        System.out.println("   4. Minimize Java code in JSP");
        System.out.println("   5. Use JSTL and EL instead of scriptlets");
    }
    
    // Simple JSP processor simulation
    static String processJsp(String template, Map<String, Object> data) {
        String result = template;
        
        // Replace expressions
        result = result.replace("<%= name %>", (String) data.get("name"));
        result = result.replace("<%= date %>", (String) data.get("date"));
        
        // Handle loop (simplified)
        StringBuilder items = new StringBuilder();
        for (Object item : (List<?>) data.get("items")) {
            items.append("  <li>").append(item).append("</li>\\n");
        }
        
        // Replace loop construct
        result = result.replaceAll(
            "<% for\\\\(item : items\\\\) \\\\{ %>\\\\n  <li><%= item %></li>\\\\n<% \\\\} %>\\\\n",
            items.toString()
        );
        
        return result;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple JSP template processor',
      hint: 'Replace placeholders with actual values',
      starterCode: `import java.util.*;

public class JspProcessorDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Template Processor Demo ===\\n");
        
        JspProcessor processor = new JspProcessor();
        
        // Template with expressions
        String template = 
            "<html>\\n" +
            "<head><title><%= title %></title></head>\\n" +
            "<body>\\n" +
            "  <h1>Welcome, <%= username %>!</h1>\\n" +
            "  <p>You have <%= messageCount %> messages.</p>\\n" +
            "  <p>Last login: <%= lastLogin %></p>\\n" +
            "</body>\\n" +
            "</html>";
        
        System.out.println("Template:");
        System.out.println(template);
        System.out.println();
        
        // Data to inject
        Map<String, String> data = new HashMap<>();
        data.put("title", "Dashboard");
        data.put("username", "John Doe");
        data.put("messageCount", "5");
        data.put("lastLogin", "2024-01-15 10:30 AM");
        
        // Process template
        String output = processor.process(template, data);
        
        System.out.println("Processed Output:");
        System.out.println(output);
    }
}

class JspProcessor {
    public String process(String template, Map<String, String> data) {
        String result = template;
        
        // Replace all <%= key %> with values
        for (Map.Entry<String, String> entry : data.entrySet()) {
            String placeholder = "<%= " + entry.getKey() + " %>";
            result = result.replace(placeholder, entry.getValue());
        }
        
        return result;
    }
}`
    }
  ]
};

export default jspIntroduction;
