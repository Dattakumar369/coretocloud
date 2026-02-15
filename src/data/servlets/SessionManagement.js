const sessionManagement = {
  id: 'session-management',
  title: 'Session Management',
  description: 'Maintaining user state across multiple requests',
  content: `
# Session Management — Remembering Your Users

HTTP is stateless — each request is independent. But web apps need to remember users: who's logged in, what's in their cart, their preferences. Session management solves this problem.

---

## Why Sessions?

Without sessions:
\`\`\`
Request 1: "I'm John, show my profile"
Request 2: "Who are you? I don't know any John!"
\`\`\`

With sessions:
\`\`\`
Request 1: "I'm John" → Server: "Here's session ID: ABC123"
Request 2: "I'm ABC123" → Server: "Ah, you're John! Here's your profile"
\`\`\`

---

## Session Tracking Techniques

### 1. Cookies (Most Common)

\`\`\`
Browser                          Server
   │                                │
   │──── Request ──────────────────→│
   │                                │ Create session
   │←─── Response + Cookie ─────────│ JSESSIONID=ABC123
   │                                │
   │──── Request + Cookie ─────────→│
   │     JSESSIONID=ABC123          │ Found session!
   │←─── Response ──────────────────│
\`\`\`

### 2. URL Rewriting

When cookies are disabled:
\`\`\`
http://example.com/page;jsessionid=ABC123
\`\`\`

### 3. Hidden Form Fields

\`\`\`html
<input type="hidden" name="sessionId" value="ABC123">
\`\`\`

---

## HttpSession API

### Getting a Session

\`\`\`java
// Get existing session or create new one
HttpSession session = request.getSession();

// Get existing session only (returns null if none)
HttpSession session = request.getSession(false);
\`\`\`

### Storing Data

\`\`\`java
// Store user info
session.setAttribute("username", "john");
session.setAttribute("userId", 123);
session.setAttribute("cart", new ShoppingCart());

// Store any object
User user = new User("John", "john@email.com");
session.setAttribute("user", user);
\`\`\`

### Retrieving Data

\`\`\`java
// Get stored values
String username = (String) session.getAttribute("username");
Integer userId = (Integer) session.getAttribute("userId");
User user = (User) session.getAttribute("user");

// Check if attribute exists
if (session.getAttribute("user") != null) {
    // User is logged in
}
\`\`\`

### Removing Data

\`\`\`java
// Remove specific attribute
session.removeAttribute("tempData");

// Invalidate entire session (logout)
session.invalidate();
\`\`\`

---

## Session Information

\`\`\`java
// Session ID
String sessionId = session.getId();

// Creation time
long created = session.getCreationTime();
Date createdDate = new Date(created);

// Last accessed time
long lastAccessed = session.getLastAccessedTime();

// Is this a new session?
boolean isNew = session.isNew();

// Get all attribute names
Enumeration<String> names = session.getAttributeNames();
\`\`\`

---

## Session Timeout

### Programmatic

\`\`\`java
// Set timeout in seconds (30 minutes)
session.setMaxInactiveInterval(30 * 60);

// Get current timeout
int timeout = session.getMaxInactiveInterval();
\`\`\`

### In web.xml

\`\`\`xml
<session-config>
    <session-timeout>30</session-timeout> <!-- minutes -->
</session-config>
\`\`\`

---

## Real-World Example: Login System

\`\`\`java
// LoginServlet.java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Validate credentials (simplified)
        User user = userService.authenticate(username, password);
        
        if (user != null) {
            // Create session and store user
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            session.setAttribute("loginTime", new Date());
            session.setMaxInactiveInterval(30 * 60); // 30 minutes
            
            response.sendRedirect("dashboard");
        } else {
            request.setAttribute("error", "Invalid credentials");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
}

// LogoutServlet.java
@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.sendRedirect("login.jsp");
    }
}

// Protected page check
@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        User user = (User) session.getAttribute("user");
        request.setAttribute("user", user);
        request.getRequestDispatcher("/dashboard.jsp").forward(request, response);
    }
}
\`\`\`

---

## Shopping Cart Example

\`\`\`java
@WebServlet("/cart/*")
public class CartServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        
        // Get or create cart
        ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
        if (cart == null) {
            cart = new ShoppingCart();
            session.setAttribute("cart", cart);
        }
        
        String action = request.getPathInfo();
        
        if ("/add".equals(action)) {
            int productId = Integer.parseInt(request.getParameter("productId"));
            int quantity = Integer.parseInt(request.getParameter("quantity"));
            cart.addItem(productId, quantity);
        } else if ("/remove".equals(action)) {
            int productId = Integer.parseInt(request.getParameter("productId"));
            cart.removeItem(productId);
        } else if ("/clear".equals(action)) {
            cart.clear();
        }
        
        response.sendRedirect(request.getContextPath() + "/cart");
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
        
        request.setAttribute("cart", cart);
        request.getRequestDispatcher("/cart.jsp").forward(request, response);
    }
}
\`\`\`

---

## Session Best Practices

1. **Don't store large objects** — Sessions consume server memory
2. **Set appropriate timeouts** — Balance security and user experience
3. **Invalidate on logout** — Always call \`session.invalidate()\`
4. **Use HTTPS** — Protect session cookies
5. **Regenerate session ID after login** — Prevent session fixation
6. **Store minimal data** — User ID, not entire user object
`,
  code: `// Session Management Demo
// Simulates servlet session behavior

import java.util.*;

public class SessionManagementDemo {
    public static void main(String[] args) {
        System.out.println("=== Session Management Demo ===\\n");
        
        // Simulated server
        SessionServer server = new SessionServer();
        
        // 1. USER LOGIN
        System.out.println("1. USER LOGIN");
        System.out.println("   -----------");
        
        String sessionId = server.login("john", "password123");
        System.out.println("   Login successful!");
        System.out.println("   Session ID: " + sessionId);
        System.out.println();
        
        // 2. STORING SESSION DATA
        System.out.println("2. STORING SESSION DATA");
        System.out.println("   ---------------------");
        
        server.setAttribute(sessionId, "username", "john");
        server.setAttribute(sessionId, "email", "john@email.com");
        server.setAttribute(sessionId, "role", "admin");
        server.setAttribute(sessionId, "loginTime", new Date());
        System.out.println();
        
        // 3. RETRIEVING SESSION DATA
        System.out.println("3. RETRIEVING SESSION DATA");
        System.out.println("   ------------------------");
        
        System.out.println("   Username: " + server.getAttribute(sessionId, "username"));
        System.out.println("   Email: " + server.getAttribute(sessionId, "email"));
        System.out.println("   Role: " + server.getAttribute(sessionId, "role"));
        System.out.println("   Login Time: " + server.getAttribute(sessionId, "loginTime"));
        System.out.println();
        
        // 4. SHOPPING CART EXAMPLE
        System.out.println("4. SHOPPING CART EXAMPLE");
        System.out.println("   ----------------------");
        
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Laptop", 999.99, 1);
        cart.addItem("Mouse", 29.99, 2);
        cart.addItem("Keyboard", 79.99, 1);
        
        server.setAttribute(sessionId, "cart", cart);
        
        ShoppingCart retrievedCart = (ShoppingCart) server.getAttribute(sessionId, "cart");
        System.out.println("   Cart contents:");
        retrievedCart.displayCart();
        System.out.println("   Total: $" + String.format("%.2f", retrievedCart.getTotal()));
        System.out.println();
        
        // 5. SESSION INFO
        System.out.println("5. SESSION INFO");
        System.out.println("   -------------");
        
        server.displaySessionInfo(sessionId);
        System.out.println();
        
        // 6. MULTIPLE USERS
        System.out.println("6. MULTIPLE USERS (Concurrent Sessions)");
        System.out.println("   -------------------------------------");
        
        String session2 = server.login("jane", "pass456");
        server.setAttribute(session2, "username", "jane");
        server.setAttribute(session2, "role", "user");
        
        System.out.println("   Active sessions: " + server.getActiveSessionCount());
        System.out.println("   John's role: " + server.getAttribute(sessionId, "role"));
        System.out.println("   Jane's role: " + server.getAttribute(session2, "role"));
        System.out.println();
        
        // 7. LOGOUT
        System.out.println("7. LOGOUT (Session Invalidation)");
        System.out.println("   ------------------------------");
        
        server.logout(sessionId);
        System.out.println("   John logged out");
        System.out.println("   Active sessions: " + server.getActiveSessionCount());
        
        // Try to access invalidated session
        Object result = server.getAttribute(sessionId, "username");
        System.out.println("   Accessing invalidated session: " + result);
    }
}

// Simulated Session
class SimulatedSession {
    private String id;
    private Map<String, Object> attributes = new HashMap<>();
    private long creationTime;
    private long lastAccessedTime;
    
    public SimulatedSession(String id) {
        this.id = id;
        this.creationTime = System.currentTimeMillis();
        this.lastAccessedTime = creationTime;
    }
    
    public String getId() { return id; }
    public long getCreationTime() { return creationTime; }
    public long getLastAccessedTime() { return lastAccessedTime; }
    
    public void setAttribute(String name, Object value) {
        attributes.put(name, value);
        lastAccessedTime = System.currentTimeMillis();
        System.out.println("   Set attribute: " + name + " = " + value);
    }
    
    public Object getAttribute(String name) {
        lastAccessedTime = System.currentTimeMillis();
        return attributes.get(name);
    }
    
    public Set<String> getAttributeNames() {
        return attributes.keySet();
    }
}

// Simulated Session Server
class SessionServer {
    private Map<String, SimulatedSession> sessions = new HashMap<>();
    private int sessionCounter = 0;
    
    public String login(String username, String password) {
        // In real app, validate credentials
        String sessionId = "JSESSIONID_" + (++sessionCounter) + "_" + System.currentTimeMillis();
        sessions.put(sessionId, new SimulatedSession(sessionId));
        return sessionId;
    }
    
    public void logout(String sessionId) {
        sessions.remove(sessionId);
    }
    
    public void setAttribute(String sessionId, String name, Object value) {
        SimulatedSession session = sessions.get(sessionId);
        if (session != null) {
            session.setAttribute(name, value);
        }
    }
    
    public Object getAttribute(String sessionId, String name) {
        SimulatedSession session = sessions.get(sessionId);
        if (session != null) {
            return session.getAttribute(name);
        }
        return null;
    }
    
    public int getActiveSessionCount() {
        return sessions.size();
    }
    
    public void displaySessionInfo(String sessionId) {
        SimulatedSession session = sessions.get(sessionId);
        if (session != null) {
            System.out.println("   Session ID: " + session.getId());
            System.out.println("   Created: " + new Date(session.getCreationTime()));
            System.out.println("   Last Accessed: " + new Date(session.getLastAccessedTime()));
            System.out.println("   Attributes: " + session.getAttributeNames());
        }
    }
}

// Shopping Cart
class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    public void addItem(String name, double price, int quantity) {
        items.add(new CartItem(name, price, quantity));
    }
    
    public void displayCart() {
        for (CartItem item : items) {
            System.out.println("     - " + item.name + " x" + item.quantity + 
                             " @ $" + item.price + " = $" + (item.price * item.quantity));
        }
    }
    
    public double getTotal() {
        return items.stream()
                   .mapToDouble(item -> item.price * item.quantity)
                   .sum();
    }
    
    private static class CartItem {
        String name;
        double price;
        int quantity;
        
        CartItem(String name, double price, int quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a user preference system using sessions',
      hint: 'Store and retrieve user preferences like theme, language, etc.',
      starterCode: `import java.util.*;

public class UserPreferencesDemo {
    public static void main(String[] args) {
        System.out.println("=== User Preferences System ===\\n");
        
        PreferenceManager manager = new PreferenceManager();
        
        // User logs in
        String sessionId = manager.createSession("user123");
        
        // Set preferences
        manager.setPreference(sessionId, "theme", "dark");
        manager.setPreference(sessionId, "language", "en");
        manager.setPreference(sessionId, "fontSize", "medium");
        manager.setPreference(sessionId, "notifications", true);
        
        // Display preferences
        System.out.println("\\nUser Preferences:");
        manager.displayPreferences(sessionId);
        
        // Update a preference
        System.out.println("\\nChanging theme to 'light'...");
        manager.setPreference(sessionId, "theme", "light");
        
        // Get specific preference
        System.out.println("Current theme: " + manager.getPreference(sessionId, "theme"));
        
        // Clear preferences on logout
        System.out.println("\\nLogging out...");
        manager.clearSession(sessionId);
    }
}

class PreferenceManager {
    private Map<String, Map<String, Object>> sessions = new HashMap<>();
    
    public String createSession(String userId) {
        String sessionId = "SESSION_" + userId + "_" + System.currentTimeMillis();
        sessions.put(sessionId, new HashMap<>());
        System.out.println("Session created: " + sessionId);
        return sessionId;
    }
    
    public void setPreference(String sessionId, String key, Object value) {
        Map<String, Object> prefs = sessions.get(sessionId);
        if (prefs != null) {
            prefs.put(key, value);
            System.out.println("Set " + key + " = " + value);
        }
    }
    
    public Object getPreference(String sessionId, String key) {
        Map<String, Object> prefs = sessions.get(sessionId);
        return prefs != null ? prefs.get(key) : null;
    }
    
    public void displayPreferences(String sessionId) {
        Map<String, Object> prefs = sessions.get(sessionId);
        if (prefs != null) {
            prefs.forEach((key, value) -> 
                System.out.println("  " + key + ": " + value));
        }
    }
    
    public void clearSession(String sessionId) {
        sessions.remove(sessionId);
        System.out.println("Session cleared");
    }
}`
    }
  ]
};

export default sessionManagement;
