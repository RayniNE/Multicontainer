import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Pool } from "pg";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

import CONFIG from "./keys";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
  user: CONFIG.pgUser,
  host: CONFIG.pgHost,
  database: CONFIG.pgDataBase,
  password: CONFIG.pgPassword,
  port: CONFIG.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

const redisClient: RedisClientType = createClient({
  socket: {
    host: CONFIG.redisHost,
    port: CONFIG.redisPort,
    reconnectStrategy: () => 1000,
  },
});

const redisPublisher = redisClient.duplicate();

app.get("/", (request: Request, response: Response) => {
  response.send("Hi");
});

app.get("/values/all", async (request: Request, response: Response) => {
  const values = await pgClient.query("SELECT * FROM values");

  response.send(values.rows);
});

app.get("/values/current", async (request: Request, response: Response) => {
  const values = await redisClient.hGetAll("values");

  response.send(values);
});

app.post("values", async (request: Request, response: Response) => {
  const { index } = request.body;
  if (parseInt(index) > 40) return response.status(422).send("Index too high!");

  redisClient.hSet("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  response.send({ working: true });
});

app.listen(5000, () => console.log(`Listening on port 5000`));
