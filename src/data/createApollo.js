// @flow

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
// import { createHttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import createCache from './createCache';

import { withClientState } from 'apollo-link-state';
import clientState from './state';

export default function createApolloClient() {
  const cache = createCache();

  const link = from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.warn(`[Network error]: ${networkError}`);
    }),
    apolloLogger,
    withClientState({
      cache,
      ...clientState,
    }),
    // createHttpLink({
    //   uri: '/graphql',
    //   credentials: 'include',
    // }),
  ]);

  return new ApolloClient({
    link,
    cache,
    queryDeduplication: true,
    connectToDevTools: true,
  });
}
