// @flow

import * as React from 'react';
import { domToReactProps } from './attrUtil';

export type SvgNodeProps = {
  type: 'comment' | 'text' | 'element',
  text?: string,
  name?: string,
  elements?: Array<SvgNodeProps>,
  attributes?: { [attr: string]: mixed },
};

class SvgNode extends React.Component<SvgNodeProps> {
  render() {
    const props: SvgNodeProps = this.props;
    switch (props.type) {
      case 'comment':
        return null;
      case 'text':
        return props.text;
      case 'element':
        const Component: string | React.ComponentType<*> = props.name || 'g';
        const reactProps = domToReactProps(props.attributes);
        return (
          <Component {...reactProps}>
            {props.elements &&
              props.elements.map((el: SvgNodeProps) => <SvgNode {...el} />)}
          </Component>
        );
      default:
        console.error(`Unknown SVG Node: ${props.type}`, props);
        return null;
    }
  }
}

export default SvgNode;
