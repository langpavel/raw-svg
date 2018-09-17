// @flow

import * as React from 'react';
import { domToReactProps } from '../../../lib/svg/attrUtil';
import { type SvgNode } from '../../../lib/svg/SvgNode';

class SvgNodeRenderer extends React.Component<SvgNode> {
  render() {
    const props: SvgNode = this.props;
    switch (props.__typename) {
      case 'SvgComment':
        return null;
      case 'SvgText':
        return props.text;
      case 'SvgDocument':
      case 'SvgElement':
        const Component: string | React.ComponentType<*> = props.name || 'g';
        const reactProps = domToReactProps(props.attributes);
        return (
          <Component {...reactProps}>
            {props.childNodes &&
              props.childNodes.map((el: SvgNode) => (
                <SvgNodeRenderer key={el.id} {...el} />
              ))}
          </Component>
        );
      default:
        console.error(`Unknown SVG Node: ${props.__typename}`, props);
        return null;
    }
  }
}

export default SvgNodeRenderer;
