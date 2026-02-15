const forLoop = {
  id: 'for-loop',
  title: 'For Loop',
  description: 'Repeating code a specific number of times',
  content: `
# For Loop — When You Know How Many Times

The for loop is perfect when you know exactly how many times you want to repeat something. Print numbers 1 to 10? Loop through an array? Process items in a list? For loop is your friend.

---

## Basic For Loop

\`\`\`java
for (initialization; condition; update) {
    // Code to repeat
}
\`\`\`

**Example:**
\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
// Output: 1, 2, 3, 4, 5
\`\`\`

**How it works:**
1. **Initialization** (\`int i = 1\`) — Runs once at the start
2. **Condition** (\`i <= 5\`) — Checked before each iteration
3. **Update** (\`i++\`) — Runs after each iteration
4. **Body** — Runs if condition is true

---

## Common Patterns

### Counting Up

\`\`\`java
for (int i = 0; i < 10; i++) {
    System.out.println(i);  // 0 to 9
}
\`\`\`

### Counting Down

\`\`\`java
for (int i = 10; i > 0; i--) {
    System.out.println(i);  // 10 to 1
}
\`\`\`

### Step by 2

\`\`\`java
for (int i = 0; i <= 10; i += 2) {
    System.out.println(i);  // 0, 2, 4, 6, 8, 10
}
\`\`\`

### Iterating Arrays

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Index " + i + ": " + numbers[i]);
}
\`\`\`

---

## Enhanced For Loop (For-Each)

Simpler syntax for iterating collections:

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

**When to use:**
- You don't need the index
- You're not modifying the array
- You want cleaner code

**When NOT to use:**
- You need the index
- You need to modify elements
- You need to iterate backwards

---

## Nested For Loops

Loops inside loops:

\`\`\`java
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}
\`\`\`

Output:
\`\`\`
1   2   3   4   5
2   4   6   8   10
3   6   9   12  15
4   8   12  16  20
5   10  15  20  25
\`\`\`

---

## Loop Control

### break — Exit the loop

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // Exit loop
    }
    System.out.println(i);
}
// Output: 1, 2, 3, 4
\`\`\`

### continue — Skip to next iteration

\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // Skip this iteration
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5
\`\`\`

### Labeled break/continue

For nested loops:

\`\`\`java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;  // Exit both loops
        }
        System.out.println(i + "," + j);
    }
}
\`\`\`

---

## Infinite Loop

Be careful! This runs forever:

\`\`\`java
for (;;) {
    // Infinite loop
}

// Or
for (int i = 0; i >= 0; i++) {
    // Also infinite (until overflow)
}
\`\`\`

---

## Real-World Examples

### Processing a List

\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

for (int i = 0; i < names.size(); i++) {
    System.out.println((i + 1) + ". " + names.get(i));
}
\`\`\`

### Finding an Element

\`\`\`java
int[] numbers = {5, 12, 8, 130, 44};
int target = 8;
int foundIndex = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        foundIndex = i;
        break;
    }
}

if (foundIndex != -1) {
    System.out.println("Found at index: " + foundIndex);
}
\`\`\`

### Calculating Sum

\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};
int sum = 0;

for (int num : numbers) {
    sum += num;
}

System.out.println("Sum: " + sum);  // 15
\`\`\`

---

## Common Mistakes

### Off-by-One Errors

\`\`\`java
int[] arr = {1, 2, 3, 4, 5};

// WRONG - ArrayIndexOutOfBoundsException
for (int i = 0; i <= arr.length; i++) { }

// CORRECT
for (int i = 0; i < arr.length; i++) { }
\`\`\`

### Modifying Loop Variable

\`\`\`java
// Confusing and error-prone
for (int i = 0; i < 10; i++) {
    i = i + 2;  // Don't do this!
}
\`\`\`

### Infinite Loop by Mistake

\`\`\`java
// WRONG - i never changes
for (int i = 0; i < 10; ) {
    System.out.println(i);
}
\`\`\`
`,
  code: `// For Loop Demo

import java.util.*;

public class ForLoopDemo {
    public static void main(String[] args) {
        System.out.println("=== For Loop Demo ===\\n");
        
        // 1. BASIC FOR LOOP
        System.out.println("1. BASIC FOR LOOP");
        System.out.println("   ---------------");
        
        System.out.print("   Counting 1-5: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Counting down 5-1: ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Even numbers 0-10: ");
        for (int i = 0; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println("\\n");
        
        // 2. ITERATING ARRAYS
        System.out.println("2. ITERATING ARRAYS");
        System.out.println("   -----------------");
        
        String[] fruits = {"Apple", "Banana", "Cherry", "Date"};
        
        System.out.println("   Traditional for loop:");
        for (int i = 0; i < fruits.length; i++) {
            System.out.println("   " + i + ": " + fruits[i]);
        }
        
        System.out.println("\\n   Enhanced for loop (for-each):");
        for (String fruit : fruits) {
            System.out.println("   - " + fruit);
        }
        System.out.println();
        
        // 3. NESTED FOR LOOPS
        System.out.println("3. NESTED FOR LOOPS");
        System.out.println("   -----------------");
        
        System.out.println("   Multiplication Table (1-5):");
        System.out.print("      ");
        for (int i = 1; i <= 5; i++) {
            System.out.printf("%4d", i);
        }
        System.out.println();
        System.out.println("      " + "----".repeat(5));
        
        for (int i = 1; i <= 5; i++) {
            System.out.printf("   %d |", i);
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }
        System.out.println();
        
        // 4. BREAK AND CONTINUE
        System.out.println("4. BREAK AND CONTINUE");
        System.out.println("   -------------------");
        
        System.out.print("   Break at 5: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break;
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Skip 3 and 6: ");
        for (int i = 1; i <= 7; i++) {
            if (i == 3 || i == 6) continue;
            System.out.print(i + " ");
        }
        System.out.println("\\n");
        
        // 5. PATTERN PRINTING
        System.out.println("5. PATTERN PRINTING");
        System.out.println("   -----------------");
        
        System.out.println("   Right triangle:");
        for (int i = 1; i <= 5; i++) {
            System.out.print("   ");
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();
        
        // 6. PRACTICAL EXAMPLES
        System.out.println("6. PRACTICAL EXAMPLES");
        System.out.println("   -------------------");
        
        // Sum of array
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("   Sum of array: " + sum);
        
        // Find maximum
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("   Maximum: " + max);
        
        // Count occurrences
        String text = "hello world";
        int count = 0;
        for (char c : text.toCharArray()) {
            if (c == 'l') count++;
        }
        System.out.println("   'l' appears " + count + " times in '" + text + "'");
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Shopping Cart");
        System.out.println("   ------------------------------------");
        
        String[] items = {"Laptop", "Mouse", "Keyboard"};
        double[] prices = {999.99, 29.99, 79.99};
        int[] quantities = {1, 2, 1};
        
        double total = 0;
        System.out.println("   Cart Items:");
        for (int i = 0; i < items.length; i++) {
            double itemTotal = prices[i] * quantities[i];
            total += itemTotal;
            System.out.printf("   %d. %s x%d @ $%.2f = $%.2f%n", 
                             i + 1, items[i], quantities[i], prices[i], itemTotal);
        }
        System.out.printf("   Total: $%.2f%n", total);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a program that finds prime numbers',
      hint: 'Use nested loops to check if a number is divisible',
      starterCode: `public class PrimeNumbers {
    public static void main(String[] args) {
        System.out.println("=== Prime Numbers ===\\n");
        
        int limit = 50;
        System.out.println("Prime numbers from 2 to " + limit + ":");
        
        int count = 0;
        for (int num = 2; num <= limit; num++) {
            if (isPrime(num)) {
                System.out.print(num + " ");
                count++;
            }
        }
        
        System.out.println("\\n\\nTotal primes found: " + count);
    }
    
    public static boolean isPrime(int num) {
        if (num < 2) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;
        
        // Check odd divisors up to square root
        for (int i = 3; i * i <= num; i += 2) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}`
    }
  ]
};

export default forLoop;
