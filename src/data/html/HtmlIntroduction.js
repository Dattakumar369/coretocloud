const htmlIntroduction = {
  id: 'html-introduction',
  title: 'HTML Introduction - What is HTML?',
  description: 'Learn what HTML is, why it exists, and how it forms the foundation of every web page',
  content: `
# HTML Introduction — The Foundation of the Web

HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every website you visit is built with HTML. It's the skeleton that gives structure to web content.

---

## What is HTML?

**HTML** stands for **HyperText Markup Language**:
- **HyperText**: Text that contains links to other texts (hyperlinks)
- **Markup**: Tags that describe the structure and meaning of content
- **Language**: A way to communicate with browsers

Think of HTML as the **blueprint** of a web page. Just like a blueprint shows where walls, doors, and windows go in a building, HTML shows where headings, paragraphs, images, and links go on a web page.

---

## Why HTML Exists

Before HTML, there was no standard way to create web pages. HTML was created to:
1. **Structure content** - Organize text, images, and other elements
2. **Create links** - Connect web pages together (the "web" in World Wide Web)
3. **Display information** - Show content in a readable format
4. **Enable accessibility** - Help screen readers understand page structure

---

## How HTML Works

HTML uses **tags** (also called elements) to mark up content:

\`\`\`html
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
\`\`\`

The browser reads these tags and displays the content accordingly:
- \`<h1>\` tells the browser: "This is an important heading"
- \`<p>\` tells the browser: "This is a paragraph"

---

## Basic HTML Document Structure

Every HTML document follows this structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first web page.</p>
</body>
</html>
\`\`\`

### Breaking Down the Structure:

1. **\`<!DOCTYPE html>\`** - Tells the browser this is an HTML5 document
2. **\`<html>\`** - Root element that wraps all content
3. **\`<head>\`** - Contains metadata (information about the page)
   - \`<meta charset="UTF-8">\` - Sets character encoding
   - \`<title>\` - Page title (shown in browser tab)
4. **\`<body>\`** - Contains visible content (what users see)

---

## HTML Tags - The Building Blocks

HTML tags come in pairs: opening tag and closing tag:

\`\`\`html
<tag>Content goes here</tag>
\`\`\`

**Example:**
\`\`\`html
<p>This is a paragraph.</p>
\`\`\`

- \`<p>\` - Opening tag
- \`</p>\` - Closing tag (note the forward slash)
- Text between tags - Content

Some tags are **self-closing** (no closing tag needed):
\`\`\`html
<img src="image.jpg" alt="Description">
<br>
<hr>
\`\`\`

---

## Real-Time Scenarios: HTML in Daily Life

### Scenario 1: Reading News Articles

**Daily Life:** When you read news on BBC, CNN, or any news website:

- **Headlines** are created with \`<h1>\`, \`<h2>\` tags
- **Article text** is in \`<p>\` (paragraph) tags
- **Images** use \`<img>\` tags
- **Links** to related articles use \`<a>\` tags

**Without HTML:** All text would look the same - no structure, no formatting, no links.

**With HTML:** Content is organized, readable, and interactive.

### Scenario 2: Online Shopping (Amazon, Flipkart)

**Daily Life:** When you browse products online:

- **Product names** are headings (\`<h1>\`, \`<h2>\`)
- **Product descriptions** are paragraphs (\`<p>\`)
- **Product images** use \`<img>\` tags
- **"Add to Cart" buttons** are created with HTML forms
- **Navigation menu** uses HTML lists (\`<ul>\`, \`<li>\`)

### Scenario 3: Social Media (Facebook, Instagram)

**Daily Life:** Every post, comment, and profile uses HTML:

- **Post content** is in \`<p>\` tags
- **User names** might be in \`<strong>\` or \`<span>\` tags
- **Images and videos** use \`<img>\` and \`<video>\` tags
- **Links** to profiles use \`<a>\` tags
- **Like/Share buttons** are HTML elements

---

## HTML Versions

HTML has evolved over time:

- **HTML 1.0** (1993) - First version, very basic
- **HTML 2.0** (1995) - Added forms and tables
- **HTML 3.2** (1997) - Added more formatting options
- **HTML 4.01** (1999) - Major update, widely used
- **XHTML** (2000) - Stricter version of HTML
- **HTML5** (2014) - Current standard, modern features

**We use HTML5** - the latest and most powerful version!

---

## Key Features of HTML5

1. **Semantic Elements** - Tags that describe meaning (\`<header>\`, \`<nav>\`, \`<article>\`)
2. **Media Support** - Built-in \`<audio>\` and \`<video>\` tags
3. **Canvas** - For drawing graphics
4. **Better Forms** - New input types (email, date, color, etc.)
5. **Offline Support** - Web apps can work offline

---

## HTML vs Other Technologies

### HTML vs CSS
- **HTML**: Structure and content (what's on the page)
- **CSS**: Styling and appearance (how it looks)

### HTML vs JavaScript
- **HTML**: Static content (doesn't change)
- **JavaScript**: Dynamic behavior (interactivity, animations)

### HTML vs Backend Languages
- **HTML**: Frontend (what users see)
- **Backend (Java, Python)**: Server-side logic (processing data)

**They work together!** HTML provides structure, CSS makes it beautiful, JavaScript makes it interactive, and backend handles data.

---

## Creating Your First HTML Page

### Step 1: Create a File

Create a file named \`index.html\` (you can use any text editor)

### Step 2: Write HTML Code

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
\`\`\`

### Step 3: Open in Browser

Double-click the file or right-click → Open with → Browser

**Result:** You'll see "Hello, World!" as a heading and the paragraph text below it!

---

## Common HTML Tags You'll Use

| Tag | Purpose | Example |
|-----|---------|---------|
| \`<h1>\` to \`<h6>\` | Headings | \`<h1>Main Title</h1>\` |
| \`<p>\` | Paragraph | \`<p>Some text</p>\` |
| \`<a>\` | Link | \`<a href="page.html">Click me</a>\` |
| \`<img>\` | Image | \`<img src="photo.jpg">\` |
| \`<ul>\` | Unordered list | \`<ul><li>Item</li></ul>\` |
| \`<ol>\` | Ordered list | \`<ol><li>Item</li></ol>\` |
| \`<div>\` | Container | \`<div>Content</div>\` |
| \`<span>\` | Inline container | \`<span>Text</span>\` |

---

## HTML Best Practices

1. **Always close tags** - \`<p>Text</p>\` not \`<p>Text\`
2. **Use lowercase** - \`<p>\` not \`<P>\`
3. **Nest properly** - Close inner tags before outer tags
4. **Use semantic tags** - \`<header>\` instead of \`<div id="header">\`
5. **Add alt text to images** - For accessibility
6. **Validate your HTML** - Use W3C validator

---

## Summary

**HTML** stands for HyperText Markup Language. Its main purpose is to structure and organize web content. HTML uses tags as building blocks, written as \`<tag>content</tag>\`. Every HTML document has a basic structure with \`<!DOCTYPE>\`, \`<html>\`, \`<head>\`, and \`<body>\` elements. HTML5 is the current standard with modern features. HTML works together with CSS for styling and JavaScript for interactivity.

HTML is the foundation of every website. Once you understand HTML, you can create web pages and move on to styling them with CSS and making them interactive with JavaScript.

---

## Next Steps

- Learn about HTML Structure & Basic Tags
- Understand Headings & Paragraphs
- Explore Links & Images
- Master Forms & Tables
`,
  code: `// HTML Introduction - What is HTML?

/*
 * HTML = HyperText Markup Language
 * =================================
 * 
 * HTML is the standard markup language for creating web pages.
 * Every website uses HTML to structure content.
 */

// ============================================
// 1. BASIC HTML DOCUMENT STRUCTURE
// ============================================
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first web page.</p>
</body>
</html>
*/

// ============================================
// 2. HTML TAGS - OPENING AND CLOSING
// ============================================
/*
Opening Tag:  <tag>
Closing Tag:  </tag>
Content:     Text between tags

Example:
  <p>This is a paragraph.</p>
  ^^                    ^^
  Opening              Closing
*/

// ============================================
// 3. SELF-CLOSING TAGS
// ============================================
/*
Some tags don't need closing tags:
  <img src="image.jpg">
  <br>
  <hr>
  <input type="text">
*/

// ============================================
// 4. HTML DOCUMENT PARTS
// ============================================
/*
<!DOCTYPE html>  → Declares HTML5 document
<html>           → Root element
<head>           → Metadata (not visible)
  - <title>      → Page title (browser tab)
  - <meta>       → Character encoding, viewport
<body>           → Visible content
  - <h1>         → Main heading
  - <p>          → Paragraph
  - <img>        → Image
  - <a>          → Link
*/

// ============================================
// 5. COMMON HTML TAGS
// ============================================
/*
<h1> to <h6>     → Headings (h1 = largest)
<p>              → Paragraph
<a>              → Link/Anchor
<img>            → Image
<ul>             → Unordered list
<ol>             → Ordered list
<li>             → List item
<div>            → Container/Division
<span>           → Inline container
<br>             → Line break
<hr>             → Horizontal rule
*/

// ============================================
// 6. HTML VERSIONS
// ============================================
/*
HTML 1.0 (1993)  → First version
HTML 4.01 (1999) → Widely used
XHTML (2000)     → Stricter version
HTML5 (2014)     → Current standard ✅
*/

// ============================================
// 7. HTML vs OTHER TECHNOLOGIES
// ============================================
/*
HTML  → Structure and content (what's on page)
CSS   → Styling and appearance (how it looks)
JS    → Interactivity and behavior (what it does)
*/

// ============================================
// 8. REAL-WORLD USAGE
// ============================================
/*
Every website uses HTML:
  - News websites (headlines, articles)
  - E-commerce (product pages, forms)
  - Social media (posts, profiles)
  - Blogs (content, images)
  - All web applications
*/

// ============================================
// 9. BEST PRACTICES
// ============================================
/*
Always close tags: <p>Text</p>
Use lowercase: <p> not <P>
Nest properly: <div><p>Text</p></div>
Use semantic tags: <header>, <nav>, <article>
Add alt text to images: <img alt="description">
Validate HTML: Use W3C validator
*/
`
};

export default htmlIntroduction;

