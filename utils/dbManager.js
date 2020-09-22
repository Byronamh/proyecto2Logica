/**
 * Inserts a reference to the local cache
 * @param {string} nodeType: Name of the node
 * @param  label: Object with any ammount of attributes
 * @returns {number} index of the inserted item
 */
const createOrGet = async (nodeType, label, session) => {
  const existanceValidation = await session.run(`MATCH(n:${nodeType}) WHERE n.name = '${label}' RETURN n`);
  if (!existanceValidation.records.length) {
    await session.run(`CREATE(n:${nodeType} {name: '${label}'}) `);
  }
};

const createRelationship = async (parentRules, childRules, relationshipName, entity, session) => {
  await session.run(`MATCH (a:${parentRules.nodeName}),(b:${childRules.nodeName})
                      WHERE a.name = '${entity[parentRules.nodeName]}' AND b.name = '${entity[childRules.nodeName]}'
                      CREATE (b)-[r:${relationshipName}]->(a)
                      RETURN type(r)`)
};

module.exports = {
  createOrGet,
  createRelationship
};

