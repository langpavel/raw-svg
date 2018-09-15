// @flow

import * as React from 'react';
import './Drawing.css';

export type RootNode = {||};

export type DrawingProps = {|
  id: string,
  name: string,
  root: RootNode,
|};

export default class Drawing extends React.Component<DrawingProps> {
  render() {
    return <div>DRAWING</div>;
  }
}
