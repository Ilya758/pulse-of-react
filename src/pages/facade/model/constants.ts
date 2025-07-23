export const FACADE_SIGNATURE_CODE = `// Facade Function Signature\n// Provides a simplified interface to a complex subsystem or 3rd-party library\nfunction createApiFacade(api) {\n  return {\n    getUser: (id) => api.fetchUser(id),\n    updateUser: (id, data) => api.updateUser(id, data),\n    // ...other simplified methods\n  };\n}\n\n// Usage\nconst apiFacade = createApiFacade(realApi);\napiFacade.getUser(123);\n`;

export const COLOR_NAMES = [
  'blue',
  'teal',
  'cyan',
  'grape',
  'violet',
  'indigo',
  'green',
  'red',
  'orange',
  'yellow',
  'pink',
  'lime',
];

