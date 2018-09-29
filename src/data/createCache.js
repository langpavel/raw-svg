// @flow

import {
  InMemoryCache,
  defaultDataIdFromObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

function dataIdFromObject(obj) {
  switch (obj.__typename) {
    default:
      return defaultDataIdFromObject(obj);
  }
}

const emptyIntrospectionQueryResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'SvgNode',
        possibleTypes: [
          { name: 'SvgText' },
          { name: 'SvgCData' },
          { name: 'SvgComment' },
          { name: 'SvgProcessingInstruction' },
          { name: 'SvgElement' },
        ],
      },
    ],
  },
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: emptyIntrospectionQueryResultData,
});

export default function createCache(): InMemoryCache {
  // https://www.apollographql.com/docs/react/basics/caching.html#configuration
  return new InMemoryCache({
    dataIdFromObject,
    fragmentMatcher,
  });
}
