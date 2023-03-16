const routes = require('./src/routes');
const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'production' ? 8000 : 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

void init();
