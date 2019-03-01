const createPartiesTable = `
  CREATE TABLE parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    hqAddress VARCHAR(105),
    logoUrl VARCHAR(200) 
  );`;

const createOfficesTable = `
  CREATE TABLE offices(
    id SERIAL PRIMARY KEY,
    type VARCHAR(60),
    name VARCHAR(60) 
  );`;

const createUsersTable = `
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

const createCandidatesTable = `
  CREATE TABLE candidates(
    id SERIAL,
    office INTEGER REFERENCES offices(id),
    party INTEGER REFERENCES parties(id),
    candidate INTEGER UNIQUE REFERENCES users(id), 
    PRIMARY KEY (candidate, office) 
  );`;

const createVotesTable = `
  CREATE TABLE votes(
    id SERIAL,
    createdOn DATE,
    createdBy INTEGER REFERENCES users(id),
    office INTEGER REFERENCES offices(id),
    candidate INTEGER REFERENCES candidates(candidate),
    PRIMARY KEY (createdBy, office) 
    );`;


const createTables = `${createPartiesTable}${createOfficesTable}
  ${createUsersTable}${createCandidatesTable}${createVotesTable}`;

export default createTables;
