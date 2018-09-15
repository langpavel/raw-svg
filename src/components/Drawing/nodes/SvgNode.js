// @flow

import * as React from 'react';
import { domToReactProps } from './attrUtil';

export type SvgNodeProps =
  | {
      type: 'comment',
      comment: string,
    }
  | {
      type: 'text',
      text: string,
    }
  | {
      type: 'element',
      name: string,
      elements: Array<SvgNodeProps>,
      attributes: { [attr: string]: mixed },
    };

class SvgNode extends React.Component<SvgNodeProps> {
  render() {
    switch (this.props.type) {
      case 'comment':
        return null;
      case 'text':
        return this.props.text;
      case 'element':
        const Component: string | React.ComponentType<*> = this.props.name;
        return (
          <Component {...domToReactProps(this.props.attributes) || {}}>
            {this.props.elements &&
              this.props.elements.map(el => <SvgNode {...el} />)}
          </Component>
        );
      default:
        console.error(`Unknown SVG Node: ${this.props.type}`, this.props);
        return null;
    }
  }
}

export default SvgNode;
