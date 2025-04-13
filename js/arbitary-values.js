function applyArbitraryValues() {
  const allElements = document.querySelectorAll('*');
  const utilityRegex = /^([a-z]+(?:-[a-z]+)*)-\[(.+)\]$/;

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
    'translate-y': 'transform',
  };

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
    'left': 'px',
  };

  const transformHandlers = {
    'rotate': (value) => `rotate(${value})`,
    'scale': (value) => `scale(${value})`,
    'translate-x': (value) => `translateX(${value})`,
    'translate-y': (value) => `translateY(${value})`,
  };

  const gapValues = {
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem'
  };

  const bgUtils = {
    'bg-cover': ['backgroundSize', 'cover'],
    'bg-contain': ['backgroundSize', 'contain'],
    'bg-center': ['backgroundPosition', 'center'],
    'bg-top': ['backgroundPosition', 'top'],
    'bg-bottom': ['backgroundPosition', 'bottom'],
    'bg-left': ['backgroundPosition', 'left'],
    'bg-right': ['backgroundPosition', 'right'],
    'bg-repeat': ['backgroundRepeat', 'repeat'],
    'bg-no-repeat': ['backgroundRepeat', 'no-repeat'],
    'bg-repeat-x': ['backgroundRepeat', 'repeat-x'],
    'bg-repeat-y': ['backgroundRepeat', 'repeat-y'],
    'bg-fixed': ['backgroundAttachment', 'fixed'],
    'bg-local': ['backgroundAttachment', 'local'],
    'bg-scroll': ['backgroundAttachment', 'scroll']
  };

  allElements.forEach(element => {
    const classNames = element.className.split(' ');

    classNames.forEach(className => {
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
      if (className.startsWith('gap-')) {
        const parts = className.split('-');
        const val = parts[1];
        if (gapValues[val]) {
          element.style.gap = gapValues[val];
          return;
        }
      }

      if (className.startsWith('gap-x-')) {
        const parts = className.split('-');
        const val = parts[2];
        if (gapValues[val]) {
          element.style.columnGap = gapValues[val];
          return;
        }
      }

      if (className.startsWith('gap-y-')) {
        const parts = className.split('-');
        const val = parts[2];
        if (gapValues[val]) {
          element.style.rowGap = gapValues[val];
          return;
        }
      }

      // Background utilities
      if (bgUtils[className]) {
        const [styleProp, value] = bgUtils[className];
        element.style[styleProp] = value;
        return;
      }

      // Arbitrary utilities like p-[20px], bg-[url(...)]
      const match = className.match(utilityRegex);
      if (match) {
        const [, property, rawValue] = match;
        let value = rawValue;

        if (property === 'bg' && value.startsWith('url(')) {
          const cleaned = value.replace(/^url\(['"]?/, 'url(').replace(/['"]?\)$/, ')');
          element.style.backgroundImage = cleaned;
          return;
        }

        if (propertyMap[property]) {
          const cssProps = Array.isArray(propertyMap[property])
            ? propertyMap[property]
            : [propertyMap[property]];

          const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
          let cssValue = value;

          cssProps.forEach(cssProp => {
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

document.addEventListener('DOMContentLoaded', applyArbitraryValues);

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (
      mutation.type === 'childList' ||
      (mutation.type === 'attributes' && mutation.attributeName === 'class')
    ) {
      applyArbitraryValues();
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    applyArbitraryValues
  };
}
