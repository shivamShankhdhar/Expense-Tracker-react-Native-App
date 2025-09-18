module.exports = {
  apps: [
    {
      name: "backend",
      script: "node_modules/.bin/ts-node",
      args: "src/server.ts",
    },
  ],
};
