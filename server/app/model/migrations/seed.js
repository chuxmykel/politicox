import Auth from '../../auth/auth';

const hashedPassword = Auth.hashPassword('password');
const createAdminQuery = `INSERT INTO users (firstname, lastname, othername, email, phoneNumber,
  password, passportUrl, isAdmin) 
  VALUES ('Chukwudi', 'Ngwobia', 'Mike', 'ngwobiachukwudi@gmail.com', '07060854773',
  '${hashedPassword}', 'https://gmail.com/passport', true) RETURNING *;`;

const createOfficeQuery = `INSERT INTO offices(type, name) 
  VALUES('Federal', 'Presidential'),
        ('Federal', 'Senatorial'),
        ('Federal', 'Representatives'),
        ('State', 'Gubernatorial'),
        ('Local Government', 'Chairman'),
        ('Local Government', 'Counsellor');`;

const createPartyQuery = `INSERT INTO parties(name, hqAddress, logoUrl) 
  VALUES('NEW', 'No.3 Nowhere Estate, Lagos state', 'http://newParty.com'),
        ('PARTY', 'Petrocam Estate, Ejigbo along. Off Taiwo mall', 'http://bekelo.it/9erheo/'),
        ('REPUBLICAN', 'Australopitecus. Behind Maroko District. Ajah', 'http://play-with-pass.com/hefoieh0'),
        ('NTA', 'No.43 guisa Cutout, Northern states', 'http://buhari-is-the-winner.com'),
        ('DSTV', 'Ejigbo Maroko huhos Estate, Kogi state', 'http://some.pass.port');`;

const seed = `${createAdminQuery}${createOfficeQuery}${createPartyQuery}`;

export default seed;
