// Function to parse and apply arbitrary value utilities
function applyArbitraryValues() {
    // Get all elements in the document
    const allElements = document.querySelectorAll('*');
    
    // Regular expression to match utility classes with arbitrary values
    // Format: property-[value]
    const utilityRegex = /^([a-z]+(?:-[a-z]+)*)-\[(.+)\]$/;
    
    // Properties map - defines which prefix maps to which CSS property
    const propertyMap = {
      'p': 'padding',
      'pt': 'padding-top',
      'pr': 'padding-right',
      'pb': 'padding-bottom',
      'pl': 'padding-left',
      'px': ['padding-left', 'padding-right'],
      'py': ['padding-top', 'padding-bottom'],
      
      'm': 'margin',
      'mt': 'margin-top',
      'mr': 'margin-right',
      'mb': 'margin-bottom',
      'ml': 'margin-left',
      'mx': ['margin-left', 'margin-right'],
      'my': ['margin-top', 'margin-bottom'],
      
      'w': 'width',
      'h': 'height',
      'max-w': 'max-width',
      'max-h': 'max-height',
      'min-w': 'min-width',
      'min-h': 'min-height',
      
      'text': 'font-size',
      'bg': 'background-color',
      'text-color': 'color',
      'rounded': 'border-radius',
      'top': 'top',
      'right': 'right',
      'bottom': 'bottom',
      'left': 'left',
      'z': 'z-index',
      'opacity': 'opacity',
      'rotate': 'transform',
      'scale': 'transform',
      'translate-x': 'transform',
      'translate-y': 'transform'
      // Add more properties as needed
    };
    
    // Units map - defines which value types should have specific units
    const unitMap = {
      'padding': 'px',
      'margin': 'px',
      'width': 'px',
      'height': 'px',
      'font-size': 'px',
      'border-radius': 'px',
      'top': 'px',
      'right': 'px',
      'bottom': 'px',
      'left': 'px'
      // Add more properties as needed
    };
    
    // Transform handlers for special cases
    const transformHandlers = {
      'rotate': (value) => `rotate(${value})`,
      'scale': (value) => `scale(${value})`,
      'translate-x': (value) => `translateX(${value})`,
      'translate-y': (value) => `translateY(${value})`
    };
  
    // Process each element
    allElements.forEach(element => {
      const classNames = element.className.split(' ');
      
      classNames.forEach(className => {
        const match = className.match(utilityRegex);
        
        if (match) {
          const [_, property, value] = match;
          
          // Check if the property exists in our map
          if (propertyMap[property]) {
            // Add units if needed
            let cssValue = value;
            
            // Handle numeric values that need units
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
              const cssProperties = Array.isArray(propertyMap[property]) 
                ? propertyMap[property] 
                : [propertyMap[property]];
                
              cssProperties.forEach(cssProp => {
                // Add units if this property typically needs them
                for (const [propPrefix, unit] of Object.entries(unitMap)) {
                  if (cssProp.startsWith(propPrefix)) {
                    cssValue = `${value}${unit}`;
                    break;
                  }
                }
                
                // Handle special transform properties
                if (transformHandlers[property]) {
                  element.style.transform = transformHandlers[property](cssValue);
                } else {
                  // Apply the style
                  element.style[cssProp] = cssValue;
                }
              });
            } else {
              // For non-numeric values (like colors, etc.)
              const cssProperties = Array.isArray(propertyMap[property]) 
                ? propertyMap[property] 
                : [propertyMap[property]];
                
              cssProperties.forEach(cssProp => {
                // Apply the style
                element.style[cssProp] = cssValue;
              });
            }
          }
        }
      });
    });
  }
  
  // Run initially when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', applyArbitraryValues);
  
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || 
          (mutation.type === 'attributes' && mutation.attributeName === 'class')) {
        applyArbitraryValues();
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  
  // Export for use as an npm package
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      applyArbitraryValues
    };
  }