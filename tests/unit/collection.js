'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UNIT - COLLECTION
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Collection = using('src/structs/collection');

//
// Chai constants
//------------------------------------------------------------------------------------------//
// @description
//
const expect = chai.expect;
const assert = chai.assert;

describe('Continuum - Structs - Collection', () => {

  //
  // COLLECTION WRITE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Write', () => {
    it('If I initialize a Collection with data, it should write it.', runner.stub);

    it('Should decorate the saved data with a key', runner.stub);

    it('The key should not be changeable', runner.stub);

    it('Should update the correct item in the collection because of the key', runner.stub);

    it('Should add a new item to the collection if no key is present.', runner.stub);

    it('If instructed to flatten, arrays written to the collection should have all elements as first-class members of the collection', runner.stub);

    it('If an array is written to the collection, without flatten specified it should simply nest the array', runner.stub);
  });

  //
  // COLLECTION READ SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Read', () => {
    it('Should return members of the collection', runner.stub);

    it('Should find members of a collection with a query', runner.stub);
  });

  //
  // COLLECTION REMOVE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Remove', () => {
    it('If a key is present, the collection member should be remove in place', runner.stub);
  });
});
