const createPartyTable = `
  CREATE TABLE parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    hqAddress VARCHAR(105),
    logoUrl VARCHAR(200) 
  );`;

const createOfficeTable = `
  CREATE TABLE offices(
    id SERIAL PRIMARY KEY,
    type VARCHAR(60),
    name VARCHAR(60) 
  );`;

const createUserTable = `
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(15),
    lastname VARCHAR(15), 
    othername VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(15) UNIQUE,
    password VARCHAR(200),
    passportUrl VARCHAR(200),
    isAdmin BOOLEAN DEFAULT FALSE 
  );`;

const createCandidateTable = `
  CREATE TABLE candidates(
    id SERIAL,
    office INTEGER REFERENCES offices(id),
    party INTEGER REFERENCES parties(id),
    "user" INTEGER UNIQUE REFERENCES users(id), 
    PRIMARY KEY ("user", office) 
  );`;


const createTables = `${createPartyTable}${createOfficeTable}${createUserTable}${createCandidateTable}`;

export default createTables;
