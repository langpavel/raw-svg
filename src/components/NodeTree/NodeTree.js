// @flow

import * as React from 'react';
import SvgTreeNode from './nodes/SvgTreeNode';
import { type SvgElement } from '../../lib/svg/SvgElement';
import './NodeTree.css';

export type RootNode = {||};

export type NodeTreeProps = {|
  id: string,
  name: string,
  root: SvgElement,
|};

export default class NodeTree extends React.Component<NodeTreeProps> {
  render() {
    return (
      <div className="NodeTree">
        <SvgTreeNode {...this.props.root} />
      </div>
    );
  }
}
