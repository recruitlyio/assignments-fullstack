import { createApp } from './app';
import { config } from './config/config';

const startServer = () => {
  const app = createApp();
  const port = config.port;

  app.listen(port, () => {
    console.log(`Server running on port ${port} in ${config.nodeEnv} mode`);
  });
};

startServer();
