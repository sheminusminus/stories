export const not = exp => !exp;

export const callIf = (condition, fn, ...args) => {
  if (condition) {
    fn(...args);
  }
};

export const valueIf = (condition, val, fallback = undefined) => {
  if (condition) {
    return val;
  }

  return fallback;
};

export const hasLen = arr => arr.length;

export const isLen = (arr, len) => arr.length === len;
