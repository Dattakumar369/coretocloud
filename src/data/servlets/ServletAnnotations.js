const servletAnnotations = {
  id: 'servlet-annotations',
  title: 'Servlet Annotations',
  description: 'Modern annotation-based servlet configuration',
  content: `
# Servlet Annotations — Configuration Without XML

Before Servlet 3.0, every servlet needed to be configured in web.xml. Now, with annotations, you can configure servlets directly in your Java code. It's cleaner, easier to maintain, and keeps configuration close to the code it configures.

---

## @WebServlet — The Main Annotation

### Basic Usage

\`\`\`java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.getWriter().println("Hello, World!");
    }
}
\`\`\`

### Multiple URL Patterns

\`\`\`java
@WebServlet(urlPatterns = {"/users", "/user", "/api/users"})
public class UserServlet extends HttpServlet {
    // Handles all three URLs
}
\`\`\`

### Full Configuration

\`\`\`java
@WebServlet(
    name = "UserServlet",
    urlPatterns = {"/users", "/api/users"},
    loadOnStartup = 1,
    initParams = {
        @WebInitParam(name = "dbUrl", value = "jdbc:mysql://localhost/mydb"),
        @WebInitParam(name = "maxResults", value = "100")
    },
    asyncSupported = true
)
public class UserServlet extends HttpServlet {
    // Full configuration in one place
}
\`\`\`

### @WebServlet Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| name | Servlet name | "UserServlet" |
| urlPatterns | URL mappings | {"/users", "/api/users"} |
| value | Shortcut for urlPatterns | "/users" |
| loadOnStartup | Load order (0+) | 1 |
| initParams | Init parameters | @WebInitParam array |
| asyncSupported | Enable async | true |

---

## @WebFilter — Filter Annotation

### Basic Filter

\`\`\`java
@WebFilter("/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        System.out.println("Request received: " + ((HttpServletRequest) request).getRequestURI());
        chain.doFilter(request, response);
        System.out.println("Response sent");
    }
}
\`\`\`

### Filter with Configuration

\`\`\`java
@WebFilter(
    filterName = "AuthFilter",
    urlPatterns = {"/admin/*", "/api/*"},
    initParams = {
        @WebInitParam(name = "excludePaths", value = "/api/public")
    },
    dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD}
)
public class AuthenticationFilter implements Filter {
    // Filter configuration
}
\`\`\`

---

## @WebListener — Listener Annotation

### Context Listener

\`\`\`java
@WebListener
public class AppInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application starting...");
        // Initialize resources
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Application shutting down...");
        // Cleanup resources
    }
}
\`\`\`

### Session Listener

\`\`\`java
@WebListener
public class SessionTracker implements HttpSessionListener {
    private static int activeSessions = 0;
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        activeSessions++;
        System.out.println("Session created. Active: " + activeSessions);
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        activeSessions--;
        System.out.println("Session destroyed. Active: " + activeSessions);
    }
}
\`\`\`

---

## @WebInitParam — Init Parameters

\`\`\`java
@WebServlet(
    urlPatterns = "/email",
    initParams = {
        @WebInitParam(name = "smtpHost", value = "smtp.gmail.com"),
        @WebInitParam(name = "smtpPort", value = "587"),
        @WebInitParam(name = "timeout", value = "30000")
    }
)
public class EmailServlet extends HttpServlet {
    private String smtpHost;
    private int smtpPort;
    
    @Override
    public void init() throws ServletException {
        smtpHost = getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(getInitParameter("smtpPort"));
    }
}
\`\`\`

---

## @MultipartConfig — File Upload

\`\`\`java
@WebServlet("/upload")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,      // 1 MB
    maxFileSize = 1024 * 1024 * 10,        // 10 MB
    maxRequestSize = 1024 * 1024 * 50,     // 50 MB
    location = "/tmp"
)
public class FileUploadServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();
        
        // Save file
        filePart.write(fileName);
        
        response.getWriter().println("File uploaded: " + fileName);
    }
}
\`\`\`

---

## Annotations vs web.xml

### When to Use Annotations

- New projects
- Simple configurations
- When config should stay with code
- Rapid development

### When to Use web.xml

- Override annotation settings
- Third-party servlets (no source access)
- Environment-specific configuration
- Complex deployment scenarios

### Combining Both

\`\`\`java
// Annotation provides defaults
@WebServlet(
    name = "UserServlet",
    urlPatterns = "/users",
    initParams = @WebInitParam(name = "maxResults", value = "100")
)
public class UserServlet extends HttpServlet { }
\`\`\`

\`\`\`xml
<!-- web.xml can override -->
<servlet>
    <servlet-name>UserServlet</servlet-name>
    <init-param>
        <param-name>maxResults</param-name>
        <param-value>50</param-value>  <!-- Overrides annotation -->
    </init-param>
</servlet>
\`\`\`

---

## Complete Example: E-Commerce Application

\`\`\`java
// Main product servlet
@WebServlet(
    name = "ProductServlet",
    urlPatterns = {"/products", "/products/*"},
    loadOnStartup = 1,
    initParams = {
        @WebInitParam(name = "pageSize", value = "20"),
        @WebInitParam(name = "cacheEnabled", value = "true")
    }
)
public class ProductServlet extends HttpServlet {
    private int pageSize;
    private boolean cacheEnabled;
    
    @Override
    public void init() throws ServletException {
        pageSize = Integer.parseInt(getInitParameter("pageSize"));
        cacheEnabled = Boolean.parseBoolean(getInitParameter("cacheEnabled"));
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Handle product listing
    }
}

// Authentication filter
@WebFilter(
    filterName = "AuthFilter",
    urlPatterns = {"/cart/*", "/checkout/*", "/account/*"}
)
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpSession session = request.getSession(false);
        
        if (session == null || session.getAttribute("user") == null) {
            ((HttpServletResponse) res).sendRedirect("/login");
            return;
        }
        chain.doFilter(req, res);
    }
}

// Application initializer
@WebListener
public class AppInitializer implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Initialize database pool
        // Load configuration
        // Start background services
    }
}
\`\`\`
`,
  code: `// Servlet Annotations Demo
// Demonstrates annotation-based configuration

import java.util.*;

public class ServletAnnotationsDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Annotations Demo ===\\n");
        
        // Simulate annotation processing
        AnnotationProcessor processor = new AnnotationProcessor();
        
        // 1. @WEBSERVLET ANNOTATION
        System.out.println("1. @WebServlet ANNOTATION");
        System.out.println("   -----------------------");
        
        // Simulate servlet with annotations
        WebServletConfig helloConfig = new WebServletConfig();
        helloConfig.name = "HelloServlet";
        helloConfig.urlPatterns = new String[]{"/hello", "/hi"};
        helloConfig.loadOnStartup = 1;
        
        processor.registerServlet("HelloServlet", helloConfig);
        System.out.println();
        
        // Servlet with init params
        WebServletConfig userConfig = new WebServletConfig();
        userConfig.name = "UserServlet";
        userConfig.urlPatterns = new String[]{"/users", "/api/users"};
        userConfig.loadOnStartup = 2;
        userConfig.initParams.put("dbUrl", "jdbc:mysql://localhost/mydb");
        userConfig.initParams.put("maxResults", "100");
        userConfig.asyncSupported = true;
        
        processor.registerServlet("UserServlet", userConfig);
        System.out.println();
        
        // 2. @WEBFILTER ANNOTATION
        System.out.println("2. @WebFilter ANNOTATION");
        System.out.println("   ----------------------");
        
        WebFilterConfig loggingFilter = new WebFilterConfig();
        loggingFilter.filterName = "LoggingFilter";
        loggingFilter.urlPatterns = new String[]{"/*"};
        
        processor.registerFilter(loggingFilter);
        System.out.println();
        
        WebFilterConfig authFilter = new WebFilterConfig();
        authFilter.filterName = "AuthFilter";
        authFilter.urlPatterns = new String[]{"/admin/*", "/api/*"};
        authFilter.initParams.put("excludePaths", "/api/public,/api/health");
        
        processor.registerFilter(authFilter);
        System.out.println();
        
        // 3. @WEBLISTENER ANNOTATION
        System.out.println("3. @WebListener ANNOTATION");
        System.out.println("   ------------------------");
        
        processor.registerListener("AppInitializer", "ServletContextListener");
        processor.registerListener("SessionTracker", "HttpSessionListener");
        processor.registerListener("RequestLogger", "ServletRequestListener");
        System.out.println();
        
        // 4. @MULTIPARTCONFIG ANNOTATION
        System.out.println("4. @MultipartConfig ANNOTATION");
        System.out.println("   ----------------------------");
        
        MultipartConfig uploadConfig = new MultipartConfig();
        uploadConfig.fileSizeThreshold = 1024 * 1024;  // 1 MB
        uploadConfig.maxFileSize = 1024 * 1024 * 10;   // 10 MB
        uploadConfig.maxRequestSize = 1024 * 1024 * 50; // 50 MB
        uploadConfig.location = "/tmp/uploads";
        
        processor.registerMultipartServlet("FileUploadServlet", uploadConfig);
        System.out.println();
        
        // 5. ANNOTATION VS WEB.XML COMPARISON
        System.out.println("5. ANNOTATION VS WEB.XML");
        System.out.println("   ----------------------");
        System.out.println("   | Feature          | Annotation | web.xml |");
        System.out.println("   |------------------|------------|---------|");
        System.out.println("   | Location         | In code    | Separate|");
        System.out.println("   | Compile-time     | Yes        | No      |");
        System.out.println("   | Override         | No         | Yes     |");
        System.out.println("   | Third-party      | No         | Yes     |");
        System.out.println("   | Environment-spec | Hard       | Easy    |");
        System.out.println();
        
        // 6. SIMULATED SERVLET CONTAINER
        System.out.println("6. SIMULATED CONTAINER STARTUP");
        System.out.println("   ----------------------------");
        processor.startContainer();
        System.out.println();
        
        // 7. SIMULATED REQUEST HANDLING
        System.out.println("7. SIMULATED REQUEST HANDLING");
        System.out.println("   ---------------------------");
        processor.handleRequest("/hello");
        processor.handleRequest("/users?id=123");
        processor.handleRequest("/admin/dashboard");
    }
}

// Simulated @WebServlet configuration
class WebServletConfig {
    String name;
    String[] urlPatterns;
    int loadOnStartup = -1;
    Map<String, String> initParams = new HashMap<>();
    boolean asyncSupported = false;
}

// Simulated @WebFilter configuration
class WebFilterConfig {
    String filterName;
    String[] urlPatterns;
    Map<String, String> initParams = new HashMap<>();
}

// Simulated @MultipartConfig
class MultipartConfig {
    int fileSizeThreshold;
    long maxFileSize;
    long maxRequestSize;
    String location;
}

// Annotation processor (simulates container)
class AnnotationProcessor {
    private List<WebServletConfig> servlets = new ArrayList<>();
    private List<WebFilterConfig> filters = new ArrayList<>();
    private List<String[]> listeners = new ArrayList<>();
    
    public void registerServlet(String className, WebServletConfig config) {
        servlets.add(config);
        System.out.println("   Registered servlet: " + config.name);
        System.out.println("     URL patterns: " + Arrays.toString(config.urlPatterns));
        System.out.println("     Load on startup: " + config.loadOnStartup);
        if (!config.initParams.isEmpty()) {
            System.out.println("     Init params:");
            config.initParams.forEach((k, v) -> 
                System.out.println("       " + k + " = " + v));
        }
        if (config.asyncSupported) {
            System.out.println("     Async supported: true");
        }
    }
    
    public void registerFilter(WebFilterConfig config) {
        filters.add(config);
        System.out.println("   Registered filter: " + config.filterName);
        System.out.println("     URL patterns: " + Arrays.toString(config.urlPatterns));
        if (!config.initParams.isEmpty()) {
            System.out.println("     Init params:");
            config.initParams.forEach((k, v) -> 
                System.out.println("       " + k + " = " + v));
        }
    }
    
    public void registerListener(String className, String type) {
        listeners.add(new String[]{className, type});
        System.out.println("   Registered listener: " + className + " (" + type + ")");
    }
    
    public void registerMultipartServlet(String name, MultipartConfig config) {
        System.out.println("   Registered multipart servlet: " + name);
        System.out.println("     File size threshold: " + formatSize(config.fileSizeThreshold));
        System.out.println("     Max file size: " + formatSize(config.maxFileSize));
        System.out.println("     Max request size: " + formatSize(config.maxRequestSize));
        System.out.println("     Location: " + config.location);
    }
    
    private String formatSize(long bytes) {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)) + " MB";
        } else if (bytes >= 1024) {
            return (bytes / 1024) + " KB";
        }
        return bytes + " bytes";
    }
    
    public void startContainer() {
        System.out.println("   Starting servlet container...");
        
        // Initialize listeners
        System.out.println("   Initializing listeners:");
        for (String[] listener : listeners) {
            System.out.println("     - " + listener[0] + " initialized");
        }
        
        // Load servlets by loadOnStartup order
        System.out.println("   Loading servlets:");
        servlets.stream()
            .filter(s -> s.loadOnStartup >= 0)
            .sorted((a, b) -> a.loadOnStartup - b.loadOnStartup)
            .forEach(s -> System.out.println("     - " + s.name + " loaded (order: " + s.loadOnStartup + ")"));
        
        System.out.println("   Container started!");
    }
    
    public void handleRequest(String url) {
        System.out.println("   Request: " + url);
        
        // Check filters
        for (WebFilterConfig filter : filters) {
            for (String pattern : filter.urlPatterns) {
                if (matchesPattern(url, pattern)) {
                    System.out.println("     -> Filter: " + filter.filterName);
                    break;
                }
            }
        }
        
        // Find servlet
        for (WebServletConfig servlet : servlets) {
            for (String pattern : servlet.urlPatterns) {
                if (matchesPattern(url, pattern)) {
                    System.out.println("     -> Servlet: " + servlet.name);
                    return;
                }
            }
        }
        System.out.println("     -> 404 Not Found");
    }
    
    private boolean matchesPattern(String url, String pattern) {
        if (pattern.equals("/*")) return true;
        if (pattern.endsWith("/*")) {
            String prefix = pattern.substring(0, pattern.length() - 2);
            return url.startsWith(prefix);
        }
        return url.startsWith(pattern.split("\\\\?")[0]);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an annotation processor that validates servlet configurations',
      hint: 'Check for valid URL patterns and required attributes',
      starterCode: `import java.util.*;

public class AnnotationValidatorDemo {
    public static void main(String[] args) {
        System.out.println("=== Annotation Validator Demo ===\\n");
        
        AnnotationValidator validator = new AnnotationValidator();
        
        // Test 1: Valid servlet
        System.out.println("1. Valid Servlet:");
        ServletAnnotation valid = new ServletAnnotation();
        valid.name = "UserServlet";
        valid.urlPatterns = new String[]{"/users", "/api/users"};
        valid.loadOnStartup = 1;
        validator.validate(valid);
        System.out.println();
        
        // Test 2: Missing URL pattern
        System.out.println("2. Missing URL Pattern:");
        ServletAnnotation noUrl = new ServletAnnotation();
        noUrl.name = "BadServlet";
        noUrl.urlPatterns = new String[]{};
        validator.validate(noUrl);
        System.out.println();
        
        // Test 3: Invalid URL pattern
        System.out.println("3. Invalid URL Pattern:");
        ServletAnnotation badUrl = new ServletAnnotation();
        badUrl.name = "BadUrlServlet";
        badUrl.urlPatterns = new String[]{"users"};  // Missing leading /
        validator.validate(badUrl);
        System.out.println();
        
        // Test 4: Missing name
        System.out.println("4. Missing Name:");
        ServletAnnotation noName = new ServletAnnotation();
        noName.urlPatterns = new String[]{"/test"};
        validator.validate(noName);
    }
}

class ServletAnnotation {
    String name;
    String[] urlPatterns;
    int loadOnStartup = -1;
}

class AnnotationValidator {
    public void validate(ServletAnnotation annotation) {
        List<String> errors = new ArrayList<>();
        
        // Check name
        if (annotation.name == null || annotation.name.isEmpty()) {
            errors.add("Servlet name is required");
        }
        
        // Check URL patterns
        if (annotation.urlPatterns == null || annotation.urlPatterns.length == 0) {
            errors.add("At least one URL pattern is required");
        } else {
            for (String pattern : annotation.urlPatterns) {
                if (!pattern.startsWith("/")) {
                    errors.add("URL pattern must start with /: " + pattern);
                }
            }
        }
        
        // Print results
        if (errors.isEmpty()) {
            System.out.println("   VALID: " + annotation.name);
            System.out.println("   URL patterns: " + Arrays.toString(annotation.urlPatterns));
        } else {
            System.out.println("   INVALID:");
            errors.forEach(e -> System.out.println("   - " + e));
        }
    }
}`
    }
  ]
};

export default servletAnnotations;
