const { writeToFileAsObject } = require(`./services/data/data`);
const baseId = "app3eY4aYIWBfmrOw";

writeToFileAsObject({ baseId, table: "orderStatusMessages", key: "status" });