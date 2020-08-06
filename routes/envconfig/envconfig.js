const dotenv = require('dotenv');  //To collect the parsed information in PROCESS.ENV
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

module.exports = envs;