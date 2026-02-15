const servletLifecycle = {
  id: 'servlet-lifecycle',
  title: 'Servlet Lifecycle',
  description: 'Understanding how servlets are born, live, and die',
  content: `
# Servlet Lifecycle — From Birth to Death

Every servlet goes through a predictable lifecycle managed by the servlet container (like Tomcat). Understanding this lifecycle helps you write efficient servlets and avoid common pitfalls.

---

## The Three Phases

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    SERVLET LIFECYCLE                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   1. LOADING & INSTANTIATION                            │
│      └── Container loads servlet class                  │
│      └── Creates single instance                        │
│                                                          │
│   2. INITIALIZATION                                      │
│      └── init() called ONCE                             │
│      └── Read config, setup resources                   │
│                                                          │
│   3. REQUEST HANDLING (repeated)                        │
│      └── service() → doGet()/doPost()                   │
│      └── Called for EVERY request                       │
│                                                          │
│   4. DESTRUCTION                                         │
│      └── destroy() called ONCE                          │
│      └── Cleanup resources                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Phase 1: Loading and Instantiation

When does the container load a servlet?

1. **On first request** — Default behavior (lazy loading)
2. **On startup** — If \`load-on-startup\` is configured
3. **When container decides** — Based on configuration

\`\`\`xml
<!-- Load on startup with priority 1 -->
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>com.example.MyServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
\`\`\`

**Key point:** Only ONE instance of each servlet is created. This instance handles ALL requests.

---

## Phase 2: Initialization — init()

Called exactly ONCE after instantiation:

\`\`\`java
public class MyServlet extends HttpServlet {
    private DatabaseConnection dbConnection;
    
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet initializing...");
        
        // One-time setup
        dbConnection = new DatabaseConnection();
        
        // Read init parameters
        String configValue = getServletConfig().getInitParameter("configKey");
    }
}
\`\`\`

### init() with ServletConfig

\`\`\`java
@Override
public void init(ServletConfig config) throws ServletException {
    super.init(config);  // Important! Call super
    
    String dbUrl = config.getInitParameter("dbUrl");
    String dbUser = config.getInitParameter("dbUser");
}
\`\`\`

**Use init() for:**
- Database connection setup
- Loading configuration
- Initializing expensive resources
- One-time calculations

---

## Phase 3: Request Handling — service()

Called for EVERY request:

\`\`\`
Client Request
      ↓
  service()
      ↓
  ┌─────────────────┐
  │ Check HTTP      │
  │ Method          │
  └────────┬────────┘
           │
     ┌─────┴─────┐
     ↓           ↓
  doGet()    doPost()
     ↓           ↓
  Response    Response
\`\`\`

### The service() Method

\`\`\`java
// You usually don't override this
protected void service(HttpServletRequest req, HttpServletResponse resp) {
    String method = req.getMethod();
    
    if (method.equals("GET")) {
        doGet(req, resp);
    } else if (method.equals("POST")) {
        doPost(req, resp);
    } else if (method.equals("PUT")) {
        doPut(req, resp);
    } else if (method.equals("DELETE")) {
        doDelete(req, resp);
    }
    // ... other methods
}
\`\`\`

### Override doGet() and doPost()

\`\`\`java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<h1>Hello from GET!</h1>");
}

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    
    String username = request.getParameter("username");
    // Process form data
}
\`\`\`

---

## Phase 4: Destruction — destroy()

Called exactly ONCE when servlet is being removed:

\`\`\`java
@Override
public void destroy() {
    System.out.println("Servlet shutting down...");
    
    // Cleanup resources
    if (dbConnection != null) {
        dbConnection.close();
    }
    
    // Release any held resources
    // Save state if needed
}
\`\`\`

**When is destroy() called?**
- Server shutdown
- Application undeployed
- Servlet removed from container

---

## Complete Lifecycle Example

\`\`\`java
public class LifecycleServlet extends HttpServlet {
    private int requestCount = 0;
    
    @Override
    public void init() throws ServletException {
        System.out.println("=== INIT: Servlet created ===");
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        requestCount++;  // Shared across all requests!
        
        System.out.println("=== SERVICE: Request #" + requestCount + " ===");
        System.out.println("Thread: " + Thread.currentThread().getName());
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Request Count: " + requestCount + "</h1>");
    }
    
    @Override
    public void destroy() {
        System.out.println("=== DESTROY: Servlet removed ===");
        System.out.println("Total requests served: " + requestCount);
    }
}
\`\`\`

---

## Thread Safety Warning!

Since ONE servlet instance handles ALL requests:

\`\`\`java
// DANGEROUS! Instance variable shared across threads
public class UnsafeServlet extends HttpServlet {
    private int counter = 0;  // Shared!
    
    protected void doGet(...) {
        counter++;  // Race condition!
    }
}

// SAFE! Local variables are thread-safe
public class SafeServlet extends HttpServlet {
    protected void doGet(...) {
        int counter = 0;  // Each request has its own
        counter++;
    }
}
\`\`\`

**Rules:**
- Avoid instance variables for request-specific data
- Use local variables inside doGet/doPost
- If you must use instance variables, synchronize access

---

## Lifecycle Methods Summary

| Method | Called | Purpose |
|--------|--------|---------|
| init() | Once | Setup resources |
| service() | Every request | Route to doXxx() |
| doGet() | GET requests | Handle GET |
| doPost() | POST requests | Handle POST |
| destroy() | Once | Cleanup resources |

---

## Real-World Example: Connection Pool

\`\`\`java
public class DatabaseServlet extends HttpServlet {
    private DataSource dataSource;
    
    @Override
    public void init() throws ServletException {
        try {
            // Initialize connection pool once
            Context ctx = new InitialContext();
            dataSource = (DataSource) ctx.lookup("java:comp/env/jdbc/mydb");
            System.out.println("Connection pool initialized");
        } catch (NamingException e) {
            throw new ServletException("Cannot initialize database", e);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get connection from pool for each request
        try (Connection conn = dataSource.getConnection()) {
            // Use connection
            // Connection returns to pool automatically
        } catch (SQLException e) {
            throw new ServletException("Database error", e);
        }
    }
    
    @Override
    public void destroy() {
        // Connection pool handles cleanup
        System.out.println("Servlet destroyed");
    }
}
\`\`\`
`,
  code: `// Servlet Lifecycle Demo
// Note: This is a simulation - actual servlets run in a container like Tomcat

public class ServletLifecycleDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Lifecycle Demo ===\\n");
        
        // Simulate servlet container behavior
        ServletContainer container = new ServletContainer();
        
        // 1. LOADING AND INSTANTIATION
        System.out.println("1. LOADING AND INSTANTIATION");
        System.out.println("   --------------------------");
        container.loadServlet("MyServlet");
        System.out.println();
        
        // 2. INITIALIZATION
        System.out.println("2. INITIALIZATION");
        System.out.println("   ---------------");
        container.initServlet("MyServlet");
        System.out.println();
        
        // 3. REQUEST HANDLING
        System.out.println("3. REQUEST HANDLING");
        System.out.println("   -----------------");
        
        // Simulate multiple requests
        container.handleRequest("MyServlet", "GET", "/users");
        container.handleRequest("MyServlet", "POST", "/users");
        container.handleRequest("MyServlet", "GET", "/users/1");
        container.handleRequest("MyServlet", "DELETE", "/users/1");
        System.out.println();
        
        // 4. DESTRUCTION
        System.out.println("4. DESTRUCTION");
        System.out.println("   -----------");
        container.destroyServlet("MyServlet");
        System.out.println();
        
        // Summary
        System.out.println("=== LIFECYCLE SUMMARY ===");
        System.out.println("• init() called: 1 time");
        System.out.println("• service() called: 4 times");
        System.out.println("• destroy() called: 1 time");
    }
}

// Simulated Servlet
class SimulatedServlet {
    private String name;
    private int requestCount = 0;
    private boolean initialized = false;
    
    public SimulatedServlet(String name) {
        this.name = name;
        System.out.println("   [" + name + "] Constructor called");
        System.out.println("   Instance created (only ONE instance!)");
    }
    
    public void init() {
        System.out.println("   [" + name + "] init() called");
        System.out.println("   Loading configuration...");
        System.out.println("   Setting up database connection...");
        System.out.println("   Initialization complete!");
        initialized = true;
    }
    
    public void service(String method, String path) {
        requestCount++;
        System.out.println("   [" + name + "] service() - Request #" + requestCount);
        System.out.println("   Method: " + method + ", Path: " + path);
        
        switch (method) {
            case "GET":
                doGet(path);
                break;
            case "POST":
                doPost(path);
                break;
            case "PUT":
                doPut(path);
                break;
            case "DELETE":
                doDelete(path);
                break;
        }
    }
    
    private void doGet(String path) {
        System.out.println("   → doGet() handling GET request");
    }
    
    private void doPost(String path) {
        System.out.println("   → doPost() handling POST request");
    }
    
    private void doPut(String path) {
        System.out.println("   → doPut() handling PUT request");
    }
    
    private void doDelete(String path) {
        System.out.println("   → doDelete() handling DELETE request");
    }
    
    public void destroy() {
        System.out.println("   [" + name + "] destroy() called");
        System.out.println("   Closing database connections...");
        System.out.println("   Releasing resources...");
        System.out.println("   Total requests served: " + requestCount);
        System.out.println("   Servlet destroyed!");
    }
}

// Simulated Servlet Container
class ServletContainer {
    private java.util.Map<String, SimulatedServlet> servlets = new java.util.HashMap<>();
    
    public void loadServlet(String name) {
        System.out.println("   Container loading servlet: " + name);
        SimulatedServlet servlet = new SimulatedServlet(name);
        servlets.put(name, servlet);
    }
    
    public void initServlet(String name) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.init();
        }
    }
    
    public void handleRequest(String name, String method, String path) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.service(method, path);
        }
    }
    
    public void destroyServlet(String name) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.destroy();
            servlets.remove(name);
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a servlet that tracks visitor count using lifecycle methods',
      hint: 'Use init() to load count, service() to increment, destroy() to save',
      starterCode: `// Visitor Counter Servlet Simulation

public class VisitorCounterDemo {
    public static void main(String[] args) {
        System.out.println("=== Visitor Counter Servlet ===\\n");
        
        VisitorCounterServlet servlet = new VisitorCounterServlet();
        
        // Lifecycle
        servlet.init();
        
        // Simulate visits
        for (int i = 0; i < 5; i++) {
            servlet.doGet();
        }
        
        servlet.destroy();
    }
}

class VisitorCounterServlet {
    private int visitorCount = 0;
    private String servletName = "VisitorCounter";
    
    public void init() {
        System.out.println("[INIT] " + servletName + " starting...");
        // In real servlet, load count from file/database
        visitorCount = loadCountFromStorage();
        System.out.println("[INIT] Loaded previous count: " + visitorCount);
        System.out.println();
    }
    
    public void doGet() {
        visitorCount++;
        System.out.println("[SERVICE] Visitor #" + visitorCount + " - Welcome!");
        // In real servlet, send HTML response
    }
    
    public void destroy() {
        System.out.println();
        System.out.println("[DESTROY] " + servletName + " shutting down...");
        // In real servlet, save count to file/database
        saveCountToStorage(visitorCount);
        System.out.println("[DESTROY] Saved final count: " + visitorCount);
    }
    
    // Simulated storage methods
    private int loadCountFromStorage() {
        // Simulate loading from file
        return 100; // Pretend we had 100 visitors before
    }
    
    private void saveCountToStorage(int count) {
        // Simulate saving to file
        System.out.println("[STORAGE] Count " + count + " saved to database");
    }
}`
    }
  ]
};

export default servletLifecycle;
