// @flow

import * as React from 'react';
import SvgNode from './nodes/SvgNode';
import { type SvgElement } from '../../lib/svg/SvgElement';

export type RootNode = {||};

export type DrawingProps = {|
  id: string,
  name: string,
  root: SvgElement,
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
