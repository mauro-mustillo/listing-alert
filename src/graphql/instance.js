import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { store } from '../redux/store';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/api/v2' });


// Add auth headers to each GraphQL Request
const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = store.getState().auth;
  // TODO: Get token to be attached to request
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
  return forward(operation);
});

// Creating a client instance
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
