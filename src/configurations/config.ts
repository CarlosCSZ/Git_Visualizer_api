import { registerAs } from '@nestjs/config';

export default registerAs('env_variables', () => {
  return {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    gh: {
      token: process.env.GH_TOKEN,
      owner: process.env.GH_OWNER,
      repo: process.env.GH_REPO,
    },
  };
});
