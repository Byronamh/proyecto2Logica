require('dotenv').config();
const engine = require('./utils/parsingEngine');
const format = require('./csvStructure');
const db = require('./utils/dbManager');
const neo4j = require('neo4j-driver')
const driver = neo4j.driver(
  `bolt://${process.env.NEO4J_URL}:${process.env.NEO4J_PORT}`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
const session = driver.session();


const tx = session.beginTransaction();

const csvFilePath = process.argv[2];
const csv = require('csvtojson');
csv()
  .fromFile(csvFilePath)
  .then(async (dataSet) => {
    for (let i = 0; i < dataSet.length; i++) {
      const row = dataSet[i];
      const entities = engine.extractEntities(format.dataAccessors, row);

      for (let dak = 0; dak < format.dataAccessors.length; dak++) {
        await db.createOrGet(format.dataAccessors[dak].nodeName, entities[format.dataAccessors[dak].nodeName], tx)
      }

      for (let prk = 0; prk < format.parsingRules.length; prk++) {
        const parent = format.parsingRules[prk][0];
        const child = format.parsingRules[prk][1];
        const rel = format.parsingRules[prk][2];
        await db.createRelationship(parent, child, rel, entities, tx)
      }

    }
    await tx.commit()
    console.log('parsing has ended and has been commited.')
    await driver.close()
  });

// Async / await usage
const jsonArray = csv().fromFile(csvFilePath);



