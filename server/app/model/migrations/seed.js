import Auth from '../../auth/auth';

const hashedPassword = Auth.hashPassword('password');
const createAdminQuery = `INSERT INTO users (firstname, lastname, othername, email,
    phoneNumber, password, passportUrl, isAdmin) VALUES ('Chukwudi', 'Ngwobia', 'Mike',
    'ngwobiachukwudi@gmail.com', '07060854773', '${hashedPassword}', 'https://gmail.com/passport', true) RETURNING *;`;

const seed = `${createAdminQuery}`;

export default seed;
