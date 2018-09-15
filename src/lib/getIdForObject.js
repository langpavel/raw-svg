const keyWeakMap = new WeakMap();
let nextKey = 1;

export const getIdForObject = element => {
  let key = keyWeakMap.get(element);
  if (key) return key;
  key = nextKey++;
  keyWeakMap.set(element, key);
  return key;
};
