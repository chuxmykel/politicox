/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import parties from '../app/model/parties';
import offices from '../app/model/offices';
import server from '../server';

chai.should();

chai.use(chaiHttp);

const partyEndPoint = '/api/v1/parties/';
const officeEndPoint = '/api/v1/offices/';

describe('Party Tests', () => {
  describe(`POST ${partyEndPoint}`, () => {
    it('Should return 201 if party creation works', (done) => {
      const party = {
        id: parties.length + 1,
        name: 'WAP',
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
    it('Should return 400 if name is missing', (done) => {
      const party = {
        id: parties.length + 1,
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
        id: parties.length + 1,
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
      const id = 3;
      chai.request(server)
        .get(`${partyEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should have 404 as status code if party not found', (done) => {
      const id = 3;
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
      const id = 20;
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
        id: offices.length + 1,
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
        id: offices.length + 1,
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
        id: offices.length + 1,
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
      const id = 3;
      chai.request(server)
        .get(`${officeEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should have 404 as status code if office not found', (done) => {
      const id = 3;
      chai.request(server)
        .get(`${officeEndPoint}${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
