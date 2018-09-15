// @flow

import * as React from 'react';
import cx from 'classnames';
import { type SvgElement } from '../../../lib/svg/SvgElement';
import { getIdForObject } from '../../../lib/getIdForObject';
import SvgNodeAttributes from './SvgNodeAttributes';

import './SvgTreeNode.css';

type SvgTreeNodeProps = {
  ...SvgElement,
  inline?: boolean,
};

type SvgTreeNodeState = {
  expanded: boolean,
};

class SvgTreeNode extends React.Component<SvgTreeNodeProps, SvgTreeNodeState> {
  state = {
    expanded: true,
  };

  toggleExpander: (e: SyntheticEvent<HTMLElement>) => void = e => {
    this.setState(old => ({
      expanded: !old.expanded,
    }));
    e.preventDefault();
  };

  render() {
    const props: SvgTreeNodeProps = this.props;
    const { expanded } = this.state;
    const Wrapper = props.inline ? 'span' : 'div';
    switch (props.type) {
      case 'comment':
        return (
          <Wrapper className="SvgTreeNode SvgTreeNode-comment">
            <span className="hidden-markup middle">{`<!--`}</span>
            {props.comment || ''}
            <span className="hidden-markup middle">{`-->`}</span>
          </Wrapper>
        );
      case 'text':
        return <Wrapper className="SvgTreeNode">{props.text || ''}</Wrapper>;
      case 'element':
        const elName = props.name || '';
        const elements = props.elements;
        const hasElements = elements && elements.length > 0;
        const selfClosing = !elements || elements.length === 0;
        const onlyElement = elements && elements.length === 1 && elements[0];
        const onlyTextNode = onlyElement && onlyElement.type === 'text';
        return (
          <Wrapper className="SvgTreeNode">
            <div className="SvgTreeNode-tag-opening">
              <span
                className={cx('SvgTreeNode-expander', {
                  'SvgTreeNode-expander-expand': hasElements && !expanded,
                  'SvgTreeNode-expander-collapse': hasElements && expanded,
                })}
                onClick={this.toggleExpander}
              />
              {'<'}
              <span className="SvgTreeNode-name">{elName}</span>
              <SvgNodeAttributes attributes={props.attributes || {}} />
              {selfClosing ? ' />' : '>'}
              {onlyTextNode && onlyElement && expanded ? (
                <React.Fragment>
                  <SvgTreeNode inline {...onlyElement} />
                  <span className="hidden-markup bottom">{`</${elName}>`}</span>
                </React.Fragment>
              ) : (
                ''
              )}
            </div>
            {onlyTextNode || !expanded ? (
              ''
            ) : (
              <div className="SvgTreeNode-nodes">
                {props.elements &&
                  props.elements.map((el: SvgElement) => (
                    <SvgTreeNode key={getIdForObject(el)} {...el} />
                  ))}
                <div className="SvgTreeNode-add" />
              </div>
            )}
            {onlyTextNode || selfClosing ? (
              ''
            ) : (
              <span className="hidden-markup">{`</${elName}>`}</span>
            )}
          </Wrapper>
        );
      default:
        console.error(`Unknown SVG Node ${props.type || ''}`, props);
        return null;
    }
  }
}

export default SvgTreeNode;
