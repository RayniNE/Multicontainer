type CONFIG = {
  redisHost: string;
  redisPort: number;
  pgUser: string;
  pgHost: string;
  pgDataBase: string;
  pgPassword: string;
  pgPort: number;
};

const config: CONFIG = {
  redisHost: process.env.REDIS_HOST as string,
  redisPort: parseInt(process.env.REDIS_PORT as string),
  pgUser: process.env.PG_USER as string,
  pgHost: process.env.PG_HOST as string,
  pgDataBase: process.env.PG_DATABASE as string,
  pgPassword: process.env.PG_PASSWORD as string,
  pgPort: parseInt(process.env.PG_PORT as string),
};

export default config;
