const createPartyTable = `
  CREATE TABLE parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    hqAddress VARCHAR(105),
    logoUrl VARCHAR(200) );`;

const createOfficeTable = `
  CREATE TABLE offices(
    id SERIAL PRIMARY KEY,
    type VARCHAR(60),
    name VARCHAR(60) );`;


const createTables = `${createPartyTable}${createOfficeTable}`;

export default createTables;
