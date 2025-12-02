module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }, // so Jest runs in current Node
    ],
    [
      '@babel/preset-react',
      { runtime: 'automatic' }, // so you don't need to import React
    ],
    '@babel/preset-typescript', // handles .ts/.tsx
  ],
};
