import React from 'react';
import { ApolloClient, useQuery, HttpLink, ApolloProvider, InMemoryCache, gql } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";

// This must be a function defined outside of the client to ensure it is not closed over.
const getBrowserFetch = () => fetch;

export const batchedClient = new ApolloClient({
    link: new BatchHttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
});

export const unbatchedClient = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
});

export const batchedClientWithHack = new ApolloClient({
    link: new BatchHttpLink({
        uri: '/graphql',
        fetch: (input, init) => {
            // force the client to re-evaluate the fetch function on each request
            return getBrowserFetch()(input, init);
        },
    }),
    cache: new InMemoryCache()
});

const App = () => {
    // Replace the client here with the one you want to test
    return (
        <ApolloProvider client={batchedClientWithHack}>
            <Component />
        </ApolloProvider>
    );
}

const query = gql`
    query GetDogs {
        dogs {
            id
            breed
        }
    }
`

const Component = () => {
    useQuery(query);

    return <div>Check the Readme for instructions</div>;
}

export default App;
