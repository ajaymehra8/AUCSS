function applyArbitraryValues() {
  const allElements = document.querySelectorAll("*");
  const utilityRegex = /^([a-z]+(?:-[a-z]+)*)-\[(.+)\]$/;

  
  // Add base .card styles dynamically
document.querySelectorAll(".card").forEach((element) => {
  element.style.backgroundColor = "#fff";
  element.style.borderRadius = "10px";
  element.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.1)";
  element.style.padding = "1rem";
  element.style.border = "1px solid #ddd";
  element.style.transition = "all 0.3s ease";
});
document.querySelectorAll(".card-hover").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.boxShadow = "0 0.8rem 2rem rgba(0, 0, 0, 0.15)";
    element.style.transform = "translateY(-5px)";
  });
  element.addEventListener("mouseleave", () => {
    element.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.1)";
    element.style.transform = "translateY(0)";
  });
});

// In your applyArbitraryValues function (or in a separate JS section), 
// add styles for images inside cards.
document.querySelectorAll(".card img").forEach((img) => {
  img.style.width = "100%";
  img.style.height = "auto";
  img.style.borderRadius = "8px 8px 0 0";  // Optional: to round image corners
});

document.querySelectorAll(".card-image").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = "scale(1.05)";
    element.style.transition = "transform 0.3s ease";
  });
  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1)";
  });
});

document.querySelectorAll('[class*="border-"]').forEach((el) => {
  const classList = Array.from(el.classList);

  classList.forEach(className => {
    if (className.startsWith("border-solid[")) {
      const value = className.match(/border-solid\[(.*)\]/)[1];
      el.style.borderStyle = "solid";
      el.style.borderWidth = value.split("_")[0];
      el.style.borderColor = value.split("_")[1];
    }

    if (className.startsWith("border-dashed[")) {
      const value = className.match(/border-dashed\[(.*)\]/)[1];
      el.style.borderStyle = "dashed";
      el.style.borderWidth = value.split("_")[0];
      el.style.borderColor = value.split("_")[1];
    }

    if (className.startsWith("border-dotted[")) {
      const value = className.match(/border-dotted\[(.*)\]/)[1];
      el.style.borderStyle = "dotted";
      el.style.borderWidth = value.split("_")[0];
      el.style.borderColor = value.split("_")[1];
    }
  });
});


