// @flow

export type SvgAttributes = {
  id?: string,
  class?: string,
  className?: string,
  xlinkhref?: string,
  'xlink:href'?: string,
  xlinkHref?: string,
  [attr: string]: mixed,
};

export type SvgElement = {
  type: 'comment' | 'text' | 'element',
  comment?: string,
  text?: string,
  name?: string,
  elements?: Array<SvgElement>,
  attributes?: SvgAttributes,
};
