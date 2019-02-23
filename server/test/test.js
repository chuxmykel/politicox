import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();

chai.use(chaiHttp);

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;
const userEndPoint = `${apiEndPoint}auth/`;

describe('Home Routes', () => {
  describe(`GET ${homeEndPoint}`, () => {
    it('Should have status 200', () => {
      chai.request(server)
        .get(homeEndPoint)
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });

  describe(`GET ${apiEndPoint}`, () => {
    it('Should have status 200', () => {
      chai.request(server)
        .get(apiEndPoint)
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });
});

describe('Party Routes', () => {
  describe(`POST ${partyEndPoint}`, () => {
    it('Should return 201 if party creation works', (done) => {
      const party = {
        name: 'QWERTYUIOP',
        hqAddress: 'Lagos Nigeria',
        logoUrl: 'http://www.andelatest.com',
      };
      chai.request(server)
        .post(partyEndPoint)
        .send(party)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Should return 400 if name already exists', (done) => {
      const party = {
        name: 'QWERTYUIOP',
        hqAddress: 'Lagos Nigeria',
        logoUrl: 'http://www.andelatest.com',
      };
      chai.request(server)
        .post(partyEndPoint)
        .send(party)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should return 400 if name is missing', (done) => {
      const party = {
        hqAddress: 'Lagos Nigeria',
        logoUrl: 'http://www.andelatest.com',
      };
      chai.request(server)
        .post(partyEndPoint)
        .send(party)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should return 400 if hqAddress is missing', (done) => {
      const party = {
        name: 'WAP',
        logoUrl: 'http://www.andelatest.com',
      };
      chai.request(server)
        .post(partyEndPoint)
        .send(party)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe(`GET ${partyEndPoint}`, () => {
    it('Should have 200 as status if retrival of all parties worked', (done) => {
      chai.request(server)
        .get(partyEndPoint)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe(`GET ${partyEndPoint}id`, () => {
    it('Should have 200 as status code if single party retrival worked', (done) => {
      const id = 1;
      chai.request(server)
        .get(`${partyEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should have 404 as status code if party not found', (done) => {
      const id = 100;
      chai.request(server)
        .get(`${partyEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe(`PATCH ${partyEndPoint}id/name`, () => {
    it('Should return 200 on successful party edit', (done) => {
      const input = {
        name: 'andela',
      };
      const id = 1;
      chai.request(server)
        .patch(`${partyEndPoint}${id}/name`)
        .send(input)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should return 400 if party name isn\'t provided', (done) => {
      const input = {};
      const id = 1;
      chai.request(server)
        .patch(`${partyEndPoint}${id}/name`)
        .send(input)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 404 if party id does not exist', (done) => {
      const input = {
        name: 'andela',
      };
      const id = 200;
      chai.request(server)
        .patch(`${partyEndPoint}${id}/name`)
        .send(input)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe(`DELETE ${partyEndPoint}id`, () => {
    it('Should return 200 on successful deletion of party', (done) => {
      const id = 1;
      chai.request(server)
        .delete(`${partyEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should return 404 if party does not exist', (done) => {
      const id = 50;
      chai.request(server)
        .delete(`${partyEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('Office Tests', () => {
  describe(`POST ${officeEndPoint}`, () => {
    it('Should return 201 if office creation works', (done) => {
      const office = {
        type: 'Students Union Government',
        name: 'Presidential',
      };
      chai.request(server)
        .post(officeEndPoint)
        .send(office)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('Should return 400 if type is missing', (done) => {
      const office = {
        name: 'Presidential',
      };
      chai.request(server)
        .post(officeEndPoint)
        .send(office)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if name is missing', (done) => {
      const office = {
        type: 'Students Union Government',
      };
      chai.request(server)
        .post(officeEndPoint)
        .send(office)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe(`GET ${officeEndPoint}`, () => {
    it('Should have 200 as status if retrival of all offices worked', (done) => {
      chai.request(server)
        .get(officeEndPoint)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe(`GET ${officeEndPoint}id`, () => {
    it('Should have 200 as status code if single office retrival worked', (done) => {
      const id = 1;
      chai.request(server)
        .get(`${officeEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should have 404 as status code if office not found', (done) => {
      const id = 50;
      chai.request(server)
        .get(`${officeEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('User Auth Tests', () => {
  describe(`POST ${userEndPoint}signup`, () => {
    it('Should return 201 if user creation works', (done) => {
      const user = {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        othername: 'Mike',
        email: 'coolemail@testmail.com',
        phoneNumber: '07001234567',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('Should return 400 if firstname is ommited', (done) => {
      const user = {
        lastname: 'Ngwobia',
        othername: 'Mike',
        email: 'coolemail1@testmail.com',
        phoneNumber: '07001234568',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if lastname is ommited', (done) => {
      const user = {
        firstname: 'Chukwudi',
        othername: 'Mike',
        email: 'coolemail2@testmail.com',
        phoneNumber: '07001234569',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if email is ommited', (done) => {
      const user = {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        othername: 'Mike',
        phoneNumber: '07001234560',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if email already exists', (done) => {
      const user = {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        othername: 'Mike',
        email: 'coolemail@testmail.com',
        phoneNumber: '07001234561',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if phone number already exists', (done) => {
      const user = {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        othername: 'Mike',
        email: 'coolemail4@testmail.com',
        phoneNumber: '07001234567',
        passportUrl: 'http://passport.url/andELa41',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if password is ommited', (done) => {
      const user = {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        othername: 'Mike',
        email: 'coolemail5@testmail.com',
        phoneNumber: '07001234562',
        passportUrl: 'http://passport.url/andELa41',
      };
      chai.request(server)
        .post(`${userEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
