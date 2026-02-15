const oopsIntroduction = {
  id: 'oops-introduction',
  title: 'Introduction to OOPs',
  description: 'Understanding Object-Oriented Programming — the backbone of Java',
  content: `
# Object-Oriented Programming (OOP)

If you've been coding for a while, you've probably heard people throw around terms like "encapsulation" and "polymorphism." These aren't just fancy words to sound smart — they're the foundation of how we build real software.

Let me explain OOP in a way that actually makes sense.

---

## What's the Big Deal About OOP?

Before OOP, we had **procedural programming**. You'd write a bunch of functions, pass data around, and hope everything worked. It was like cooking in a messy kitchen — ingredients everywhere, no organization.

OOP changed that. Instead of thinking about functions and data separately, we combine them into **objects**. An object is like a container that holds both data (what it knows) and methods (what it can do).

Think about a **Car**:
- It has data: color, speed, fuel level
- It has behaviors: start(), accelerate(), brake()

In OOP, we'd create a Car object that bundles all of this together. Clean, organized, and easy to work with.

---

## The Four Pillars of OOP

There are four main concepts in OOP. Let me explain each one with real examples — not textbook definitions.

### 1. Encapsulation — Protecting Your Data

Imagine you have a bank account. Would you want anyone to directly change your balance? Of course not. You'd want them to go through proper channels — deposit money, withdraw money, but never directly mess with the balance.

That's encapsulation. You hide the internal details and provide controlled access.

\`\`\`java
public class BankAccount {
    private double balance;  // Hidden from outside
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
}
\`\`\`

Notice how \`balance\` is private? Nobody can do \`account.balance = 1000000\`. They have to use the methods we provide. This protects our data and lets us add validation.

**Real-world example:** Your phone's battery percentage. You can see it, but you can't directly set it to 100%. The phone controls that internally.

---

### 2. Inheritance — Don't Repeat Yourself

Let's say you're building an e-commerce site. You have different types of products: Electronics, Clothing, Books. They all share some common stuff — name, price, description. But each has unique properties too.

Instead of writing the same code three times, you create a base \`Product\` class and have others inherit from it:

\`\`\`java
class Product {
    String name;
    double price;
    
    void displayInfo() {
        System.out.println(name + " - $" + price);
    }
}

class Electronics extends Product {
    int warrantyMonths;
    
    void displayInfo() {
        super.displayInfo();
        System.out.println("Warranty: " + warrantyMonths + " months");
    }
}
\`\`\`

The \`Electronics\` class gets everything from \`Product\` for free, plus it can add its own stuff. That's inheritance — building on what already exists.

**Real-world example:** Think of a family tree. You inherit traits from your parents — eye color, height. But you're also your own person with unique characteristics.

---

### 3. Polymorphism — Same Action, Different Behavior

This one sounds complicated, but it's actually pretty intuitive.

Imagine you have a "Pay" button on a checkout page. When clicked, it should process the payment. But the *how* depends on the payment method:
- Credit card? Charge the card
- UPI? Generate a QR code
- Cash on delivery? Just confirm the order

Same action (pay), different behavior based on the type. That's polymorphism.

\`\`\`java
interface PaymentMethod {
    void processPayment(double amount);
}

class CreditCard implements PaymentMethod {
    public void processPayment(double amount) {
        System.out.println("Charging $" + amount + " to credit card");
        // Validate card, charge it, etc.
    }
}

class UPI implements PaymentMethod {
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via UPI");
        // Generate QR, wait for confirmation, etc.
    }
}
\`\`\`

The beauty? Your checkout code doesn't need to know which payment method is being used. It just calls \`processPayment()\` and the right thing happens.

**Real-world example:** The "Play" button on your phone. Tap it in Spotify, it plays music. Tap it in YouTube, it plays video. Same button, different behavior.

---

### 4. Abstraction — Hiding the Complexity

When you drive a car, do you think about how the engine works? How fuel injection happens? How the transmission shifts gears? No. You just turn the key, press the gas, and go.

That's abstraction. You hide the complex implementation and show only what's necessary.

\`\`\`java
abstract class Vehicle {
    abstract void start();
    abstract void stop();
    
    void honk() {
        System.out.println("Beep beep!");
    }
}

class Car extends Vehicle {
    void start() {
        // All the complex stuff happens here
        System.out.println("Car started");
    }
    
    void stop() {
        System.out.println("Car stopped");
    }
}
\`\`\`

The user of the \`Car\` class doesn't need to know how \`start()\` works internally. They just call it.

**Real-world example:** An ATM. You insert your card, enter PIN, get cash. You don't see the network calls, database queries, or security checks happening behind the scenes.

---

## Why Does This Matter?

You might be thinking, "Okay, but why should I care?"

Here's why OOP matters in the real world:

**1. Maintainability**
When code is organized into objects, it's easier to find and fix bugs. If there's a problem with payments, you know to look in the payment classes.

**2. Reusability**
Write once, use everywhere. That \`Product\` class? You can use it across your entire application.

**3. Teamwork**
In a team, different people can work on different classes without stepping on each other's toes. You work on \`PaymentService\`, I work on \`OrderService\`.

**4. Scalability**
Need to add a new payment method? Just create a new class that implements \`PaymentMethod\`. No need to touch existing code.

---

## A Common Mistake

Here's something I see beginners do: They learn about OOP and then try to make *everything* a class. Don't do that.

OOP is a tool, not a religion. Sometimes a simple function is all you need. Use OOP when it makes sense — when you have data and behavior that naturally belong together.

---

## Putting It All Together

Let me show you how these concepts work together in a real scenario — an e-commerce order system:

\`\`\`java
// Encapsulation: Order details are private
class Order {
    private String orderId;
    private double total;
    private String status;
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

// Inheritance: Different order types
class ExpressOrder extends Order {
    private int deliveryHours;
}

// Polymorphism: Different shipping methods
interface ShippingMethod {
    void ship(Order order);
}

class StandardShipping implements ShippingMethod {
    public void ship(Order order) {
        System.out.println("Shipping in 5-7 days");
    }
}

class ExpressShipping implements ShippingMethod {
    public void ship(Order order) {
        System.out.println("Shipping in 1-2 days");
    }
}

// Abstraction: User just calls placeOrder()
class OrderService {
    public void placeOrder(Order order, ShippingMethod shipping) {
        // Validate order
        // Process payment
        // Update inventory
        shipping.ship(order);
        // Send confirmation email
    }
}
\`\`\`

See how clean that is? Each piece has a clear responsibility. That's the power of OOP.

---

## What's Next?

Now that you understand the concepts, it's time to dive deeper into each one. In the next lessons, we'll explore:
- Classes and Objects
- Constructors
- Inheritance in detail
- Interfaces vs Abstract Classes
- And more...

But before you move on, try to identify OOP concepts in apps you use daily. That Instagram post? It's probably an object with properties like image, caption, likes. The like button? Polymorphism — same button, different behavior for posts vs stories.

Once you start seeing OOP everywhere, you'll truly understand it.
`,
  code: `// Let's see OOP in action with a simple example
// We'll build a basic e-commerce product system

public class OOPDemo {
    public static void main(String[] args) {
        System.out.println("=== OOP Concepts Demo ===");
        System.out.println();
        
        // ENCAPSULATION
        // Notice how we use methods to interact with the product
        System.out.println("1. ENCAPSULATION");
        System.out.println("   Creating a product with controlled access...");
        
        String productName = "iPhone 15";
        double productPrice = 999.99;
        int productStock = 50;
        
        System.out.println("   Product: " + productName);
        System.out.println("   Price: $" + productPrice);
        System.out.println("   Stock: " + productStock);
        System.out.println();
        
        // INHERITANCE
        // Different product types share common properties
        System.out.println("2. INHERITANCE");
        System.out.println("   Product hierarchy:");
        System.out.println("   Product (base)");
        System.out.println("     |-- Electronics (has warranty)");
        System.out.println("     |-- Clothing (has size)");
        System.out.println("     |-- Books (has author)");
        System.out.println();
        
        // POLYMORPHISM
        // Same method name, different behavior
        System.out.println("3. POLYMORPHISM");
        System.out.println("   Payment processing:");
        System.out.println("   - CreditCard.pay() -> Charges card");
        System.out.println("   - UPI.pay() -> Generates QR code");
        System.out.println("   - Wallet.pay() -> Deducts from balance");
        System.out.println("   Same method, different implementations!");
        System.out.println();
        
        // ABSTRACTION
        // Hide complexity, show simplicity
        System.out.println("4. ABSTRACTION");
        System.out.println("   User clicks 'Place Order'");
        System.out.println("   Behind the scenes:");
        System.out.println("   - Validate cart");
        System.out.println("   - Check inventory");
        System.out.println("   - Process payment");
        System.out.println("   - Create shipment");
        System.out.println("   - Send email");
        System.out.println("   User just sees: 'Order Placed!'");
        System.out.println();
        
        // Summary
        System.out.println("=== Summary ===");
        System.out.println("Encapsulation = Protect your data");
        System.out.println("Inheritance = Reuse existing code");
        System.out.println("Polymorphism = Same action, different behavior");
        System.out.println("Abstraction = Hide the complexity");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple Student class with encapsulation',
      hint: 'Make the fields private and provide getter/setter methods',
      starterCode: `public class Student {
    // Make these private
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0;
    }
    
    // Getter for name
    public String getName() {
        return name;
    }
    
    // Setter for GPA with validation
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be between 0 and 4");
        }
    }
    
    // Add more getters and setters
    // Add a method to display student info
    
    public static void main(String[] args) {
        Student student = new Student("John", 20);
        student.setGpa(3.5);
        System.out.println("Student: " + student.getName());
    }
}`
    }
  ]
};

export default oopsIntroduction;
