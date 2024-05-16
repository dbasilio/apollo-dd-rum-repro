# Minimal Repro of BatchHTTPClient not functioning correctly

[Datadog RUM](https://docs.datadoghq.com/real_user_monitoring/) attaches headers to outgoing fetch and XHR requests to be able to link together traces. When using Apollo's HTTPLink, this functions correctly, but it doesn't with BatchHTTPLink.

This was previously reported as an issue and fixed for HTTPLink in [PR #8603 ](https://github.com/apollographql/apollo-client/pull/8603) but the same fix needs to be applied to BatchHTTPLink.

## Repo Setup

```sh
# Assuming you have nvm installed, if not skip this step or install the latest node version
nvm install 
corepack enable
yarn install
yarn start
```

## Repro

### Error Case

- Open `localhost:9000` in a browser
- open the network tab
- You should see a request to `http://localhost:9000/graphql`
- Examine the request headers for the request and see that there are no `x-datadog-` headers attached.

### Working Case

- Change the client passed to the `ApolloProvider` in `app/Component.js` to use `unbatchedClient`
- Refresh the browser
- Examine the request headers again for the `/graphql` request
- There are now several `x-datadog-` headers attached to the request

### Workaround Hack

By passing in a custom function for fetch which forces the `fetch` to be reevaluated, we can get around the issues with BatchHTTPClient.

- Change the client passed to the `ApolloProvider` in `app/Component.js` to use `batchedClientWithHack`
- Refresh the browser
- Examine the request headers again for the `/graphql` request
- There are now several `x-datadog-` headers attached to the request
