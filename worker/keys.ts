type CONFIGURATION = {
  redisHost: string;
  redisPort: number;
};

const config: CONFIGURATION = {
  redisHost: process.env.REDIS_HOST as string,
  redisPort: parseInt(process.env.REDIS_PORT as string),
};

export default config;
