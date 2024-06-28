import {config as configDotenv} from 'dotenv';
import {resolve} from 'path';

// Default values
process.env = {
  ...process.env,
  CLUSTER_URL: "https://api.devnet.solana.com"
};

switch(process.env.NODE_ENV) {
  case "development":
    console.log("Environment is 'development'")
    configDotenv({
      path: resolve(__dirname, "./.env.development")
    })
    break
  case "test":
    configDotenv({
      path: resolve(__dirname, "./.env.test")
    })
    break
  // Add 'staging' and 'production' cases here as well!
  default:
    configDotenv({
        path: resolve(__dirname, "./.env")
    })
}

console.log("Using cluster URL:", process.env.CLUSTER_URL);