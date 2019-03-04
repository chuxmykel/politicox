import Auth from '../../auth/auth';

const hashedPassword = Auth.hashPassword('password');
const createAdminQuery = `INSERT INTO users (firstname, lastname, othername, email, phoneNumber,
  password, passportUrl, isAdmin) 
  VALUES ('Chukwudi', 'Ngwobia', 'Mike', 'ngwobiachukwudi@gmail.com', '07060854773',
  '${hashedPassword}', 'https://gmail.com/passport', true) RETURNING *;`;

const createUsersQuery = `INSERT INTO users (firstname, lastname, othername, email, password, passportUrl) 
  VALUES ('Kenneth', 'Godwin', 'Tedy', 'tedykeny@gmail.com', '${hashedPassword}', 'goo.gl/hd9s'),
         ('Ikechukwu', 'Ngwobia', 'Mike', 'doniyke44@gmail.com', '${hashedPassword}', 'http://bit.ly/dk/iIKY'),
         ('Kelechi', 'Ngwobia', 'Mike', 'kcmykairl@gmail.com', '${hashedPassword}', 'https://fcbk.dia'),
         ('Chisom', 'Peperenpe', 'Confidence', 'peperenpe@gmail.com', '${hashedPassword}', 'goo.gl/dfj5'),
         ('Victor', 'Godwin', 'Onyekachi', 'vog@gmail.com', '${hashedPassword}', 'www.qwertyu.iop');`;

const createOfficesQuery = `INSERT INTO offices(type, name) 
  VALUES('Federal', 'Presidential'),
        ('Federal', 'Senatorial'),
        ('Federal', 'Representatives'),
        ('State', 'Gubernatorial'),
        ('Local Government', 'Chairman'),
        ('Local Government', 'Counsellor');`;

const createPartiesQuery = `INSERT INTO parties(name, hqAddress, logoUrl) 
  VALUES('NEW', 'No.3 Nowhere Estate, Lagos state', 'http://newParty.com'),
        ('PARTY', 'Petrocam Estate, Ejigbo along. Off Taiwo mall', 'http://bekelo.it/9erheo/'),
        ('REPUBLICAN', 'Australopitecus. Behind Maroko District. Ajah', 'http://play-with-pass.com/hefoieh0'),
        ('NTA', 'No.43 guisa Cutout, Northern states', 'http://buhari-is-the-winner.com'),
        ('DSTV', 'Ejigbo Maroko huhos Estate, Kogi state', 'http://some.pass.port');`;


const seed = `${createAdminQuery}${createUsersQuery}${createOfficesQuery}${createPartiesQuery}`;

export default seed;
