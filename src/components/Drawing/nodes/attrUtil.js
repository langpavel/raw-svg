// @flow

import possibleStandardNames from './possibleStandardNames';

export const getReactAttrName: (attr: string) => string = attr =>
  possibleStandardNames[attr] || attr;

export const domToReactProps: (attrs?: { [name: string]: mixed }) => {
  [name: string]: mixed,
} = attrs => {
  if (!attrs) return {};

  const result = Object.create(null);
  for (const [key, value] of Object.entries(attrs)) {
    result[getReactAttrName(key)] = value;
  }
  return result;
};
