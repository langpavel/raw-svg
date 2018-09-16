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
    const {
      id,
      class: cls,
      className,
      xlinkhref,
      'xlink:href': xlinkHref2,
      xlinkHref,
      ...rest
    } = attributes;
    const xHref = xlinkHref || xlinkHref2 || xlinkhref;
    const clsName = className || cls;
    const clsNames = clsName ? clsName.split(/\s+/).filter(x => x) : null;
    const clsMaxIdx = clsNames ? clsNames.length - 1 : 0;
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
        {xHref ? (
          <span>
            <span className="hidden-markup bottom">{' xlink:href="'}</span>
            <span className="SvgNodeAttribute-xlink-href">{xHref}</span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {clsNames ? (
          <span>
            <span className="hidden-markup bottom">{' class="'}</span>
            <span className="SvgNodeAttribute-classes">
              {clsNames.map((cname, idx) => (
                <React.Fragment key={cname}>
                  <span className="SvgNodeAttribute-class">{cname}</span>
                  {idx < clsMaxIdx ? ' ' : ''}
                </React.Fragment>
              ))}
            </span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {Object.entries(rest).map(([key, val], idx) => (
          <React.Fragment key={key}>
            {' '}
            <span>
              <span>{key}</span>=<span>"{val.toString()}"</span>
            </span>
          </React.Fragment>
        ))}
      </span>
    );
  }
}

export default SvgNodeAttributes;
