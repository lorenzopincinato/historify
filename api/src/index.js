const app = require('./config/express');
const config = require('./config/env');

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
