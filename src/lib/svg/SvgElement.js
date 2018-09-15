// @flow

export type SvgElement = {
  type: 'comment' | 'text' | 'element',
  text?: string,
  name?: string,
  elements?: Array<SvgElement>,
  attributes?: {
    [attr: string]: mixed,
  },
};
