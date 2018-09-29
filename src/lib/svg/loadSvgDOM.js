// @flow

import { genSerial } from '../getIdForObject';
import gql from 'graphql-tag';
import { getReactAttrName } from './attrUtil';
import { type SvgNode, type SvgAttributes } from './SvgNode';

function getAttributes(node: Element): SvgAttributes {
  const result = {};
  for (let entry of node.attributes) {
    result[getReactAttrName(entry.name)] = entry.value;
  }
  return result;
}

const FRAGMENTS = gql`
  fragment loadSvgText on SvgText {
    __typename
    id
    text
  }
  fragment loadSvgCData on SvgCData {
    __typename
    id
    cdata
  }
  fragment loadSvgComment on SvgComment {
    __typename
    id
    comment
  }
  fragment loadSvgProcessingInstruction on SvgProcessingInstruction {
    __typename
    id
    name
    content
  }
  fragment loadSvgElement on SvgElement {
    __typename
    id
    name
    attributes
    childNodes {
      __typename
      id
    }
  }
  fragment loadSvgDocument on SvgDocument {
    __typename
    id
    fileName
    lastModified
    childNodes {
      __typename
      id
    }
  }
`;

const QUERY_CURRENT_DOCUMENT = gql`
  {
    currentDocument {
      __typename
      id
    }
  }
`;

function loadNode(cache, element) {
  if (!cache || !element) return;
  cache.writeFragment({
    id: `${element.__typename}:${element.id}`,
    data: element,
    fragment: FRAGMENTS,
    fragmentName: `load${element.__typename}`,
  });
}

function processNode(node: Node, cache: any): ?SvgNode {
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
        childNodes: getChildNodes(node, cache),
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
        childNodes: getChildNodes(node, cache),
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

function getChildNodes(parent: Node, cache: any): Array<SvgNode> | null {
  const result = [];
  if (parent.childNodes.length === 0) return null;
  for (let node of parent.childNodes) {
    const element = processNode(node, cache);
    if (element) {
      loadNode(cache, element);
      result.push(element);
    }
  }
  if (result.length === 0) return null;
  return result;
}

type ConvertSvgDomOptions = {
  svgDocument: Node,
  cache: any,
  [name: string]: mixed,
};

export function loadSvgDOM({
  svgDocument,
  cache,
  ...rest
}: ConvertSvgDomOptions): SvgNode | null {
  const document = processNode(svgDocument, cache);
  if (!document) return null;
  Object.assign(document, rest);
  loadNode(cache, document);
  cache.writeQuery({
    data: { currentDocument: document },
    query: QUERY_CURRENT_DOCUMENT,
  });
  return document;
}
