# 💅 au-css

A lightweight utility-first CSS framework inspired by Tailwind — designed to give you common utilities and support for arbitrary values like `p-[20px]` or `w-[100%]`.

[![npm version](https://img.shields.io/npm/v/au-css.svg?style=flat-square)](https://www.npmjs.org/package/au-css)
[![npm downloads](https://img.shields.io/npm/dm/au-css.svg?style=flat-square)](https://npm-stat.com/charts.html?package=au-css)
[![gzip size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/au-css@latest/dest/index.css?compression=gzip&style=flat-square)](https://cdn.jsdelivr.net/npm/au-css@latest/dest/index.css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🚀 Installation

### Option 1: Using via CDN

Add this to your HTML `<head>`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/au-css@latest/dest/index.css" />
```

And add this before your `</body>` tag (for support of arbitrary values):
```html
<script src="https://cdn.jsdelivr.net/npm/au-css@latest/js/arbitary-values.js"></script>
```

#### ✅ Example:

```html
<div class="bg-red text-white p-[40px] rounded hover:bg-[blue]">
  Hello from AU-CSS!
</div>
```

### Option 2: Using via NPM (Recommended for React/Next.js)

1. Install the package:
```bash
npm install au-css
```

2. Import in your app:

For Next.js:
In `pages/_app.js` or `pages/_app.tsx`:
```js
import 'au-css/dest/index.css'; // Main styles
import 'au-css/js/arbitary-values.js'; // Optional: Enables support for custom utilities like p-[40px]
```

#### ✅ Usage in JSX:

```jsx
<div className="bg-blue text-white w-[300px] rounded-full hover:scale-[1.05]">
  Welcome to AU-CSS 🚀
</div>
```

## ✨ Features

- Utility-first classes (like `p-4`, `m-2`, `rounded`, `text-center`)
- Arbitrary value support (`p-[30px]`, `w-[50%]`, etc.)
- Hover effects for arbitrary utilities (`hover:bg-[blue]`, `hover:scale-[1.05]`, etc.)
- Background utilities (`bg-cover`, `bg-center`, `bg-no-repeat`, etc.)
- Outline utilities (`outline-[color]`, `outline-offset-[value]`, `outline-1`, etc.)
- Text transform utilities (`uppercase`, `lowercase`, `capitalize`, `normal-case`)
- Line height utilities (`leading-[value]`, `leading-tight`, `leading-normal`, etc.)
- Letter spacing utilities (`tracking-[value]`, `tracking-tight`, `tracking-wide`, etc.)
- Card UI utility classes (`.card`, `.card-hover`, `.card img`, `.card-image`)
- Real-time DOM watching with MutationObserver for new elements
- Responsive utility compatibility for future extension (`sm:`, `md:`, etc.)
- Extended arbitrary value support for various utilities (`p-[20px]`, `gap-[10px]`, `rotate-[15deg]`, etc.)
- CDN & NPM support
- Small, customizable, and extendable

## 📂 Folder Structure

```
au-css/
│
├── dest/
│   └── index.css               # Compiled CSS
│
├── js/
│   └── arbitrary-values.js     # Script to apply arbitrary value classes
```

## 🛠️ Custom Class Support

Supports:
- `p-[value]` (padding)
- `m-[value]` (margin)
- `w-[value]` (width)
- `h-[value]` (height)
- `hover:bg-[value]` (hover background)
- `hover:scale-[value]` (hover scale)
- `outline-[value]` (outline color)
- `outline-offset-[value]` (outline offset)
- `leading-[value]` (line height)
- `tracking-[value]` (letter spacing)
- `gap-[value]` (grid/flex gap)
- `rotate-[value]` (rotation)
- and more...

Examples: 
- `p-[50px]`, `w-[70%]`, `m-[1rem]`
- `hover:bg-[#ff5500]`, `hover:scale-[1.1]`
- `outline-[blue]`, `outline-offset-[3px]`
- `leading-[1.5]`, `tracking-[0.1em]`

## 📌 Text Utilities

Control text presentation with utilities:
- Text transform: `uppercase`, `lowercase`, `capitalize`, `normal-case`
- Line height: `leading-tight`, `leading-normal`, `leading-[2.5]`
- Letter spacing: `tracking-tight`, `tracking-wide`, `tracking-[0.05em]`

## 🖼️ Background Utilities

Easily control background behavior:
- `bg-cover`, `bg-contain`
- `bg-center`, `bg-top`, `bg-bottom`
- `bg-no-repeat`, `bg-repeat-x`, `bg-repeat-y`

## 🃏 Card Component Utilities

Build card layouts quickly:
```html
<div class="card">
  <div class="card-image">
    <img src="image.jpg" alt="Card image">
  </div>
  <div class="p-4">
    <h3 class="text-lg">Card Title</h3>
    <p>Card content goes here</p>
  </div>
</div>
```

Add hover effects with `.card-hover`

## 📱 Responsive Design

Future-ready with responsive prefixes:
- `sm:text-center`
- `md:w-[50%]`
- `lg:flex`

## 🔗 CDN Reference

Provided via jsDelivr:

```
https://cdn.jsdelivr.net/npm/au-css@latest/dest/index.css
https://cdn.jsdelivr.net/npm/au-css@latest/js/arbitary-values.js
```

## 📃 License

MIT

## 🤝 Contribute

PRs are welcome! Feel free to fork and improve the project.

```bash
# Clone the repository
git clone https://github.com/ajaymehra8/au-css.git

# Install dependencies
npm install

# Build the project
npm run build
```