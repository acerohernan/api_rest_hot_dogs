const logger = require("pino");
const dayjs = require("dayjs");

module.exports = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `"time":"${dayjs().format()}"`
});