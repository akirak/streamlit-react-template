// This declaration allows TypeScript to understand imports of .css files.
// It tells the TypeScript compiler that importing a .css file is a valid operation,
// typically used for loading global stylesheets or CSS Modules.
// For global stylesheets like '@xyflow/react/dist/style.css',
// this declaration prevents TypeScript from throwing an error.
declare module "*.css";
