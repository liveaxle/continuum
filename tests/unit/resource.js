'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM TESTS - UNIT - RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Resource = using('src/resource');
const Response = using('src/resource/response');


//
// Chai constants
//------------------------------------------------------------------------------------------//
// @description
//
const expect = chai.expect;
const assert = chai.assert;


//
// USERS RESOURCE
//------------------------------------------------------------------------------------------//
// @description
//
const Users = new Resource('users', {
  base: process.env.API
});

const spec = {passed: [], failed: []};


describe('Continuum - Resource - Retrieval', () => {
  let request = Users.get({params: {_sort: 'created'}, headers: {'Continuum-Request-Header': Math.random().toString(32).substr(2, 16)}});

  request.then(()=> {}, (e) => {
    if(e.message.match('ECONNREFUSED')) {
      throw new Error('Continuum - to run the unit tests you need to have the demo server running: `npm run demo:seed && npm run demo:server`');
    }
  });

  it('Should Return an instance of Response', (done) => {
    request.then(response => {
      expect(response instanceof Response).to.equal(true);
    }).then(done).catch(done);
  });

  it('Should contain user data from /users', (done) => {
    request.then(response => {
      expect(response.data).to.not.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data).to.have.length.above(0);
    }).then(done).catch(done);
  });

  it('Should contain params given to the request wrapper', (done) => {
    request.then(response => {
      expect(response.config.params._sort).to.equal('created');
    }).then(done).catch(done);
  });

  it('Should contain headers given to the request wrapper', (done) => {
    request.then(response => {
      expect(response.config.headers['Continuum-Request-Header']).to.not.equal(undefined);
    }).then(done).catch(done);
  });

  it('Should execute error handlers on errant status codes', (done) => {
    Users.get({url: '/merp'})
      .then(response => {
        throw new Error('Success Handler was called.');
      }).catch(e => {
        expect(e).to.not.equal(null);
      }).then(done).catch(done);
  });

  it('Sould replace dynamic segements in the url', runner.stub);
});
