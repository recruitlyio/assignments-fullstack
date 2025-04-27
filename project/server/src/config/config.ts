import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  environment: string;
}

const config: Config = {
  port: Number(process.env.PORT || "3000"),
  environment: process.env.NODE_ENV || "development",
};

export default config;
