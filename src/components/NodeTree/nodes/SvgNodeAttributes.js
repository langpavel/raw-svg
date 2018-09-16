// @flow

import * as React from 'react';

import { type SvgAttributes } from '../../../lib/svg/SvgElement';
// import { parseSVG, makeAbsolute } from 'svg-path-parser';

import './SvgNodeAttribute.css';

const formatValue = (val, key, elementName) => {
  let str: string;
  if (typeof val === 'string') {
    str = val;
  } else if (typeof val === 'number') {
    str = val.toString();
  } else {
    console.error(
      `Unexpected type '${typeof val}' of ${elementName}[${key}]:`,
      val,
    );
    return '';
  }

  if (key === 'd') {
    // console.log('path', parseSVG(str), makeAbsolute(parseSVG(str)));
  }

  return str;
};

type SvgNodeAttributesProps = {
  elementName: string,
  attributes: SvgAttributes,
};

class SvgNodeAttributes extends React.Component<SvgNodeAttributesProps> {
  render() {
    const { elementName, attributes } = this.props;
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
      <span className="SvgNodeAttributes">
        {id ? (
          <span className="SvgNodeAttribute SvgNodeAttribute-id">
            <span className="hidden-markup bottom">{' id="'}</span>
            <span className="value">{id}</span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {xHref ? (
          <span className="SvgNodeAttribute SvgNodeAttribute-xlink-href">
            <span className="hidden-markup bottom">{' xlink:href="'}</span>
            <span className="value">{xHref}</span>
            <span className="hidden-markup">{'"'}</span>
          </span>
        ) : (
          ''
        )}
        {clsNames ? (
          <span className="SvgNodeAttribute SvgNodeAttribute-class">
            <span className="hidden-markup bottom">{' class="'}</span>
            <span className="values">
              {clsNames.map((cname, idx) => (
                <React.Fragment key={cname}>
                  <span className="value">{cname}</span>
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
            <span
              className={`SvgNodeAttribute SvgNodeAttribute-${key.replace(
                /[^a-zA-Z]+/g,
                '-',
              )}`}
            >
              <span className="key">{key}</span>
              ="
              <span className="value">
                {formatValue(val, key, elementName)}
              </span>
              "
            </span>
          </React.Fragment>
        ))}
      </span>
    );
  }
}

export default SvgNodeAttributes;
