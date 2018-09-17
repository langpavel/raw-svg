// @flow

import * as React from 'react';
import SvgTreeNode from './nodes/SvgTreeNode';
import { type SvgNode } from '../../lib/svg/SvgNode';
import './NodeTree.css';

export type NodeTreeProps = {|
  id: string,
  fileName: string,
  childNodes: Array<SvgNode>,
|};

export default class NodeTree extends React.Component<NodeTreeProps> {
  render() {
    const { childNodes } = this.props;
    return (
      <div className="NodeTree">
        {childNodes &&
          childNodes.map((node: SvgNode) => (
            <SvgTreeNode key={node.id} {...node} />
          ))}
      </div>
    );
  }
}
