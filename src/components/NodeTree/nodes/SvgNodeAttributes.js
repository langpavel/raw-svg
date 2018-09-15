// @flow

import * as React from 'react';

import { type SvgAttributes } from '../../../lib/svg/SvgElement';

import './SvgNodeAttribute.css';

type SvgNodeAttributesProps = {
  attributes: SvgAttributes,
};

class SvgNodeAttributes extends React.Component<SvgNodeAttributesProps> {
  render() {
    const { attributes } = this.props;
    const { id, class: cls, className, ...rest } = attributes;
    const clsName = className || cls;
    return (
      <span>
        {id ? (
          <span>
            <span className="hidden-markup bottom">{' id="'}</span>
            <span className="SvgNodeAttribute-id">{id}</span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {clsName ? (
          <span>
            <span className="hidden-markup bottom">{' class="'}</span>
            <span className="SvgNodeAttribute-class">{clsName}</span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {Object.entries(rest).map(([key, val], idx) => (
          <React.Fragment key={key}>
            {' '}
            <span>
              <span>{key}</span>=<span>"{val.toString().substr(0, 100)}"</span>
            </span>
          </React.Fragment>
        ))}
      </span>
    );
  }
}

export default SvgNodeAttributes;
