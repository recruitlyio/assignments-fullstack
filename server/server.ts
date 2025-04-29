import app from "./src/app";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in the environment variables.");
  process.exit(1);
}

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
