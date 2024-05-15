import { Hono, type Context } from "hono";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

import Product from "routes/product";

const app = new Hono();

const factory = createFactory();
const handlers = factory.createHandlers(logger(), (c: Context) =>
  c.json({ status: 200, message: "hono" })
);

app.get("/", ...handlers);
app.route("/product", Product);

export default app;
