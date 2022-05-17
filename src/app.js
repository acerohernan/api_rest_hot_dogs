
const express = require("express");
const sequelize = require("./database/connect");
const log = require("./utils/logger");
const cors = require("cors");
const mainRouter = require("./routes");

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(mainRouter);

app.listen(PORT, () => {
    log.info(`App is running on port: ${PORT}`);

    /* Connection with the database */
    sequelize.sync().then(() => {
        log.info('Database is connected');
    }).catch((e) => log.error(e.message));
});