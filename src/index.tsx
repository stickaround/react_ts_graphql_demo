import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  concat,
} from '@apollo/client';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')
        ? 'Bearer ' + localStorage.getItem('token')
        : '',
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </ApolloProvider>
);

reportWebVitals();
