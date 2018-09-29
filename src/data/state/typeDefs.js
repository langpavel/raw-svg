import gql from 'graphql-tag';

export default gql`
  interface SvgNode {
    id: ID!
  }

  type SvgText implements SvgNode {
    id: ID!
    text: String!
  }

  type SvgCData implements SvgNode {
    id: ID!
    cdata: String!
  }

  type SvgComment implements SvgNode {
    id: ID!
    comment: String!
  }

  type SvgProcessingInstruction implements SvgNode {
    id: ID!
    name: String!
    content: String!
  }

  type SvgElement implements SvgNode {
    id: ID!
    name: String!
    childNodes: [SvgNode!]
  }
`;
