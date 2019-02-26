/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const randomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQ2h1a3d1ZGkiLCJsYXN0bmFtZSI6Ik5nd29iaWEiLCJvdGhlcm5hbWUiOiJNaWtlIiwiZW1haWwiOiJuZ3dvYmlhY2h1a3d1ZGlAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwNzA2MDg1NDc3MyIsInBhc3Nwb3J0VXJsIjoiaHR0cHM6Ly9nbWFpbC5jb20vcGFzc3BvcnQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTExNzYzMzYsImV4cCI6MTU1MTE3OTkzNn0.ewoovxp-otFQ58E2Ez7wWTfGyFwoeJX7CY_nBL6r06c';
const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;
const userEndPoint = `${apiEndPoint}auth/`;

chai.should();

chai.use(chaiHttp);

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

describe('User Registration tests', () => {
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
          const { token } = res.body.data[0];
          token.should.exist;
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

describe('User Login tests', () => {
  describe(`POST ${userEndPoint}login`, () => {
    it('Should return 200 and a token if login is successful', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          const { token } = res.body.data[0];
          const { isAdmin } = res.body.data[0].user;
          token.should.exist;
          isAdmin.should.be.false;
          done();
        });
    });

    it('Should return 401 if wrong email is provided', (done) => {
      const login = {
        email: 'coolemail@tetmail.com',
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('Should return 401 if wrong password is provided', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pAs5w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('Should return 400 if email is not provided', (done) => {
      const login = {
        password: 'pA55w0rd',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if password is ommited', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

describe('Admin Login test', () => {
  describe(`POST ${userEndPoint}login`, () => {
    it('Should return 200 and an admin token if login is successful', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };
      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          const { token } = res.body.data[0];
          const { isAdmin } = res.body.data[0].user;
          token.should.exist;
          isAdmin.should.be.true;
          done();
        });
    });

    it('Should return 403 if credentials are valid user login details but not admin', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          const party = {
            name: 'PARTY',
            hqAddress: 'Lagos Nigeria',
            logoUrl: 'http://www.andelatest.com',
          };
          chai.request(server)
            .post(partyEndPoint)
            .send(party)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
    });
  });
});

describe('Protected Routes Tests', () => {
  describe('POST requests to admin protected routes', () => {
    it('Should return 401 if admin token is invalid', (done) => {
      const party = {
        name: 'PARTY',
        hqAddress: 'Lagos Nigeria',
        logoUrl: 'http://www.andelatest.com',
      };
      const token = `Bearer ${randomToken}`;
      chai.request(server)
        .post(partyEndPoint)
        .send(party)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET requests to protected routes', () => {
    it('Should return 401 if user token is invalid', (done) => {
      const token = `Bearer ${randomToken}`;
      chai.request(server)
        .get(partyEndPoint)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('Party Routes', () => {
  describe(`POST ${partyEndPoint}`, () => {
    it('Should return 201 if party creation works', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          const party = {
            name: 'QWERTYUIOP',
            hqAddress: 'Lagos Nigeria',
            logoUrl: 'http://www.andelatest.com',
          };
          chai.request(server)
            .post(partyEndPoint)
            .send(party)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
        });
    });
    it('Should return 400 if name already exists', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          const party = {
            name: 'QWERTYUIOP',
            hqAddress: 'Lagos Nigeria',
            logoUrl: 'http://www.andelatest.com',
          };
          chai.request(server)
            .post(partyEndPoint)
            .send(party)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
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
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(server)
            .get(partyEndPoint)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe(`GET ${partyEndPoint}id`, () => {
    it('Should have 200 as status code if single party retrival worked', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;
          const id = 1;

          chai.request(server)
            .get(`${partyEndPoint}${id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });

    it('Should have 404 as status code if party not found', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;
          const id = 100;

          chai.request(server)
            .get(`${partyEndPoint}${id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });

  describe(`PATCH ${partyEndPoint}id/name`, () => {
    it('Should return 200 on successful party edit', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;
          const input = {
            name: 'andela',
          };
          const id = 1;
          chai.request(server)
            .patch(`${partyEndPoint}${id}/name`)
            .set('Authorization', token)
            .send(input)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
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
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;
          const input = { name: 'andela', };
          const id = 200;

          chai.request(server)
            .patch(`${partyEndPoint}${id}/name`)
            .set('Authorization', token)
            .send(input)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
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

describe('Office Routes', () => {
  describe(`POST ${officeEndPoint}`, () => {
    it('Should return 201 if office creation works', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          const office = {
            type: 'Students Union Government',
            name: 'Presidential',
          };
          chai.request(server)
            .post(officeEndPoint)
            .set('Authorization', token)
            .send(office)
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
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
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(server)
            .get(officeEndPoint)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe(`GET ${officeEndPoint}id`, () => {
    it('Should have 200 as status code if single office retrival worked', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          const id = 1;
          chai.request(server)
            .get(`${officeEndPoint}${id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });

    it('Should have 404 as status code if office not found', (done) => {
      const login = {
        email: 'coolemail@testmail.com',
        password: 'pA55w0rd'
      };

      chai.request(server)
        .post(`${userEndPoint}login`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;
          const id = 50;
          chai.request(server)
            .get(`${officeEndPoint}${id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });
});
