"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useState } from "react";

export default function ApolloWrapper({ children }) {
  const [client] = useState(() =>
    new ApolloClient({
      link: new HttpLink({ uri: "/api/graphql" }),
      cache: new InMemoryCache(),
    }),
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
