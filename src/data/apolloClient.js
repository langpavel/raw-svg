// @flow

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  clientState: {
    defaults: {
      currentDrawing: {
        name: null,
        root: null,
      },
    },
    resolvers: {
      Mutation: {
        updateCurrentDrawing: (_, data, { cache }) => {
          cache.writeData({ data });
          return null;
        },
      },
    },
  },
});