document.querySelectorAll('[class*="border["]').forEach((el) => {
  const className = Array.from(el.classList).find(c => c.startsWith("border["));
  if (className) {
    const value = className.match(/border\[(.*)\]/)[1];
    const cssValue = value.replace(/_/g, ' ');
    el.style.border = cssValue;
  }
});




  const propertyMap = {
    p: "padding",
    pt: "padding-top",
    pr: "padding-right",
    pb: "padding-bottom",
    pl: "padding-left",
    px: ["padding-left", "padding-right"],
    py: ["padding-top", "padding-bottom"],

    m: "margin",
    mt: "margin-top",
    mr: "margin-right",
    mb: "margin-bottom",
    ml: "margin-left",
    mx: ["margin-left", "margin-right"],
    my: ["margin-top", "margin-bottom"],

    w: "width",
    h: "height",
    "max-w": "max-width",
    "max-h": "max-height",
    "min-w": "min-width",
    "min-h": "min-height",

    text: "font-size",
    bg: "background-color",
    "text-color": "color",
    rounded: "border-radius",
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    z: "z-index",
    opacity: "opacity",
    rotate: "transform",
    scale: "transform",
    "translate-x": "transform",
    "translate-y": "transform",
    outline: "outline",
    "outline-offset": "outline-offset",
    "text-decoration": "text-decoration",
    "text-transform": "text-transform",
    transition: "transition",
    duration: "transition-duration",
    leading: "line-height",
  };

  const unitMap = {
    padding: "px",
    margin: "px",
    width: "px",
    height: "px",
    "font-size": "px",
    "border-radius": "px",
    top: "px",
    right: "px",
    bottom: "px",
    left: "px",
    "transition-duration": "ms",
    "line-height": "px", 
  };


  const transformHandlers = {
    rotate: (value) => `rotate(${value})`,
    scale: (value) => `scale(${value})`,
    "translate-x": (value) => `translateX(${value})`,
    "translate-y": (value) => `translateY(${value})`,
  };

  const gapValues = {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
  };

  const lineHeightValues = {
    tight: "1.25",
    normal: "1.5",
    loose: "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
  };
  
  
  const bgUtils = {
    "bg-cover": ["backgroundSize", "cover"],
    "bg-contain": ["backgroundSize", "contain"],
    "bg-center": ["backgroundPosition", "center"],
    "bg-top": ["backgroundPosition", "top"],
    "bg-bottom": ["backgroundPosition", "bottom"],
    "bg-left": ["backgroundPosition", "left"],
    "bg-right": ["backgroundPosition", "right"],
    "bg-repeat": ["backgroundRepeat", "repeat"],
    "bg-no-repeat": ["backgroundRepeat", "no-repeat"],
    "bg-repeat-x": ["backgroundRepeat", "repeat-x"],
    "bg-repeat-y": ["backgroundRepeat", "repeat-y"],
    "bg-fixed": ["backgroundAttachment", "fixed"],
    "bg-local": ["backgroundAttachment", "local"],
    "bg-scroll": ["backgroundAttachment", "scroll"],
  };


  allElements.forEach((element) => {
    const classNames = element.className.split(" ");
  
    classNames.forEach((className) => {
      // Handle line-height utilities with arbitrary values like leading-[5]
      if (/^leading-\[(.+)\]$/.test(className)) {
        const value = className.match(/^leading-\[(.+)\]$/)[1];
        element.style.lineHeight = value;
        return;
      }
  
      // Handle predefined line-height classes like leading-tight, leading-normal, etc.
      if (className.startsWith("leading-")) {
        const parts = className.split("-");
        const val = parts[1];
  
        if (lineHeightValues[val]) {
          element.style.lineHeight = lineHeightValues[val];
          return;
        }
      }
  
      // ... other utility classes (e.g., margin, padding, etc.)
    });

  });

  

  allElements.forEach((element) => {
    const classNames = element.className.split(" ");

    classNames.forEach((className) => {
      // Outline Utilities
      if (/^outline-\[(.+)\]$/.test(className)) {
        const value = className.match(/^outline-\[(.+)\]$/)[1];
        element.style.outline = `1px solid ${value}`;
        return;
      }

      if (/^outline-offset-\[(.+)\]$/.test(className)) {
        const value = className.match(/^outline-offset-\[(.+)\]$/)[1];
        element.style.outlineOffset = value;
        return;
      }

      if (className.startsWith("outline-")) {
        const parts = className.split("-");
        const val = parts[1];
        if (val >= 1 && val <= 5) {
          element.style.outline = `${val}px solid black`;
          return;
        }
        if (val === "none") {
          element.style.outline = "none";
        }
      }

      // Text-decoration Utilities
      if (className === "underline") {
        element.style.textDecoration = "underline";
        return;
      }
      if (className === "line-through") {
        element.style.textDecoration = "line-through";
        return;
      }
      if (className === "no-underline") {
        element.style.textDecoration = "none";
        return;
      }
      if (className.startsWith("underline-")) {
        const color = className.split("-")[1];
        element.style.textDecoration = `underline ${color}`;
        return;
      }
      if (className.startsWith("line-through-")) {
        const color = className.split("-")[2];
        element.style.textDecoration = `line-through ${color}`;
        return;
      }

      // Text-transform Utilities
      if (className === "uppercase") {
        element.style.textTransform = "uppercase";
        return;
      }
      if (className === "lowercase") {
        element.style.textTransform = "lowercase";
        return;
      }
      if (className === "capitalize") {
        element.style.textTransform = "capitalize";
        return;
      }
      if (className === "normal-case") {
        element.style.textTransform = "none";
        return;
      }

      // Gap: Arbitrary values
      if (/^gap-\[(.+)\]$/.test(className)) {
        const value = className.match(/^gap-\[(.+)\]$/)[1];
        element.style.gap = value;
        return;
      }

      if (/^gap-x-\[(.+)\]$/.test(className)) {
        const value = className.match(/^gap-x-\[(.+)\]$/)[1];
        element.style.columnGap = value;
        return;
      }

      if (/^gap-y-\[(.+)\]$/.test(className)) {
        const value = className.match(/^gap-y-\[(.+)\]$/)[1];
        element.style.rowGap = value;
        return;
      }

      // Gap: Predefined values
      if (className.startsWith("gap-")) {
        const parts = className.split("-");
        const val = parts[1];
        if (gapValues[val]) {
          element.style.gap = gapValues[val];
          return;
        }
      }

 
      if (className.startsWith("gap-x-")) {
        const parts = className.split("-");
        const val = parts[2];
        if (gapValues[val]) {
          element.style.columnGap = gapValues[val];
          return;
        }
      }

      if (className.startsWith("gap-y-")) {
        const parts = className.split("-");
        const val = parts[2];
        if (gapValues[val]) {
          element.style.rowGap = gapValues[val];
          return;
        }
      }
      // Hover utility like hover:bg-[red] or hover:text-[20px]
if (/^hover:([a-z-]+)-\[(.+)\]$/.test(className)) {
  const [, utility, rawValue] = className.match(/^hover:([a-z-]+)-\[(.+)\]$/);
  const cssProps = Array.isArray(propertyMap[utility])
    ? propertyMap[utility]
    : [propertyMap[utility]];

  const isNumeric = !isNaN(parseFloat(rawValue)) && isFinite(rawValue);
  let hoverValue = rawValue;

  cssProps.forEach((cssProp) => {
    if (isNumeric && unitMap[cssProp]) {
      hoverValue = `${rawValue}${unitMap[cssProp]}`;
    }

    // Save original value for revert
    const originalValue = element.style[cssProp] || "";

    element.addEventListener("mouseenter", () => {
      if (transformHandlers[utility]) {
        element.style.transform = transformHandlers[utility](hoverValue);
      } else {
        element.style[cssProp] = hoverValue;
      }
    });

    element.addEventListener("mouseleave", () => {
      if (transformHandlers[utility]) {
        element.style.transform = "";
      } else {
        element.style[cssProp] = originalValue;
      }
    });
  });

  return; // Skip further processing
}


      // Background utilities
      if (bgUtils[className]) {
        const [styleProp, value] = bgUtils[className];
        element.style[styleProp] = value;
        return;
      }

      // Arbitrary utilities like p-[20px], bg-[url(...)], etc.
      const match = className.match(utilityRegex);
      if (match) {
        const [, property, rawValue] = match;
        let value = rawValue;

        if (property === "bg" && value.startsWith("url(")) {
          const cleaned = value
            .replace(/^url\(['"]?/, "url(")
            .replace(/['"]?\)$/, ")");
          element.style.backgroundImage = cleaned;
          return;
        }
        if (/^leading-\[(.+)\]$/.test(className)) {
          const value = className.match(/^leading-\[(.+)\]$/)[1];
          element.style.lineHeight = value;
          return;
        }
      
        // Handle predefined line-height classes like leading-tight, leading-normal, etc.
        if (className.startsWith("leading-")) {
          const parts = className.split("-");
          const val = parts[1];
      
          if (lineHeightValues[val]) {
            element.style.lineHeight = lineHeightValues[val];
            return;
          }
        }

     
      
        // ✅ Handle letter-spacing utilities like tracking-[2px]
        if (/^tracking-\[(.+)\]$/.test(className)) {
          const value = className.match(/^tracking-\[(.+)\]$/)[1];
          element.style.letterSpacing = value;
          return;
        }
      
        // ✅ Handle predefined letter-spacing like tracking-tight
        if (className.startsWith("tracking-")) {
          const parts = className.split("-");
          const val = parts[1];
          const spacingMap = {
            tighter: "-0.05em",
            tight: "-0.025em",
            normal: "0em",
            wide: "0.025em",
            wider: "0.05em",
            widest: "0.1em"
          };
      
          if (spacingMap[val]) {
            element.style.letterSpacing = spacingMap[val];
            return;
          }
        }

        if (propertyMap[property]) {
          const cssProps = Array.isArray(propertyMap[property])
            ? propertyMap[property]
            : [propertyMap[property]];

          const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
          let cssValue = value;

          cssProps.forEach((cssProp) => {
            if (isNumeric) {
              for (const [prefix, unit] of Object.entries(unitMap)) {
                if (cssProp.startsWith(prefix)) {
                  cssValue = `${value}${unit}`;
                  break;
                }
              }
            }

            if (transformHandlers[property]) {
              element.style.transform = transformHandlers[property](cssValue);
            } else {
              element.style[cssProp] = cssValue;
            }
          });
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", applyArbitraryValues);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === "childList" ||
      (mutation.type === "attributes" && mutation.attributeName === "class")
    ) {
      applyArbitraryValues();
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    applyArbitraryValues,
  };
}
