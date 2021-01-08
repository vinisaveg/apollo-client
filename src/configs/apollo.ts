import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Recipe } from "../types/Recipe";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});
