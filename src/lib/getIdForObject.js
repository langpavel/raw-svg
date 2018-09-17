const keyWeakMap = new WeakMap();
let nextKey = 1;

export const genSerial = () => nextKey++;

export const getIdForObject = element => {
  let key = keyWeakMap.get(element);
  if (key) return key;
  key = genSerial();
  keyWeakMap.set(element, key);
  return key;
};
