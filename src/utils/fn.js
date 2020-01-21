export const not = exp => !exp;

export const callIf = (condition, fn, ...args) => {
  if (condition) {
    fn(...args);
  }
};

export const hasLen = arr => arr.length;
