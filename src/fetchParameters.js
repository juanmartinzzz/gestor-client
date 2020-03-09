const { writeToFileAsObject } = require(`./services/data/data`);
const gestorBaseId = "app3eY4aYIWBfmrOw";
const pedidosBaseId = "appklYU85cJ9DTTD9";

writeToFileAsObject({ baseId: gestorBaseId, table: "orderStatusMessages", key: "status" });

writeToFileAsObject({
  baseId: pedidosBaseId,
  table: "products",
  view: "grid",
  key: "id",
  downloads: ["image"],
});

writeToFileAsObject({
  baseId: pedidosBaseId,
  table: "variants",
  view: "grid",
  key: "id",
  downloads: ["image"],
});