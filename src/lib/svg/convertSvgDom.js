// @flow

import { genSerial } from '../getIdForObject';
import { getReactAttrName } from './attrUtil';

function getAttributes(node: DocumentNode) {
  const result = {};
  for (let entry of node.attributes) {
    result[getReactAttrName(entry.name)] = entry.value;
  }
  return result;
}

function processNode(node: DocumentNode) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
  switch (node.nodeType) {
    case 1: {
      // ELEMENT_NODE
      return {
        __typename: 'SvgElement',
        id: genSerial(),
        name: node.nodeName,
        attributes: getAttributes(node),
        childNodes: getChildNodes(node),
      };
    }
    case 3: {
      // TEXT_NODE
      return {
        __typename: 'SvgText',
        id: genSerial(),
        text: node.nodeValue,
      };
    }
    case 4: {
      // CDATA_SECTION_NODE
      return {
        __typename: 'SvgCdata',
        id: genSerial(),
        cdata: node.nodeValue,
      };
    }
    case 7: {
      // PROCESSING_INSTRUCTION_NODE
      return {
        __typename: 'SvgProcessingInstruction',
        id: genSerial(),
        name: node.nodeName,
        content: node.nodeValue,
      };
    }
    case 8: {
      // COMMENT_NODE
      return {
        __typename: 'SvgComment',
        id: genSerial(),
        comment: node.nodeValue,
      };
    }
    case 9: {
      // DOCUMENT_NODE
      return {
        __typename: 'SvgDocument',
        id: genSerial(),
        childNodes: getChildNodes(node),
      };
    }
    // case 10: // DOCUMENT_TYPE_NODE
    // case 11: // DOCUMENT_FRAGMENT_NODE
    default: {
      console.error('Unhandled node type:', node.nodeType, node);
      return null;
    }
  }
}

function getChildNodes(parent: DocumentNode) {
  const result = [];
  if (parent.childNodes.length === 0) return null;
  for (let node of parent.childNodes) {
    const element = processNode(node);
    if (element) result.push(element);
  }
  if (result.length === 0) return null;
  return result;
}

export const convertSvgDom = ({ svgDocument, ...rest }) => {
  const document = processNode(svgDocument);
  return Object.assign(document, rest);
};
