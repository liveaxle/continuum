'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UNIT - STORE
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Store = using('src/store');

//
// Chai constants
//------------------------------------------------------------------------------------------//
// @description
//
const expect = chai.expect;
const assert = chai.assert;

//
// STORES
//------------------------------------------------------------------------------------------//
// @description
//
const store = new Store();
const data = {foo: 'bar'};
let sub;
let events = 0;

//
// TESTS
//------------------------------------------------------------------------------------------//
// @description
//
describe('Continuum - Store - write', () => {
  it('If we inititialize a store with data, it should save it.', () => {
    let store = new Store({}, data);

    expect(store.get()).to.equal(data);
  });

  it('Should allow me up subscribe to changes in the store', (done) => {
    sub = store.subscribe((contents) => {
      events++;
      expect(contents).to.equal(data);
      done();
    });

    store.set(data).dispatch();
  });

  it('Should let me cancel my subscription to the store', () => {
    sub.cancel();

    store.dispatch();

    expect(events).to.equal(1);
  });

  it('Should let me empty the store\'s contents', () => {
    store.clear();

    expect(store.get()).to.equal(null);
  });

  it('Should prevent writing null/undefined to the store (needs to use Store.clear)', () => {
    expect(store.set).to.throw();
  });
});
