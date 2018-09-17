// @flow

import { genSerial } from '../getIdForObject';
import { getReactAttrName } from './attrUtil';
import { type SvgNode, type SvgAttributes } from './SvgNode';

function getAttributes(node: Element): SvgAttributes {
  const result = {};
  for (let entry of node.attributes) {
    result[getReactAttrName(entry.name)] = entry.value;
  }
  return result;
}

function processNode(node: Node): ?SvgNode {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
  switch (node.nodeType) {
    case 1: {
      // ELEMENT_NODE
      return {
        __typename: 'SvgElement',
        id: genSerial(),
        name: node.nodeName,
        // $FlowFixMe
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
        __typename: 'SvgCData',
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

function getChildNodes(parent: Node): Array<SvgNode> | null {
  const result = [];
  if (parent.childNodes.length === 0) return null;
  for (let node of parent.childNodes) {
    const element = processNode(node);
    if (element) result.push(element);
  }
  if (result.length === 0) return null;
  return result;
}

type ConvertSvgDomOptions = {
  svgDocument: Node,
  [name: string]: mixed,
};

export function convertSvgDom({
  svgDocument,
  ...rest
}: ConvertSvgDomOptions): SvgNode | null {
  const document = processNode(svgDocument);
  if (!document) return null;
  return Object.assign(document, rest);
}
