// @flow

import * as React from 'react';
import SvgNode, { type SvgNodeProps } from './nodes/SvgNode';

export type RootNode = {||};

export type DrawingProps = {|
  id: string,
  name: string,
  root: SvgNodeProps,
|};

export default class Drawing extends React.Component<DrawingProps> {
  render() {
    return (
      <div>
        <SvgNode {...this.props.root} />
      </div>
    );
  }
}
