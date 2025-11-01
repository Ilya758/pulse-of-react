export const VULNERABLE_CONFIG_MERGE_CODE = `
function applyConfig(targetConfig, newConfig) {
  for (const key in newConfig) {
    // No validation on 'key'
    if (typeof newConfig[key] === 'object' && newConfig[key] !== null) {
      if (!targetConfig[key]) {
        targetConfig[key] = {};
      }
      applyConfig(targetConfig[key], newConfig[key]); // Recursive call
    } else {
      targetConfig[key] = newConfig[key];
    }
  }
  return targetConfig;
}

// Attacker-controlled JSON payload
const maliciousConfig = JSON.parse('{"__proto__": {"isGlobalAdmin": true}}');

const userPreferences = {};

// The function merges the properties, inadvertently polluting Object.prototype
applyConfig(userPreferences, maliciousConfig);

// A completely unrelated object now has admin rights
const newSession = {};
console.log(newSession.isGlobalAdmin); // true
`;

export const SECURE_CONFIG_MERGE_CODE = `
function safeApplyConfig(targetConfig, newConfig) {
  for (const key in newConfig) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      // Block malicious keys
      console.error(\`Attempt to modify prototype with key: \${key}\`);
      continue;
    }
    if (typeof newConfig[key] === 'object' && newConfig[key] !== null) {
      if (!targetConfig[key]) {
        targetConfig[key] = {};
      }
      safeApplyConfig(targetConfig[key], newConfig[key]);
    } else {
      targetConfig[key] = newConfig[key];
    }
  }
  return targetConfig;
}

const maliciousConfig = JSON.parse('{"__proto__": {"isGlobalAdmin": true}}');

const userPreferences = {};

safeApplyConfig(userPreferences, maliciousConfig);

const newSession = {};
console.log(newSession.isGlobalAdmin); // undefined
`;

export const SECURE_OBJECT_CREATION_CODE = `
// For creating dictionary-like objects, use Object.create(null)
const secureMap = Object.create(null);

// This object has no prototype, so it cannot inherit polluted properties
// and is immune to prototype-based attacks.
secureMap.data = 'sensitive';
console.log(Object.getPrototypeOf(secureMap)); // null
`;

export const PROTOTYPE_IMMUTABILITY_CODE = `
// Make the global Object.prototype read-only.
Object.freeze(Object.prototype);
Object.freeze(Object);

// Any subsequent attempt to pollute the prototype will fail.
const maliciousInput = JSON.parse('{"__proto__": {"isSuperAdmin": true}}');
const target = {};

// This assignment will throw a TypeError in strict mode
// or fail silently in non-strict mode.
Object.assign(target, maliciousInput);

console.log({}.isSuperAdmin); // undefined
`;

export const UI_WIDGET_GADGET_CODE = `
// A hypothetical UI library's widget function
function createWidget(config = {}) {
  // Default configuration
  const defaults = { containerClass: 'widget-default' };
  
  // The 'config' object inherits the polluted property if it's not set directly.
  const containerClass = config.containerClass || defaults.containerClass;

  const widget = document.createElement('div');
  // The 'class' attribute is vulnerable to injection.
  widget.innerHTML = \`<div class="\${containerClass}">Content</div>\`;
  document.body.appendChild(widget);
}

// An attacker pollutes the prototype via a URL parameter:
// ?payload={"__proto__":{"containerClass":"dummy-class'><script>alert('XSS')</script>"}}

// When the widget is created with an empty config...
createWidget(); 

// The 'containerClass' is inherited from the polluted prototype,
// leading to an XSS payload being injected into the DOM.
`;
