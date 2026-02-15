const cssSelectors = {
  id: 'css-selectors',
  title: 'CSS Selectors - Targeting Elements',
  description: 'Learn how to select and target HTML elements using various CSS selectors',
  content: `
# CSS Selectors — Targeting Elements

Selectors are how you tell CSS which elements to style. Understanding selectors is fundamental to CSS.

---

## Basic Selectors

### Element Selector

\`\`\`css
p {
  color: blue;
}
\`\`\`

**Selects:** All \`<p>\` elements

---

### ID Selector

\`\`\`css
#header {
  background: gray;
}
\`\`\`

**Selects:** Element with \`id="header"\`

**HTML:**
\`\`\`html
<div id="header">Header</div>
\`\`\`

**Note:** IDs should be unique (one per page)

---

### Class Selector

\`\`\`css
.button {
  background: blue;
  color: white;
}
\`\`\`

**Selects:** All elements with \`class="button"\`

**HTML:**
\`\`\`html
<button class="button">Click</button>
<a class="button">Link</a>
\`\`\`

**Note:** Classes can be used multiple times

---

## Combinator Selectors

### Descendant Selector (Space)

\`\`\`css
div p {
  color: blue;
}
\`\`\`

**Selects:** All \`<p>\` elements inside \`<div>\`

**HTML:**
\`\`\`html
<div>
  <p>This is blue</p>
  <section>
    <p>This is also blue</p>
  </section>
</div>
<p>This is NOT blue</p>
\`\`\`

---

### Child Selector (>)

\`\`\`css
div > p {
  color: blue;
}
\`\`\`

**Selects:** Only direct child \`<p>\` of \`<div>\`

**HTML:**
\`\`\`html
<div>
  <p>This is blue (direct child)</p>
  <section>
    <p>This is NOT blue (not direct)</p>
  </section>
</div>
\`\`\`

---

### Adjacent Sibling Selector (+)

\`\`\`css
h1 + p {
  color: blue;
}
\`\`\`

**Selects:** \`<p>\` immediately after \`<h1>\`

**HTML:**
\`\`\`html
<h1>Title</h1>
<p>This is blue</p>
<p>This is NOT blue</p>
\`\`\`

---

### General Sibling Selector (~)

\`\`\`css
h1 ~ p {
  color: blue;
}
\`\`\`

**Selects:** All \`<p>\` siblings after \`<h1>\`

**HTML:**
\`\`\`html
<h1>Title</h1>
<p>This is blue</p>
<div>Other content</div>
<p>This is also blue</p>
\`\`\`

---

## Attribute Selectors

### Has Attribute

\`\`\`css
[href] {
  color: blue;
}
\`\`\`

**Selects:** All elements with \`href\` attribute

---

### Attribute Equals

\`\`\`css
[type="text"] {
  border: 1px solid gray;
}
\`\`\`

**Selects:** Elements where \`type="text"\`

---

### Attribute Contains

\`\`\`css
[class*="button"] {
  background: blue;
}
\`\`\`

**Selects:** Elements with "button" in class name

**HTML:**
\`\`\`html
<button class="primary-button">Click</button>
<button class="button-secondary">Click</button>
\`\`\`

---

### Attribute Starts With

\`\`\`css
[href^="https"] {
  color: green;
}
\`\`\`

**Selects:** Links starting with "https"

---

### Attribute Ends With

\`\`\`css
[src$=".jpg"] {
  border: 2px solid blue;
}
\`\`\`

**Selects:** Images ending with ".jpg"

---

## Pseudo-class Selectors

### :hover

\`\`\`css
a:hover {
  color: red;
}
\`\`\`

**Selects:** Links when mouse hovers over them

---

### :active

\`\`\`css
button:active {
  transform: scale(0.95);
}
\`\`\`

**Selects:** Button while being clicked

---

### :focus

\`\`\`css
input:focus {
  border-color: blue;
  outline: none;
}
\`\`\`

**Selects:** Input when focused (clicked/selected)

---

### :first-child

\`\`\`css
li:first-child {
  font-weight: bold;
}
\`\`\`

**Selects:** First list item

---

### :last-child

\`\`\`css
li:last-child {
  border-bottom: none;
}
\`\`\`

**Selects:** Last list item

---

### :nth-child()

\`\`\`css
li:nth-child(2) {
  color: blue;
}

li:nth-child(even) {
  background: lightgray;
}

li:nth-child(odd) {
  background: white;
}

li:nth-child(3n) {
  color: red;
}
\`\`\`

**Selects:**
- \`nth-child(2)\` - 2nd child
- \`nth-child(even)\` - Even children
- \`nth-child(odd)\` - Odd children
- \`nth-child(3n)\` - Every 3rd child

---

### :not()

\`\`\`css
p:not(.special) {
  color: gray;
}
\`\`\`

**Selects:** All \`<p>\` except those with \`class="special"\`

---

## Pseudo-element Selectors

### ::before

\`\`\`css
p::before {
  content: "→ ";
  color: blue;
}
\`\`\`

**Adds:** Content before element

---

### ::after

\`\`\`css
p::after {
  content: " ←";
  color: blue;
}
\`\`\`

**Adds:** Content after element

---

### ::first-line

\`\`\`css
p::first-line {
  font-weight: bold;
}
\`\`\`

**Styles:** First line of paragraph

---

### ::first-letter

\`\`\`css
p::first-letter {
  font-size: 2em;
  color: red;
}
\`\`\`

**Styles:** First letter of paragraph

---

## Multiple Selectors

### Grouping

\`\`\`css
h1, h2, h3 {
  color: blue;
  font-family: Arial;
}
\`\`\`

**Selects:** All h1, h2, and h3 elements

---

### Combining

\`\`\`css
button.primary {
  background: blue;
}
\`\`\`

**Selects:** \`<button>\` elements with \`class="primary"\`

---

## Selector Specificity

When multiple rules apply, CSS uses specificity:

1. **Inline styles** (highest)
2. **IDs**
3. **Classes, attributes, pseudo-classes**
4. **Elements** (lowest)

\`\`\`css
/* Specificity: 0,0,0,1 (element) */
p { color: black; }

/* Specificity: 0,0,1,0 (class) */
.text { color: blue; }

/* Specificity: 0,1,0,0 (ID) */
#header { color: red; }

/* Specificity: 1,0,0,0 (inline) */
/* <p style="color: green;"> */
\`\`\`

**Result:** Inline > ID > Class > Element

---

## Real-Time Scenarios

### Scenario 1: Navigation Menu

\`\`\`css
/* Style all nav links */
nav a {
  color: white;
  text-decoration: none;
}

/* Hover effect */
nav a:hover {
  color: yellow;
}

/* Active page */
nav a.active {
  border-bottom: 2px solid yellow;
}
\`\`\`

### Scenario 2: Form Styling

\`\`\`css
/* All inputs */
input {
  border: 1px solid gray;
}

/* Focused input */
input:focus {
  border-color: blue;
  box-shadow: 0 0 5px blue;
}

/* Required fields */
input:required {
  border-left: 3px solid red;
}
\`\`\`

### Scenario 3: Table Striping

\`\`\`css
/* Even rows */
tr:nth-child(even) {
  background: lightgray;
}

/* Hover effect */
tr:hover {
  background: yellow;
}
\`\`\`

---

## Best Practices

1. **Use classes for reusable styles**
2. **Use IDs sparingly** (for unique elements)
3. **Keep selectors simple** - Avoid deep nesting
4. **Use semantic selectors** - \`.button\` not \`.blue-box\`
5. **Understand specificity** - Know which rule wins

---

## Summary

Selectors are how you tell CSS which elements to style. The basic selectors include element selectors like \`p\` for paragraphs, ID selectors like \`#header\` for elements with a specific ID, and class selectors like \`.button\` for elements with a specific class.

Combinators let you target elements based on their relationships. The descendant selector \`div p\` selects paragraphs inside divs, the child selector \`div > p\` selects only direct child paragraphs, the adjacent sibling \`h1 + p\` selects paragraphs immediately after headings, and the general sibling \`h1 ~ p\` selects all paragraphs that are siblings of headings.

Pseudo-classes like \`:hover\`, \`:active\`, and \`:focus\` let you style elements based on their state. Structural pseudo-classes like \`:first-child\`, \`:last-child\`, and \`:nth-child()\` let you target elements based on their position.

Pseudo-elements like \`::before\` and \`::after\` let you add content before or after elements, while \`::first-line\` and \`::first-letter\` let you style specific parts of text.

Selectors are the foundation of CSS. Understanding how to use them effectively is essential for writing good CSS.
`,
  code: `// CSS Selectors

/*
 * SELECTORS TARGET ELEMENTS
 * =========================
 * 
 * Tell CSS which elements to style
 */

// ============================================
// 1. BASIC SELECTORS
// ============================================
/*
ELEMENT:
  p { color: blue; }

ID:
  #header { background: gray; }

CLASS:
  .button { background: blue; }
*/

// ============================================
// 2. COMBINATOR SELECTORS
// ============================================
/*
DESCENDANT (space):
  div p { color: blue; }

CHILD (>):
  div > p { color: blue; }

ADJACENT SIBLING (+):
  h1 + p { color: blue; }

GENERAL SIBLING (~):
  h1 ~ p { color: blue; }
*/

// ============================================
// 3. ATTRIBUTE SELECTORS
// ============================================
/*
[href]              → Has href attribute
[type="text"]       → type equals "text"
[class*="button"]   → class contains "button"
[href^="https"]     → href starts with "https"
[src$=".jpg"]       → src ends with ".jpg"
*/

// ============================================
// 4. PSEUDO-CLASSES
// ============================================
/*
:hover       → Mouse over
:active      → Being clicked
:focus       → Focused
:first-child → First child
:last-child  → Last child
:nth-child(2) → 2nd child
:nth-child(even) → Even children
:not(.class) → Not matching selector
*/

// ============================================
// 5. PSEUDO-ELEMENTS
// ============================================
/*
::before      → Before element
::after       → After element
::first-line  → First line
::first-letter → First letter
*/

// ============================================
// 6. SPECIFICITY ORDER
// ============================================
/*
1. Inline styles (highest)
2. IDs
3. Classes, attributes
4. Elements (lowest)
*/
`
};

export default cssSelectors;

