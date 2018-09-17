// @flow

import * as React from 'react';
import cx from 'classnames';
import { type SvgNode } from '../../../lib/svg/SvgNode';
import SvgNodeAttributes from './SvgNodeAttributes';

import './SvgTreeNode.css';

type SvgTreeNodeProps = {
  ...SvgNode,
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
    switch (props.__typename) {
      case 'SvgComment':
        return (
          <Wrapper className="SvgTreeNode SvgTreeNode-comment">
            <span className="hidden-markup middle">{`<!--`}</span>
            {props.comment || ''}
            <span className="hidden-markup middle">{`-->`}</span>
          </Wrapper>
        );
      case 'SvgText':
        return <Wrapper className="SvgTreeNode">{props.text || ''}</Wrapper>;
      case 'SvgDocument':
      case 'SvgElement':
        const elName = props.name || '';
        const childNodes = props.childNodes;
        const hasElements = childNodes && childNodes.length > 0;
        const selfClosing = !childNodes || childNodes.length === 0;
        const onlyElement =
          childNodes && childNodes.length === 1 && childNodes[0];
        const onlyTextNode = onlyElement && onlyElement.__typename === 'text';
        const TagWrapper = expanded && !onlyTextNode ? 'div' : 'span';
        return (
          <Wrapper className="SvgTreeNode">
            <TagWrapper className="SvgTreeNode-tag-opening">
              <span
                className={cx('SvgTreeNode-expander', {
                  'SvgTreeNode-expander-expand': hasElements && !expanded,
                  'SvgTreeNode-expander-collapse': hasElements && expanded,
                })}
                onClick={this.toggleExpander}
              />
              {'<'}
              <span className="SvgTreeNode-name">{elName}</span>
              <SvgNodeAttributes
                elementName={elName}
                attributes={props.attributes || {}}
              />
              {selfClosing ? ' />' : '>'}
              {onlyTextNode && onlyElement && expanded ? (
                <SvgTreeNode inline {...onlyElement} />
              ) : !expanded ? (
                <span className="SvgTreeNode-collapsed-summary">
                  {childNodes && childNodes.length
                    ? `${childNodes.length}`
                    : ''}
                </span>
              ) : (
                ''
              )}
            </TagWrapper>
            {onlyTextNode || !expanded ? (
              ''
            ) : (
              <div className="SvgTreeNode-nodes">
                {childNodes &&
                  childNodes.map((node: SvgNode) => (
                    <SvgTreeNode key={node.id} {...node} />
                  ))}
                <div className="SvgTreeNode-add" />
              </div>
            )}
            {selfClosing ? (
              ''
            ) : (
              <TagWrapper className="SvgTreeNode-tag-closing hidden-markup">{`</${elName}>`}</TagWrapper>
            )}
          </Wrapper>
        );
      default:
        console.error(`Unknown SVG Node ${props.__typename || ''}`, props);
        return null;
    }
  }
}

export default SvgTreeNode;
