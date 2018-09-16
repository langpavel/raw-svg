import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import createApollo from './data/createApollo';

// import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css/normalize.css';
import './index.css';

const apolloClient = createApollo();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// registerServiceWorker();
