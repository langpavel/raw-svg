// @flow

export type SvgAttributes = {
  id?: string,
  className?: string,
  xlinkHref?: string,
  [attr: string]: mixed,
};

export type SvgNode = {
  __typename:
    | 'SvgElement'
    | 'SvgText'
    | 'SvgCData'
    | 'SvgProcessingInstruction'
    | 'SvgComment'
    | 'SvgDocument',
  id: number | string,
  comment?: string,
  text?: string,
  name?: string,
  childNodes?: ?Array<SvgNode>,
  attributes?: SvgAttributes,
};
