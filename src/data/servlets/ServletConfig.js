const servletConfig = {
  id: 'servlet-config',
  title: 'ServletConfig & ServletContext',
  description: 'Configuration objects for servlets and applications',
  content: `
# ServletConfig & ServletContext — Configuration Made Easy

Every servlet needs configuration. Whether it's database URLs, email addresses, or feature flags, you need a way to externalize settings. That's where ServletConfig and ServletContext come in.

---

## ServletConfig vs ServletContext

| Feature | ServletConfig | ServletContext |
|---------|---------------|----------------|
| Scope | Single servlet | Entire application |
| Access | Only that servlet | All servlets |
| Use case | Servlet-specific settings | App-wide settings |
| Defined in | \`<servlet>\` tag | \`<context-param>\` tag |

---

## ServletConfig — Servlet-Specific Configuration

### Defining Init Parameters

**web.xml:**
\`\`\`xml
<servlet>
    <servlet-name>EmailServlet</servlet-name>
    <servlet-class>com.example.EmailServlet</servlet-class>
    <init-param>
        <param-name>smtpHost</param-name>
        <param-value>smtp.gmail.com</param-value>
    </init-param>
    <init-param>
        <param-name>smtpPort</param-name>
        <param-value>587</param-value>
    </init-param>
    <init-param>
        <param-name>adminEmail</param-name>
        <param-value>admin@company.com</param-value>
    </init-param>
</servlet>
\`\`\`

### Using Annotations

\`\`\`java
@WebServlet(
    urlPatterns = "/email",
    initParams = {
        @WebInitParam(name = "smtpHost", value = "smtp.gmail.com"),
        @WebInitParam(name = "smtpPort", value = "587"),
        @WebInitParam(name = "adminEmail", value = "admin@company.com")
    }
)
public class EmailServlet extends HttpServlet {
    // ...
}
\`\`\`

### Accessing Init Parameters

\`\`\`java
public class EmailServlet extends HttpServlet {
    private String smtpHost;
    private int smtpPort;
    private String adminEmail;
    
    @Override
    public void init() throws ServletException {
        ServletConfig config = getServletConfig();
        
        // Get individual parameters
        smtpHost = config.getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(config.getInitParameter("smtpPort"));
        adminEmail = config.getInitParameter("adminEmail");
        
        // Or iterate all parameters
        Enumeration<String> names = config.getInitParameterNames();
        while (names.hasMoreElements()) {
            String name = names.nextElement();
            String value = config.getInitParameter(name);
            System.out.println(name + " = " + value);
        }
    }
}
\`\`\`

---

## ServletContext — Application-Wide Configuration

### Defining Context Parameters

**web.xml:**
\`\`\`xml
<web-app>
    <context-param>
        <param-name>appName</param-name>
        <param-value>My E-Commerce App</param-value>
    </context-param>
    <context-param>
        <param-name>dbUrl</param-name>
        <param-value>jdbc:mysql://localhost:3306/ecommerce</param-value>
    </context-param>
    <context-param>
        <param-name>maxUploadSize</param-name>
        <param-value>10485760</param-value>
    </context-param>
</web-app>
\`\`\`

### Accessing Context Parameters

\`\`\`java
public class AppServlet extends HttpServlet {
    
    @Override
    public void init() throws ServletException {
        ServletContext context = getServletContext();
        
        // Get context parameters
        String appName = context.getInitParameter("appName");
        String dbUrl = context.getInitParameter("dbUrl");
        
        System.out.println("Application: " + appName);
        System.out.println("Database: " + dbUrl);
    }
}
\`\`\`

---

## ServletContext Capabilities

### 1. Application Attributes

\`\`\`java
// Set application-wide data
ServletContext context = getServletContext();

// Store shared objects
context.setAttribute("connectionPool", connectionPool);
context.setAttribute("cacheManager", cacheManager);
context.setAttribute("visitorCount", 0);

// Retrieve in any servlet
ConnectionPool pool = (ConnectionPool) context.getAttribute("connectionPool");

// Remove when done
context.removeAttribute("tempData");
\`\`\`

### 2. Real Path

\`\`\`java
// Get actual file system path
String configPath = context.getRealPath("/WEB-INF/config.properties");
String uploadPath = context.getRealPath("/uploads");

// Load properties file
Properties props = new Properties();
props.load(new FileInputStream(configPath));
\`\`\`

### 3. Resource Access

\`\`\`java
// Get resource as stream
InputStream is = context.getResourceAsStream("/WEB-INF/data.xml");

// Get resource URL
URL url = context.getResource("/images/logo.png");
\`\`\`

### 4. Request Dispatcher

\`\`\`java
// Forward to another resource
RequestDispatcher dispatcher = context.getRequestDispatcher("/result.jsp");
dispatcher.forward(request, response);
\`\`\`

### 5. Logging

\`\`\`java
// Log to server log
context.log("Application started");
context.log("Error occurred", exception);
\`\`\`

---

## Real-World Example: Database Configuration

\`\`\`java
@WebServlet("/products")
public class ProductServlet extends HttpServlet {
    private DataSource dataSource;
    
    @Override
    public void init() throws ServletException {
        ServletContext context = getServletContext();
        
        // Get database configuration
        String dbUrl = context.getInitParameter("dbUrl");
        String dbUser = context.getInitParameter("dbUser");
        String dbPassword = context.getInitParameter("dbPassword");
        
        // Check if connection pool already exists
        dataSource = (DataSource) context.getAttribute("dataSource");
        
        if (dataSource == null) {
            // Create connection pool
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(dbUrl);
            config.setUsername(dbUser);
            config.setPassword(dbPassword);
            
            dataSource = new HikariDataSource(config);
            
            // Share with other servlets
            context.setAttribute("dataSource", dataSource);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try (Connection conn = dataSource.getConnection()) {
            // Use connection
        }
    }
}
\`\`\`

---

## Real-World Example: Feature Flags

\`\`\`java
@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
    private boolean newCheckoutEnabled;
    private boolean paypalEnabled;
    private boolean stripeEnabled;
    
    @Override
    public void init() throws ServletException {
        ServletConfig config = getServletConfig();
        
        // Read feature flags
        newCheckoutEnabled = Boolean.parseBoolean(
            config.getInitParameter("newCheckoutEnabled"));
        paypalEnabled = Boolean.parseBoolean(
            config.getInitParameter("paypalEnabled"));
        stripeEnabled = Boolean.parseBoolean(
            config.getInitParameter("stripeEnabled"));
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        if (newCheckoutEnabled) {
            // Use new checkout flow
            processNewCheckout(request, response);
        } else {
            // Use legacy checkout
            processLegacyCheckout(request, response);
        }
    }
}
\`\`\`

---

## Best Practices

### 1. Use Context for Shared Resources

\`\`\`java
// Good: Share expensive resources
context.setAttribute("connectionPool", pool);
context.setAttribute("cacheManager", cache);

// Bad: Create per-servlet
private ConnectionPool pool = new ConnectionPool(); // Wasteful!
\`\`\`

### 2. Initialize in Listeners

\`\`\`java
@WebListener
public class AppInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        
        // Initialize shared resources
        ConnectionPool pool = new ConnectionPool();
        context.setAttribute("connectionPool", pool);
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Cleanup
        ConnectionPool pool = (ConnectionPool) 
            sce.getServletContext().getAttribute("connectionPool");
        pool.close();
    }
}
\`\`\`

### 3. Externalize Configuration

\`\`\`java
// Load from properties file
public void init() throws ServletException {
    String configPath = getServletContext().getRealPath("/WEB-INF/app.properties");
    Properties props = new Properties();
    props.load(new FileInputStream(configPath));
    
    // Use properties
    String dbUrl = props.getProperty("db.url");
}
\`\`\`
`,
  code: `// ServletConfig & ServletContext Demo
// Demonstrates configuration management in servlets

import java.util.*;

public class ServletConfigDemo {
    public static void main(String[] args) {
        System.out.println("=== ServletConfig & ServletContext Demo ===\\n");
        
        // Create application context (application-wide)
        SimulatedServletContext appContext = new SimulatedServletContext();
        
        // Set context parameters (from web.xml <context-param>)
        appContext.setInitParameter("appName", "E-Commerce Platform");
        appContext.setInitParameter("dbUrl", "jdbc:mysql://localhost:3306/ecommerce");
        appContext.setInitParameter("dbUser", "admin");
        appContext.setInitParameter("maxUploadSize", "10485760");
        appContext.setInitParameter("maintenanceMode", "false");
        
        System.out.println("1. SERVLET CONTEXT (Application-Wide)");
        System.out.println("   -----------------------------------");
        System.out.println("   Context Parameters (from web.xml):");
        for (String name : appContext.getInitParameterNames()) {
            System.out.println("     " + name + " = " + appContext.getInitParameter(name));
        }
        System.out.println();
        
        // Create servlet configs (servlet-specific)
        System.out.println("2. SERVLET CONFIG (Servlet-Specific)");
        System.out.println("   ----------------------------------");
        
        // Email Servlet Config
        SimulatedServletConfig emailConfig = new SimulatedServletConfig("EmailServlet", appContext);
        emailConfig.setInitParameter("smtpHost", "smtp.gmail.com");
        emailConfig.setInitParameter("smtpPort", "587");
        emailConfig.setInitParameter("adminEmail", "admin@company.com");
        
        System.out.println("   EmailServlet Config:");
        System.out.println("     Servlet Name: " + emailConfig.getServletName());
        for (String name : emailConfig.getInitParameterNames()) {
            System.out.println("     " + name + " = " + emailConfig.getInitParameter(name));
        }
        System.out.println();
        
        // Payment Servlet Config
        SimulatedServletConfig paymentConfig = new SimulatedServletConfig("PaymentServlet", appContext);
        paymentConfig.setInitParameter("stripeEnabled", "true");
        paymentConfig.setInitParameter("paypalEnabled", "true");
        paymentConfig.setInitParameter("maxRetries", "3");
        
        System.out.println("   PaymentServlet Config:");
        System.out.println("     Servlet Name: " + paymentConfig.getServletName());
        for (String name : paymentConfig.getInitParameterNames()) {
            System.out.println("     " + name + " = " + paymentConfig.getInitParameter(name));
        }
        System.out.println();
        
        // 3. APPLICATION ATTRIBUTES
        System.out.println("3. APPLICATION ATTRIBUTES (Shared State)");
        System.out.println("   --------------------------------------");
        
        // Simulate shared resources
        appContext.setAttribute("visitorCount", 0);
        appContext.setAttribute("connectionPool", "HikariCP[10 connections]");
        appContext.setAttribute("cacheManager", "EhCache[1000 entries]");
        
        System.out.println("   Shared Resources:");
        System.out.println("     connectionPool: " + appContext.getAttribute("connectionPool"));
        System.out.println("     cacheManager: " + appContext.getAttribute("cacheManager"));
        System.out.println("     visitorCount: " + appContext.getAttribute("visitorCount"));
        System.out.println();
        
        // 4. SIMULATING SERVLET INITIALIZATION
        System.out.println("4. SERVLET INITIALIZATION");
        System.out.println("   -----------------------");
        
        EmailServlet emailServlet = new EmailServlet();
        emailServlet.init(emailConfig);
        System.out.println();
        
        PaymentServlet paymentServlet = new PaymentServlet();
        paymentServlet.init(paymentConfig);
        System.out.println();
        
        // 5. UPDATING VISITOR COUNT
        System.out.println("5. SHARED STATE UPDATES");
        System.out.println("   ---------------------");
        
        // Simulate visitors
        for (int i = 0; i < 5; i++) {
            int count = (int) appContext.getAttribute("visitorCount");
            appContext.setAttribute("visitorCount", count + 1);
        }
        System.out.println("   After 5 visitors: " + appContext.getAttribute("visitorCount"));
        System.out.println();
        
        // 6. REAL PATH SIMULATION
        System.out.println("6. REAL PATH (File System Access)");
        System.out.println("   --------------------------------");
        System.out.println("   getRealPath('/WEB-INF/config.properties'):");
        System.out.println("     -> " + appContext.getRealPath("/WEB-INF/config.properties"));
        System.out.println("   getRealPath('/uploads'):");
        System.out.println("     -> " + appContext.getRealPath("/uploads"));
        System.out.println();
        
        // 7. COMPARISON TABLE
        System.out.println("7. COMPARISON: ServletConfig vs ServletContext");
        System.out.println("   ---------------------------------------------");
        System.out.println("   | Feature        | ServletConfig | ServletContext |");
        System.out.println("   |----------------|---------------|----------------|");
        System.out.println("   | Scope          | One servlet   | All servlets   |");
        System.out.println("   | Defined in     | <servlet>     | <context-param>|");
        System.out.println("   | Access         | getServletConfig() | getServletContext() |");
        System.out.println("   | Attributes     | No            | Yes            |");
        System.out.println("   | Use case       | Servlet settings | App settings |");
    }
}

// Simulated ServletContext
class SimulatedServletContext {
    private Map<String, String> initParams = new HashMap<>();
    private Map<String, Object> attributes = new HashMap<>();
    private String contextPath = "/myapp";
    
    public void setInitParameter(String name, String value) {
        initParams.put(name, value);
    }
    
    public String getInitParameter(String name) {
        return initParams.get(name);
    }
    
    public Set<String> getInitParameterNames() {
        return initParams.keySet();
    }
    
    public void setAttribute(String name, Object value) {
        attributes.put(name, value);
    }
    
    public Object getAttribute(String name) {
        return attributes.get(name);
    }
    
    public void removeAttribute(String name) {
        attributes.remove(name);
    }
    
    public String getRealPath(String path) {
        return "/var/www/tomcat/webapps/myapp" + path;
    }
    
    public void log(String message) {
        System.out.println("[SERVER LOG] " + message);
    }
}

// Simulated ServletConfig
class SimulatedServletConfig {
    private String servletName;
    private SimulatedServletContext context;
    private Map<String, String> initParams = new HashMap<>();
    
    public SimulatedServletConfig(String name, SimulatedServletContext context) {
        this.servletName = name;
        this.context = context;
    }
    
    public String getServletName() {
        return servletName;
    }
    
    public SimulatedServletContext getServletContext() {
        return context;
    }
    
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

// Simulated Email Servlet
class EmailServlet {
    private String smtpHost;
    private int smtpPort;
    private String adminEmail;
    
    public void init(SimulatedServletConfig config) {
        System.out.println("   Initializing EmailServlet...");
        
        // Get servlet-specific config
        smtpHost = config.getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(config.getInitParameter("smtpPort"));
        adminEmail = config.getInitParameter("adminEmail");
        
        // Get app-wide config
        SimulatedServletContext context = config.getServletContext();
        String appName = context.getInitParameter("appName");
        
        System.out.println("     SMTP Host: " + smtpHost);
        System.out.println("     SMTP Port: " + smtpPort);
        System.out.println("     Admin Email: " + adminEmail);
        System.out.println("     App Name (from context): " + appName);
        System.out.println("   EmailServlet initialized!");
    }
}

// Simulated Payment Servlet
class PaymentServlet {
    private boolean stripeEnabled;
    private boolean paypalEnabled;
    private int maxRetries;
    
    public void init(SimulatedServletConfig config) {
        System.out.println("   Initializing PaymentServlet...");
        
        // Get servlet-specific config
        stripeEnabled = Boolean.parseBoolean(config.getInitParameter("stripeEnabled"));
        paypalEnabled = Boolean.parseBoolean(config.getInitParameter("paypalEnabled"));
        maxRetries = Integer.parseInt(config.getInitParameter("maxRetries"));
        
        // Get shared resources from context
        SimulatedServletContext context = config.getServletContext();
        String dbUrl = context.getInitParameter("dbUrl");
        
        System.out.println("     Stripe Enabled: " + stripeEnabled);
        System.out.println("     PayPal Enabled: " + paypalEnabled);
        System.out.println("     Max Retries: " + maxRetries);
        System.out.println("     Database (from context): " + dbUrl);
        System.out.println("   PaymentServlet initialized!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a configuration manager that loads settings from different sources',
      hint: 'Combine init params, context params, and properties files',
      starterCode: `import java.util.*;

public class ConfigManagerDemo {
    public static void main(String[] args) {
        System.out.println("=== Configuration Manager Demo ===\\n");
        
        ConfigManager config = new ConfigManager();
        
        // Load from different sources
        config.loadContextParams(Map.of(
            "app.name", "MyApp",
            "app.version", "1.0.0",
            "db.url", "jdbc:mysql://localhost:3306/mydb"
        ));
        
        config.loadServletParams(Map.of(
            "cache.enabled", "true",
            "cache.ttl", "3600"
        ));
        
        config.loadProperties(Map.of(
            "email.host", "smtp.gmail.com",
            "email.port", "587"
        ));
        
        // Display all configuration
        System.out.println("All Configuration:");
        config.getAllConfig().forEach((k, v) -> 
            System.out.println("  " + k + " = " + v));
        System.out.println();
        
        // Get typed values
        System.out.println("Typed Access:");
        System.out.println("  app.name (String): " + config.getString("app.name"));
        System.out.println("  cache.enabled (Boolean): " + config.getBoolean("cache.enabled"));
        System.out.println("  cache.ttl (Integer): " + config.getInt("cache.ttl"));
        System.out.println("  email.port (Integer): " + config.getInt("email.port"));
    }
}

class ConfigManager {
    private Map<String, String> config = new HashMap<>();
    
    public void loadContextParams(Map<String, String> params) {
        config.putAll(params);
    }
    
    public void loadServletParams(Map<String, String> params) {
        config.putAll(params);
    }
    
    public void loadProperties(Map<String, String> props) {
        config.putAll(props);
    }
    
    public Map<String, String> getAllConfig() {
        return new HashMap<>(config);
    }
    
    public String getString(String key) {
        return config.get(key);
    }
    
    public boolean getBoolean(String key) {
        return Boolean.parseBoolean(config.get(key));
    }
    
    public int getInt(String key) {
        return Integer.parseInt(config.get(key));
    }
}`
    }
  ]
};

export default servletConfig;
