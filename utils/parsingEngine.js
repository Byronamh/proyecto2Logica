const extractEntities = (entities, dataRow) => {
  const returnable = {};
  entities.map(entity => returnable[entity.nodeName] = ""+dataRow[entity.accessor].replace("'", "`"));
  return returnable
};

module.exports = {
  extractEntities,
};
