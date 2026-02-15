const cssIntroduction = {
  id: 'css-introduction',
  title: 'CSS Introduction - What is CSS?',
  description: 'Learn what CSS is, why it exists, and how it styles HTML to create beautiful web pages',
  content: `
# CSS Introduction — Styling the Web

CSS (Cascading Style Sheets) is the language that makes web pages beautiful. While HTML provides structure, CSS provides the visual design - colors, layouts, fonts, and animations.

---

## What is CSS?

**CSS** stands for **Cascading Style Sheets**:
- **Cascading** - Styles cascade down and can be overridden
- **Style** - Visual appearance (colors, fonts, spacing)
- **Sheets** - Separate files or embedded styles

**In simple terms:** CSS is the "makeup" for HTML. HTML is the skeleton, CSS is the skin.

---

## Why CSS Exists

Before CSS, styling was done inline in HTML:
\`\`\`html
<!-- Old way (bad) -->
<p style="color: blue; font-size: 20px;">Text</p>
\`\`\`

**Problems:**
- Repetitive code
- Hard to maintain
- Inconsistent styling
- Large HTML files

**CSS Solution:**
- Separate styling from structure
- Reusable styles
- Easy to maintain
- Consistent design

---

## How CSS Works

CSS works by selecting HTML elements and applying styles:

\`\`\`css
/* Select the element */
p {
  /* Apply styles */
  color: blue;
  font-size: 20px;
}
\`\`\`

**Result:** All \`<p>\` tags become blue and 20px.

---

## CSS Syntax

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

**Example:**
\`\`\`css
h1 {
  color: red;
  font-size: 32px;
  text-align: center;
}
\`\`\`

**Components:**
- **Selector** - Which element to style (\`h1\`)
- **Property** - What to change (\`color\`)
- **Value** - How to change it (\`red\`)

---

## Ways to Add CSS

### 1. Inline CSS (Not Recommended)

\`\`\`html
<p style="color: blue;">Text</p>
\`\`\`

**Use when:** Quick testing only

---

### 2. Internal CSS (In HTML)

\`\`\`html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
\`\`\`

**Use when:** Single page styling

---

### 3. External CSS (Recommended)

\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

**File: style.css**
\`\`\`css
p {
  color: blue;
}
\`\`\`

**Use when:** Multiple pages (best practice)

---

## Real-Time Scenarios: CSS in Daily Life

### Scenario 1: E-commerce Website (Amazon, Flipkart)

**Daily Life:** When you shop online, CSS is everywhere:

- **Product Cards:** CSS creates the card layout, shadows, hover effects
- **Buttons:** CSS styles "Add to Cart" buttons with colors and animations
- **Navigation:** CSS creates the menu bar, dropdowns, and hover states
- **Responsive Design:** CSS makes the site work on mobile, tablet, desktop

**Without CSS:** All products would look the same - just plain text and images.

**With CSS:** Beautiful, organized, interactive shopping experience.

---

### Scenario 2: Social Media (Facebook, Instagram)

**Daily Life:** Every post, comment, and profile uses CSS:

- **Post Layout:** CSS arranges images, text, and buttons
- **Profile Pictures:** CSS creates circular images with borders
- **Like Buttons:** CSS adds colors, hover effects, animations
- **Feed Design:** CSS creates the scrolling feed layout

---

### Scenario 3: News Websites (BBC, CNN)

**Daily Life:** Reading news articles:

- **Typography:** CSS controls font sizes, line spacing, readability
- **Article Layout:** CSS creates columns, spacing, and hierarchy
- **Images:** CSS sizes and positions images
- **Navigation:** CSS creates the menu and breadcrumbs

---

## CSS Versions

- **CSS1** (1996) - Basic styling
- **CSS2** (1998) - Positioning, media types
- **CSS3** (1999-ongoing) - Modern features (flexbox, grid, animations)
- **CSS4** (In development) - Advanced features

**We use CSS3** - the current standard with modern features!

---

## Key Features of CSS3

1. **Flexbox** - Modern layout system
2. **Grid** - Two-dimensional layouts
3. **Animations** - Smooth transitions and animations
4. **Media Queries** - Responsive design
5. **Custom Properties** - CSS variables
6. **Transform** - Rotate, scale, translate elements

---

## CSS vs Other Technologies

### CSS vs HTML
- **HTML**: Structure and content (what's on the page)
- **CSS**: Styling and appearance (how it looks)

### CSS vs JavaScript
- **CSS**: Static styling (colors, layouts)
- **JavaScript**: Dynamic behavior (interactions, animations)

**They work together!** HTML provides structure, CSS makes it beautiful, JavaScript makes it interactive.

---

## Your First CSS

### Step 1: Create HTML

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First CSS</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

### Step 2: Add CSS

\`\`\`html
<head>
  <style>
    h1 {
      color: blue;
      text-align: center;
    }
    p {
      color: gray;
      font-size: 18px;
    }
  </style>
</head>
\`\`\`

**Result:** Blue centered heading and gray paragraph!

---

## Common CSS Properties

| Property | Purpose | Example |
|----------|---------|---------|
| \`color\` | Text color | \`color: red;\` |
| \`background-color\` | Background color | \`background-color: blue;\` |
| \`font-size\` | Text size | \`font-size: 20px;\` |
| \`margin\` | Outer spacing | \`margin: 10px;\` |
| \`padding\` | Inner spacing | \`padding: 10px;\` |
| \`width\` | Element width | \`width: 100px;\` |
| \`height\` | Element height | \`height: 100px;\` |

---

## CSS Best Practices

When writing CSS, follow these guidelines to keep your code clean and maintainable:

1. Use external CSS files instead of inline styles. This separates your styling from your HTML structure, making both easier to maintain and update.

2. Use meaningful class names that describe what the element is, not how it looks. For example, use \`.button\` instead of \`.blue-box\`. This makes your code more readable and easier to understand later.

3. Organize your CSS by grouping related styles together. You might group all navigation styles, all button styles, and all form styles in separate sections.

4. Add comments to explain complex styles or sections. Use \`/* Comment */\` to document your code.

5. Avoid inline styles whenever possible. Instead, create classes and apply them to elements. This makes your styles reusable and easier to maintain.

6. Use CSS variables (custom properties) for colors, sizes, and other values that you use repeatedly. This makes it easy to change your design theme later.

---

## Summary

CSS stands for Cascading Style Sheets. Its main purpose is to style and design web pages, making them visually appealing and professional. The basic syntax is \`selector { property: value; }\`, where you select an element and apply styles to it. There are three ways to add CSS: inline (not recommended), internal (in the HTML file), and external (separate CSS file, which is the best practice). CSS3 is the current standard with modern features like Flexbox, Grid, and animations. CSS works together with HTML for structure and JavaScript for behavior.

CSS transforms plain HTML into beautiful, professional websites. As you learn more about CSS, you'll discover how powerful it is for creating modern, responsive designs.

---

## Next Steps

- Learn about **CSS Selectors**
- Understand **Colors & Backgrounds**
- Master **Box Model** (margin, padding, border)
- Explore **Flexbox & Grid** for layouts
- Learn **Responsive Design** with media queries
`,
  code: `// CSS Introduction - What is CSS?

/*
 * CSS = CASCADING STYLE SHEETS
 * ============================
 * 
 * CSS styles HTML to create beautiful web pages
 */

// ============================================
// 1. WHAT IS CSS
// ============================================
/*
CSS = Cascading Style Sheets
  → Cascading: Styles cascade down
  → Style: Visual appearance
  → Sheets: Separate files

Purpose: Make HTML beautiful
  HTML = Structure (skeleton)
  CSS  = Style (skin)
*/

// ============================================
// 2. CSS SYNTAX
// ============================================
/*
selector {
    property: value;
    property: value;
}

Example:
  h1 {
      color: red;
      font-size: 32px;
  }
*/

// ============================================
// 3. WAYS TO ADD CSS
// ============================================
/*
INLINE (Not recommended):
  <p style="color: blue;">Text</p>

INTERNAL (In HTML):
  <head>
      <style>
          p { color: blue; }
      </style>
  </head>

EXTERNAL (Recommended):
  <head>
      <link rel="stylesheet" href="style.css">
  </head>
  
  File: style.css
  p { color: blue; }
*/

// ============================================
// 4. COMMON CSS PROPERTIES
// ============================================
/*
color              → Text color
background-color   → Background color
font-size          → Text size
margin             → Outer spacing
padding            → Inner spacing
width              → Element width
height             → Element height
*/

// ============================================
// 5. CSS VERSIONS
// ============================================
/*
CSS1 (1996)  → Basic styling
CSS2 (1998)  → Positioning
CSS3 (1999+) → Modern features (flexbox, grid, animations)
CSS4          → In development
*/

// ============================================
// 6. BEST PRACTICES
// ============================================
/*
Use external CSS files
Use meaningful class names
Organize your CSS
Use comments
Avoid inline styles
Use CSS variables
*/
`
};

export default cssIntroduction;

