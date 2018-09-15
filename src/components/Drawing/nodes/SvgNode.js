// @flow

import * as React from 'react';
import { domToReactProps } from '../../../lib/svg/attrUtil';
import { type SvgElement } from '../../../lib/svg/SvgElement';

class SvgNode extends React.Component<SvgElement> {
  render() {
    const props: SvgElement = this.props;
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
              props.elements.map((el: SvgElement) => <SvgNode {...el} />)}
          </Component>
        );
      default:
        console.error(`Unknown SVG Node: ${props.type}`, props);
        return null;
    }
  }
}

export default SvgNode;
