import cuid from "cuid";
import type { Context } from "hono";
import { createFactory } from "hono/factory";
import { Database } from "bun:sqlite";

const dbPath = process.env["SQLLITE3_PATH"] + "products.db";
const db = new Database(dbPath, { create: true });

const factory = createFactory();

export const getProducts = factory.createHandlers(async (c: Context) => {
  try {
    const query = db.query("SELECT * FROM products;");
    return c.json({
      status: 200,
      message: "from products",
      data: query.all(),
    });
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: "Server Error",
        data: JSON.stringify(error),
      },
      500
    );
  }
});

export const getProductDetail = factory.createHandlers(async (c: Context) => {
  try {
    const id = c.req.param("id");
    const query = db.query("SELECT * FROM products WHERE id = ?");

    return c.json({
      status: 200,
      message: "from products",
      data: query.get(id),
    });
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: "Server Error",
        data: JSON.stringify(error),
      },
      500
    );
  }
});

export const insertProduct = factory.createHandlers(async (c: Context) => {
  try {
    const id = cuid();
    const bodyJson = await c.req.json();
    if (bodyJson.name) {
      db.run("INSERT into products (id, name) values (?, ?);", [
        id,
        bodyJson.name,
      ]);
    } else {
      return c.json(
        {
          status: 400,
          message: "Invalid Request",
        },
        400
      );
    }
    return c.json({
      status: 200,
      message: "Insert success",
      data: {
        id: id,
        name: bodyJson.name,
      },
    });
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: "Server Error",
        data: JSON.stringify(error),
      },
      500
    );
  }
});

export const removeProduct = factory.createHandlers(async (c: Context) => {
  try {
    const id = c.req.param("id");
    db.run("DELETE FROM products WHERE id=?;", [id]);
    return c.json({
      status: 200,
      message: "Delete Success",
      data: {
        id: id,
      },
    });
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: "Server Error",
        data: JSON.stringify(error),
      },
      500
    );
  }
});

export const updateProduct = factory.createHandlers(async (c: Context) => {
  try {
    const id = c.req.param("id");
    const bodyJson = await c.req.json();
    if (bodyJson.name) {
      db.run("UPDATE products SET name=? WHERE id=?;", [bodyJson.name, id]);
    } else {
      return c.json(
        {
          status: 400,
          message: "Invalid Request",
        },
        400
      );
    }
    return c.json({
      status: 200,
      message: "Update Success",
      data: {
        id: id,
        name: bodyJson.name,
      },
    });
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: "Server Error",
        data: JSON.stringify(error),
      },
      500
    );
  }
});
