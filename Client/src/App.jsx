import Navigation from "./navigation";

import { ApolloClient, InMemoryCache, ApolloProvider as AplloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});



function App() {
  return (
    <AplloProvider client={client}>
      <Navigation />
    </AplloProvider>
  );
  }

export default App;
