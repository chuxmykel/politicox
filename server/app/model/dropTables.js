const dropParties = 'DROP TABLE IF EXISTS parties; ';
const dropOffices = 'DROP TABLE IF EXISTS offices; ';
const dropUsers = 'DROP TABLE IF EXISTS users; ';

const dropTables = `${dropParties}${dropOffices}${dropUsers}`;

export default dropTables;
