// @flow

import possibleStandardNames from './possibleStandardNames';

export const getReactAttrName: (attr: string) => string = attr =>
  possibleStandardNames[attr] || attr;

export const domToReactProps: (attrs?: { [name: string]: mixed }) => {
  [name: string]: mixed,
} = attrs => {
  const result = {};
  if (!attrs) return result;
  for (const [key, value] of Object.entries(attrs)) {
    result[getReactAttrName(key)] = value;
  }
  return result;
};
