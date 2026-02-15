const servletAPI = {
  id: 'servlet-api',
  title: 'Servlet API',
  description: 'Core interfaces and classes of the Servlet API',
  content: `
# Servlet API — The Building Blocks

The Servlet API provides the interfaces and classes you need to build web applications. Understanding these core components is essential for servlet development.

---

## Servlet API Hierarchy

\`\`\`
                    Servlet (Interface)
                         │
                    GenericServlet (Abstract Class)
                         │
                    HttpServlet (Abstract Class)
                         │
                    YourServlet (Your Class)
\`\`\`

---

## Core Interfaces

### 1. Servlet Interface

The root interface that all servlets must implement:

\`\`\`java
public interface Servlet {
    void init(ServletConfig config) throws ServletException;
    void service(ServletRequest req, ServletResponse res) throws ServletException, IOException;
    void destroy();
    ServletConfig getServletConfig();
    String getServletInfo();
}
\`\`\`

### 2. ServletConfig Interface

Configuration for a single servlet:

\`\`\`java
public interface ServletConfig {
    String getServletName();
    ServletContext getServletContext();
    String getInitParameter(String name);
    Enumeration<String> getInitParameterNames();
}
\`\`\`

**Usage:**
\`\`\`java
// In web.xml
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>com.example.MyServlet</servlet-class>
    <init-param>
        <param-name>adminEmail</param-name>
        <param-value>admin@example.com</param-value>
    </init-param>
</servlet>

// In servlet
String email = getServletConfig().getInitParameter("adminEmail");
\`\`\`

### 3. ServletContext Interface

Application-wide configuration and resources:

\`\`\`java
public interface ServletContext {
    String getInitParameter(String name);
    void setAttribute(String name, Object value);
    Object getAttribute(String name);
    String getRealPath(String path);
    RequestDispatcher getRequestDispatcher(String path);
    // ... many more methods
}
\`\`\`

**Usage:**
\`\`\`java
ServletContext context = getServletContext();

// Application-wide data
context.setAttribute("appName", "My Application");
context.setAttribute("visitorCount", 0);

// Get real file path
String path = context.getRealPath("/WEB-INF/config.properties");
\`\`\`

---

## Request and Response

### HttpServletRequest

Everything about the incoming request:

\`\`\`java
// Request parameters
String username = request.getParameter("username");
String[] hobbies = request.getParameterValues("hobbies");

// Request attributes (for forwarding)
request.setAttribute("user", userObject);
User user = (User) request.getAttribute("user");

// Headers
String userAgent = request.getHeader("User-Agent");
String contentType = request.getContentType();

// URL information
String uri = request.getRequestURI();      // /app/users
String url = request.getRequestURL().toString(); // http://localhost:8080/app/users
String queryString = request.getQueryString();   // id=123&name=john
String contextPath = request.getContextPath();   // /app
String servletPath = request.getServletPath();   // /users

// Session
HttpSession session = request.getSession();

// Cookies
Cookie[] cookies = request.getCookies();
\`\`\`

### HttpServletResponse

Building the response:

\`\`\`java
// Content type
response.setContentType("text/html");
response.setContentType("application/json");
response.setCharacterEncoding("UTF-8");

// Status codes
response.setStatus(HttpServletResponse.SC_OK);           // 200
response.setStatus(HttpServletResponse.SC_NOT_FOUND);    // 404
response.sendError(HttpServletResponse.SC_FORBIDDEN);    // 403

// Headers
response.setHeader("Cache-Control", "no-cache");
response.addHeader("X-Custom-Header", "value");

// Redirect
response.sendRedirect("success.jsp");
response.sendRedirect("http://example.com");

// Output
PrintWriter out = response.getWriter();  // For text
OutputStream os = response.getOutputStream();  // For binary

// Cookies
Cookie cookie = new Cookie("username", "john");
cookie.setMaxAge(3600);  // 1 hour
response.addCookie(cookie);
\`\`\`

---

## GenericServlet vs HttpServlet

### GenericServlet

Protocol-independent servlet:

\`\`\`java
public class MyGenericServlet extends GenericServlet {
    @Override
    public void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException {
        // Handle any protocol
    }
}
\`\`\`

### HttpServlet (Use This!)

HTTP-specific servlet with convenience methods:

\`\`\`java
public class MyHttpServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Handle GET
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Handle POST
    }
}
\`\`\`

---

## RequestDispatcher

For forwarding and including:

### Forward

\`\`\`java
// Forward to another resource (URL doesn't change)
RequestDispatcher dispatcher = request.getRequestDispatcher("/result.jsp");
dispatcher.forward(request, response);
\`\`\`

### Include

\`\`\`java
// Include another resource's output
RequestDispatcher dispatcher = request.getRequestDispatcher("/header.jsp");
dispatcher.include(request, response);
\`\`\`

### Forward vs Redirect

| Forward | Redirect |
|---------|----------|
| Server-side | Client-side |
| Same request | New request |
| URL unchanged | URL changes |
| Faster | Slower |
| Can share request attributes | Cannot share |

---

## Scope Objects

### Request Scope

\`\`\`java
request.setAttribute("message", "Hello");
// Available only in this request
\`\`\`

### Session Scope

\`\`\`java
session.setAttribute("user", userObject);
// Available across requests for this user
\`\`\`

### Application Scope

\`\`\`java
getServletContext().setAttribute("config", configObject);
// Available to all users and requests
\`\`\`

---

## Complete Example

\`\`\`java
@WebServlet("/users")
public class UserServlet extends HttpServlet {
    
    @Override
    public void init() throws ServletException {
        // Get servlet config
        String dbUrl = getServletConfig().getInitParameter("dbUrl");
        
        // Get application context
        ServletContext context = getServletContext();
        context.setAttribute("dbUrl", dbUrl);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get parameters
        String userId = request.getParameter("id");
        
        // Get session
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("user");
        
        // Business logic
        User user = userService.findById(userId);
        
        // Set response
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        
        // Forward to JSP
        request.setAttribute("user", user);
        request.getRequestDispatcher("/user.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get form data
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        
        // Create user
        User user = new User(name, email);
        userService.save(user);
        
        // Redirect to list
        response.sendRedirect(request.getContextPath() + "/users");
    }
}
\`\`\`
`,
  code: `// Servlet API Demo
// Simulates core Servlet API components

import java.util.*;

public class ServletAPIDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet API Demo ===\\n");
        
        // Create simulated components
        SimulatedServletContext context = new SimulatedServletContext();
        SimulatedServletConfig config = new SimulatedServletConfig("UserServlet", context);
        
        // Add init parameters
        config.setInitParameter("dbUrl", "jdbc:mysql://localhost:3306/mydb");
        config.setInitParameter("maxConnections", "10");
        
        // 1. SERVLET CONFIG
        System.out.println("1. SERVLET CONFIG");
        System.out.println("   ---------------");
        System.out.println("   Servlet Name: " + config.getServletName());
        System.out.println("   Init Parameters:");
        for (String name : config.getInitParameterNames()) {
            System.out.println("     " + name + " = " + config.getInitParameter(name));
        }
        System.out.println();
        
        // 2. SERVLET CONTEXT
        System.out.println("2. SERVLET CONTEXT (Application Scope)");
        System.out.println("   ------------------------------------");
        context.setAttribute("appName", "My Web Application");
        context.setAttribute("version", "1.0.0");
        context.setAttribute("visitorCount", 0);
        
        System.out.println("   Application attributes:");
        System.out.println("     appName: " + context.getAttribute("appName"));
        System.out.println("     version: " + context.getAttribute("version"));
        System.out.println();
        
        // 3. HTTP REQUEST
        System.out.println("3. HTTP REQUEST");
        System.out.println("   -------------");
        
        SimulatedHttpRequest request = new SimulatedHttpRequest();
        request.setMethod("GET");
        request.setRequestURI("/app/users");
        request.setParameter("id", "123");
        request.setParameter("name", "John");
        request.setHeader("User-Agent", "Mozilla/5.0");
        request.setHeader("Accept", "text/html");
        
        System.out.println("   Method: " + request.getMethod());
        System.out.println("   URI: " + request.getRequestURI());
        System.out.println("   Parameters:");
        System.out.println("     id = " + request.getParameter("id"));
        System.out.println("     name = " + request.getParameter("name"));
        System.out.println("   Headers:");
        System.out.println("     User-Agent: " + request.getHeader("User-Agent"));
        System.out.println();
        
        // 4. HTTP RESPONSE
        System.out.println("4. HTTP RESPONSE");
        System.out.println("   --------------");
        
        SimulatedHttpResponse response = new SimulatedHttpResponse();
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(200);
        response.setHeader("Cache-Control", "no-cache");
        
        System.out.println("   Content-Type: " + response.getContentType());
        System.out.println("   Encoding: " + response.getCharacterEncoding());
        System.out.println("   Status: " + response.getStatus());
        System.out.println();
        
        // 5. REQUEST ATTRIBUTES (for forwarding)
        System.out.println("5. REQUEST ATTRIBUTES");
        System.out.println("   -------------------");
        
        User user = new User(123, "John Doe", "john@email.com");
        request.setAttribute("user", user);
        request.setAttribute("message", "User found successfully");
        
        System.out.println("   Set attributes for JSP:");
        System.out.println("     user: " + request.getAttribute("user"));
        System.out.println("     message: " + request.getAttribute("message"));
        System.out.println();
        
        // 6. SESSION
        System.out.println("6. SESSION");
        System.out.println("   --------");
        
        SimulatedHttpSession session = request.getSession();
        session.setAttribute("loggedInUser", user);
        session.setAttribute("loginTime", new Date());
        
        System.out.println("   Session ID: " + session.getId());
        System.out.println("   Session attributes:");
        System.out.println("     loggedInUser: " + session.getAttribute("loggedInUser"));
        System.out.println("     loginTime: " + session.getAttribute("loginTime"));
        System.out.println();
        
        // 7. FORWARD VS REDIRECT
        System.out.println("7. FORWARD VS REDIRECT");
        System.out.println("   --------------------");
        System.out.println("   Forward:");
        System.out.println("     - Server-side, same request");
        System.out.println("     - URL doesn't change");
        System.out.println("     - Can share request attributes");
        System.out.println("     - Example: request.getRequestDispatcher('/result.jsp').forward(req, resp)");
        System.out.println();
        System.out.println("   Redirect:");
        System.out.println("     - Client-side, new request");
        System.out.println("     - URL changes in browser");
        System.out.println("     - Cannot share request attributes");
        System.out.println("     - Example: response.sendRedirect('/success')");
    }
}

// Simulated User class
class User {
    int id;
    String name;
    String email;
    
    User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public String toString() {
        return "User{id=" + id + ", name='" + name + "'}";
    }
}

// Simulated ServletContext
class SimulatedServletContext {
    private Map<String, Object> attributes = new HashMap<>();
    
    public void setAttribute(String name, Object value) {
        attributes.put(name, value);
    }
    
    public Object getAttribute(String name) {
        return attributes.get(name);
    }
}

// Simulated ServletConfig
class SimulatedServletConfig {
    private String servletName;
    private SimulatedServletContext context;
    private Map<String, String> initParams = new HashMap<>();
    
    SimulatedServletConfig(String name, SimulatedServletContext context) {
        this.servletName = name;
        this.context = context;
    }
    
    public String getServletName() { return servletName; }
    public SimulatedServletContext getServletContext() { return context; }
    
    public void setInitParameter(String name, String value) {
        initParams.put(name, value);
    }
    
    public String getInitParameter(String name) {
        return initParams.get(name);
    }
    
    public Set<String> getInitParameterNames() {
        return initParams.keySet();
    }
}

// Simulated HttpServletRequest
class SimulatedHttpRequest {
    private String method;
    private String requestURI;
    private Map<String, String> parameters = new HashMap<>();
    private Map<String, String> headers = new HashMap<>();
    private Map<String, Object> attributes = new HashMap<>();
    private SimulatedHttpSession session;
    
    public void setMethod(String method) { this.method = method; }
    public String getMethod() { return method; }
    
    public void setRequestURI(String uri) { this.requestURI = uri; }
    public String getRequestURI() { return requestURI; }
    
    public void setParameter(String name, String value) { parameters.put(name, value); }
    public String getParameter(String name) { return parameters.get(name); }
    
    public void setHeader(String name, String value) { headers.put(name, value); }
    public String getHeader(String name) { return headers.get(name); }
    
    public void setAttribute(String name, Object value) { attributes.put(name, value); }
    public Object getAttribute(String name) { return attributes.get(name); }
    
    public SimulatedHttpSession getSession() {
        if (session == null) {
            session = new SimulatedHttpSession();
        }
        return session;
    }
}

// Simulated HttpServletResponse
class SimulatedHttpResponse {
    private String contentType;
    private String characterEncoding;
    private int status;
    private Map<String, String> headers = new HashMap<>();
    
    public void setContentType(String type) { this.contentType = type; }
    public String getContentType() { return contentType; }
    
    public void setCharacterEncoding(String encoding) { this.characterEncoding = encoding; }
    public String getCharacterEncoding() { return characterEncoding; }
    
    public void setStatus(int status) { this.status = status; }
    public int getStatus() { return status; }
    
    public void setHeader(String name, String value) { headers.put(name, value); }
}

// Simulated HttpSession
class SimulatedHttpSession {
    private String id = "SESSION_" + System.currentTimeMillis();
    private Map<String, Object> attributes = new HashMap<>();
    
    public String getId() { return id; }
    
    public void setAttribute(String name, Object value) { attributes.put(name, value); }
    public Object getAttribute(String name) { return attributes.get(name); }
}`,
  practiceQuestions: [
    {
      question: 'Create a request handler that processes form data',
      hint: 'Extract parameters, validate, and prepare response',
      starterCode: `import java.util.*;

public class FormHandlerDemo {
    public static void main(String[] args) {
        System.out.println("=== Form Handler Demo ===\\n");
        
        FormHandler handler = new FormHandler();
        
        // Simulate form submission
        Map<String, String> formData = new HashMap<>();
        formData.put("username", "john_doe");
        formData.put("email", "john@email.com");
        formData.put("age", "25");
        formData.put("country", "USA");
        
        System.out.println("Form Data Received:");
        formData.forEach((k, v) -> System.out.println("  " + k + ": " + v));
        System.out.println();
        
        // Process form
        FormResult result = handler.processForm(formData);
        
        System.out.println("Processing Result:");
        System.out.println("  Success: " + result.isSuccess());
        System.out.println("  Message: " + result.getMessage());
        if (!result.getErrors().isEmpty()) {
            System.out.println("  Errors:");
            result.getErrors().forEach(e -> System.out.println("    - " + e));
        }
    }
}

class FormHandler {
    public FormResult processForm(Map<String, String> params) {
        List<String> errors = new ArrayList<>();
        
        // Validate username
        String username = params.get("username");
        if (username == null || username.length() < 3) {
            errors.add("Username must be at least 3 characters");
        }
        
        // Validate email
        String email = params.get("email");
        if (email == null || !email.contains("@")) {
            errors.add("Invalid email format");
        }
        
        // Validate age
        String ageStr = params.get("age");
        try {
            int age = Integer.parseInt(ageStr);
            if (age < 18 || age > 120) {
                errors.add("Age must be between 18 and 120");
            }
        } catch (NumberFormatException e) {
            errors.add("Age must be a number");
        }
        
        if (errors.isEmpty()) {
            return new FormResult(true, "Form submitted successfully!", errors);
        } else {
            return new FormResult(false, "Validation failed", errors);
        }
    }
}

class FormResult {
    private boolean success;
    private String message;
    private List<String> errors;
    
    FormResult(boolean success, String message, List<String> errors) {
        this.success = success;
        this.message = message;
        this.errors = errors;
    }
    
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public List<String> getErrors() { return errors; }
}`
    }
  ]
};

export default servletAPI;
