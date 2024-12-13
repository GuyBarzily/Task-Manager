import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create HTTP link for queries, mutations, and subscriptions
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // HTTP endpoint
});

// Set up Apollo Client with only HTTP link
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
