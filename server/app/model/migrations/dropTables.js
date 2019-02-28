const dropParties = 'DROP TABLE IF EXISTS parties; ';
const dropOffices = 'DROP TABLE IF EXISTS offices; ';
const dropUsers = 'DROP TABLE IF EXISTS users; ';
const dropCandidates = 'DROP TABLE IF EXISTS candidates CASCADE;';

const dropTables = `${dropCandidates}${dropParties}${dropOffices}${dropUsers}`;

export default dropTables;
