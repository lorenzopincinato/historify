const app = require('./config/express');
const config = require('./config/env');

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
