export const callIf = (condition, fn, ...args) => {
  if (condition) {
    fn(...args);
  }
};
