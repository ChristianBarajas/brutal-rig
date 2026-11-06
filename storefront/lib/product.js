import { graphql, print } from "graphql";
import { GEAR_DETAIL } from "./queries.js";
import { schema } from "./schema.js";

// Server components execute the same GraphQL schema without making an HTTP
// request back to this Next.js server. Apollo handles browser queries.
export async function loadProduct(id) {
  const result = await graphql({
    schema,
    source: print(GEAR_DETAIL),
    variableValues: { id },
  });
  if (result.errors?.length) throw new Error("Unable to load gear details.");
  return result.data.product;
}
