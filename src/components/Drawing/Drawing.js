// @flow

import * as React from 'react';
import SvgNodeRenderer from './nodes/SvgNodeRenderer';
import { type SvgNode } from '../../lib/svg/SvgNode';

export type DrawingProps = {
  fileName: string,
  childNodes: Array<SvgNode>,
};

export default class Drawing extends React.Component<DrawingProps> {
  render() {
    const { childNodes } = this.props;
    return (
      <div>
        {childNodes &&
          childNodes.map((node: SvgNode) => (
            <SvgNodeRenderer key={node.id} {...node} />
          ))}
      </div>
    );
  }
}
