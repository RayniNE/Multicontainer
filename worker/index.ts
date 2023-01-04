import type { RedisClientType } from "redis";
import { createClient } from "redis";
import CONFIG from "./keys";

// This is pretty much how we achive the same configuration steps
// as in the tutorial, the retry_strategy has been changed to
// reconnectStrategy.
const redisClient: RedisClientType = createClient({
  socket: {
    host: CONFIG.redisHost,
    port: CONFIG.redisPort,
    reconnectStrategy: () => 1000,
  },
});

const sub: RedisClientType = redisClient.duplicate();

function fibonacci(index: number): number {
  if (index < 2) return 1;
  return fibonacci(index - 1) + fibonacci(index - 2);
}

sub.on("message", (channel, message) => {
  redisClient.hSet("values", message, fibonacci(parseInt(message)));
});

sub.subscribe("insert", (message) => console.log(message));
