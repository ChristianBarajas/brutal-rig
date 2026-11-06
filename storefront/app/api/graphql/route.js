import { createYoga } from "graphql-yoga";
import { schema } from "../../../lib/schema.js";

export const runtime = "nodejs";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
