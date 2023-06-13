/*
 * This is the client-side entrypoint for your tRPC API. it is used to  create the api
 * contains the Next.js App-wrapper, as well as your type-safe react query hooks
 *
 * we also create a few inference helpers for input and output types
 * */

import superjson from "superjson"; // serialization and desirialization
