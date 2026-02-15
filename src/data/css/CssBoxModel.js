const cssBoxModel = {
  id: 'css-box-model',
  title: 'CSS Box Model - Margin, Padding, Border',
  description: 'Understand the CSS box model - how margin, padding, border, and content work together',
  content: `
# CSS Box Model — Understanding Layout

The box model is fundamental to CSS. Every element is a box with content, padding, border, and margin.

---

## What is the Box Model?

Every HTML element is a rectangular box with four areas:

\`\`\`
┌─────────────────────────────────┐ ← Margin (outside)
│ ┌─────────────────────────────┐ │
│ │ ┌─────────────────────────┐ │ │ ← Border
│ │ │ ┌─────────────────────┐ │ │ │
│ │ │ │     Padding         │ │ │ │
│ │ │ │ ┌─────────────────┐ │ │ │ │
│ │ │ │ │    Content      │ │ │ │ │
│ │ │ │ └─────────────────┘ │ │ │ │
│ │ │ └─────────────────────┘ │ │ │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
\`\`\`

**From inside to outside:**
1. **Content** - Actual content (text, images)
2. **Padding** - Space inside border
3. **Border** - Border around padding
4. **Margin** - Space outside border

---

## Content

The actual content of the element:

\`\`\`css
div {
  width: 200px;
  height: 100px;
}
\`\`\`

**Sets:** Size of content area

---

## Padding

Space between content and border:

\`\`\`css
div {
  padding: 20px;              /* All sides */
  padding: 10px 20px;          /* Top/Bottom, Left/Right */
  padding: 10px 20px 30px;    /* Top, Left/Right, Bottom */
  padding: 10px 20px 30px 40px; /* Top, Right, Bottom, Left */
}
\`\`\`

**Individual sides:**
\`\`\`css
div {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}
\`\`\`

---

## Border

Border around padding:

\`\`\`css
div {
  border: 2px solid black;
}
\`\`\`

**Shorthand:** \`border: width style color;\`

**Individual properties:**
\`\`\`css
div {
  border-width: 2px;
  border-style: solid;
  border-color: black;
}
\`\`\`

**Border styles:**
- \`solid\` - Solid line
- \`dashed\` - Dashed line
- \`dotted\` - Dotted line
- \`double\` - Double line
- \`none\` - No border

**Individual sides:**
\`\`\`css
div {
  border-top: 2px solid red;
  border-right: 3px dashed blue;
  border-bottom: 1px dotted green;
  border-left: 4px solid black;
}
\`\`\`

**Border radius (rounded corners):**
\`\`\`css
div {
  border-radius: 10px;        /* All corners */
  border-radius: 10px 20px;   /* Top-left/Bottom-right, Top-right/Bottom-left */
  border-radius: 10px 20px 30px 40px; /* Each corner */
}
\`\`\`

---

## Margin

Space outside border (between elements):

\`\`\`css
div {
  margin: 20px;               /* All sides */
  margin: 10px 20px;          /* Top/Bottom, Left/Right */
  margin: 10px 20px 30px;    /* Top, Left/Right, Bottom */
  margin: 10px 20px 30px 40px; /* Top, Right, Bottom, Left */
}
\`\`\`

**Individual sides:**
\`\`\`css
div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
\`\`\`

**Auto margin (centering):**
\`\`\`css
div {
  width: 500px;
  margin: 0 auto;  /* Centers horizontally */
}
\`\`\`

---

## Box Sizing

### Content Box (Default)

\`\`\`css
div {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200 + 20*2 + 5*2 = 250px */
}
\`\`\`

**Total width = width + padding + border**

---

### Border Box (Recommended)

\`\`\`css
div {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (includes padding and border) */
}
\`\`\`

**Total width = width (includes padding and border)**

**Best Practice:** Use \`box-sizing: border-box\` for all elements:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

---

## Complete Example

\`\`\`css
.card {
  /* Content */
  width: 300px;
  height: 200px;
  
  /* Padding */
  padding: 20px;
  
  /* Border */
  border: 2px solid #ddd;
  border-radius: 8px;
  
  /* Margin */
  margin: 20px;
  
  /* Box sizing */
  box-sizing: border-box;
}
\`\`\`

---

## Real-Time Scenarios

### Scenario 1: Card Component

\`\`\`css
.product-card {
  width: 300px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 15px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

### Scenario 2: Button with Padding

\`\`\`css
.button {
  padding: 12px 24px;
  border: 2px solid blue;
  border-radius: 5px;
  margin: 10px;
  background: blue;
  color: white;
}
\`\`\`

### Scenario 3: Container with Spacing

\`\`\`css
.container {
  max-width: 1200px;
  margin: 0 auto;  /* Centers container */
  padding: 20px;
  box-sizing: border-box;
}
\`\`\`

---

## Margin Collapse

When two vertical margins meet, they collapse (only the larger one applies):

\`\`\`css
.box1 {
  margin-bottom: 20px;
}

.box2 {
  margin-top: 30px;
}

/* Space between = 30px (not 50px) */
\`\`\`

**Horizontal margins don't collapse** - they add up.

---

## Negative Margins

\`\`\`css
div {
  margin-top: -10px;  /* Moves element up */
  margin-left: -20px; /* Moves element left */
}
\`\`\`

**Use carefully** - Can cause layout issues.

---

## Best Practices

1. **Use \`box-sizing: border-box\`** - Easier calculations
2. **Use consistent spacing** - Create spacing scale
3. **Avoid negative margins** - Use positioning instead
4. **Understand margin collapse** - Know when it happens
5. **Use shorthand** - \`padding: 10px 20px;\` not individual properties

---

## Summary

The CSS box model describes how every element is structured. Each element has four main components: the content area (where your actual content lives), padding (the space between the content and the border), the border (a line around the padding), and margin (the space outside the border that separates elements).

Box sizing controls how the width and height are calculated. With \`content-box\` (the default), the width only includes the content area, so padding and border are added on top. With \`border-box\` (recommended), the width includes content, padding, and border, making it much easier to size elements correctly.

You can use shorthand properties to set all sides at once. For padding and margin, use \`padding: top right bottom left;\` or \`margin: top right bottom left;\`. For borders, use \`border: width style color;\` to set all border properties at once.

Understanding the box model is essential for CSS layout. Once you understand how content, padding, border, and margin work together, you'll be able to create layouts with confidence.
`,
  code: `// CSS Box Model

/*
 * BOX MODEL = CONTENT + PADDING + BORDER + MARGIN
 * ================================================
 */

// ============================================
// 1. BOX MODEL STRUCTURE
// ============================================
/*
From inside to outside:
  1. Content    → Actual content
  2. Padding    → Space inside border
  3. Border     → Border around padding
  4. Margin     → Space outside border
*/

// ============================================
// 2. PADDING
// ============================================
/*
padding: 20px;                    → All sides
padding: 10px 20px;              → Top/Bottom, Left/Right
padding: 10px 20px 30px 40px;    → Top, Right, Bottom, Left

INDIVIDUAL:
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
*/

// ============================================
// 3. BORDER
// ============================================
/*
SHORTHAND:
  border: 2px solid black;

INDIVIDUAL:
  border-width: 2px;
  border-style: solid;
  border-color: black;

STYLES:
  solid, dashed, dotted, double, none

BORDER RADIUS:
  border-radius: 10px;
  border-radius: 10px 20px 30px 40px;
*/

// ============================================
// 4. MARGIN
// ============================================
/*
margin: 20px;                    → All sides
margin: 10px 20px;              → Top/Bottom, Left/Right
margin: 10px 20px 30px 40px;    → Top, Right, Bottom, Left

AUTO (centering):
  margin: 0 auto;  → Centers horizontally
*/

// ============================================
// 5. BOX SIZING
// ============================================
/*
CONTENT-BOX (default):
  width = content only
  Total = width + padding + border

BORDER-BOX (recommended):
  width = content + padding + border
  Total = width

BEST PRACTICE:
  * {
      box-sizing: border-box;
  }
*/
`
};

export default cssBoxModel;

