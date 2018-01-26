var config = {};

config.mongoURI = {
  development: 'mongodb://localhost:27017/intercom-customers',
  test: 'mongodb://localhost:27017/test-intercom-customers'
};

module.exports = config;