'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UNIT - COLLECTION
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Collection = using('src/structs/collection');
const faker = require('faker');

//
// Chai constants
//------------------------------------------------------------------------------------------//
// @description
//
const expect = chai.expect;
const assert = chai.assert;

//
// TEST DATA
//------------------------------------------------------------------------------------------//
// @description
//
const key = 'continuum.key';

const data = Array.apply(null, Array(10)).map(() => {
  return {first_name: faker.name.firstName(), last_name: faker.name.lastName()};
});

const collection = new Collection(data, {});

/**
 * Collection Spec
 */
describe('Continuum - Structs - Collection', () => {

  //
  // COLLECTION WRITE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Write', () => {


    it('If I initialize a Collection with data, it should write it.', () => {
      let contents = collection.read();

      expect(contents.length).to.equal(data.length);
    });

    it('Should decorate the saved data with a key - if member is a composite', () => {
      let contents = collection.read();
      let has_keys = contents.filter(item => item[key]);

      expect(has_keys.length).to.equal(contents.length);
    });

    it('The key should not be changeable', () => {
      let contents = collection.read();
      let member = contents[4];

      expect(()=>{member[key] = 'foo'}).to.throw();
    });

    it('Should update the correct item in the collection because of the key', () => {
      let contents = collection.read();
      let member = contents[4];

      member.first_name = 'Testy';
      member.last_name = 'McTesterton';

      collection.write(member);

      let newContents = collection.read();
      let newMember = contents[4];

      expect(newMember.first_name).to.equal(member.first_name);
      expect(newMember.last_name).to.equal(member.last_name);
    });

    it('Should prevent me from writing values if mutable is false', (done) => {
      let data = {first_name: 'nope', last_name: 'not me'};

      collection.write(data, {prepend: true, mutable: false});

      let contents = collection.read();

      expect(() => {contents[0].first_name = 'foo'}).to.throw();

      done();
    });

    it(`Should add a new item to the collection if no key is present. Once added it should be given a key
      If 'prepend' is specified it should be added to beginning of collection, else, it should be added to end.`, () => {
        const data = {first_name: 'Ken', last_name: 'Stowell'};
        let before_insert = collection.read().length;

        collection.write(data);

        let contents = collection.read();
        let added = contents[contents.length-1];

        expect(contents.length).to.equal(before_insert + 1);
        expect(added.first_name).to.equal(data.first_name);
        expect(added.last_name).to.equal(data.last_name);
        expect(data[key]).to.equal(undefined);
        collection.write(data, {prepend: true});
        contents = collection.read();
        expect(contents[0].first_name).to.equal(data.first_name);
    });

    it('If instructed to flatten, arrays written to the collection should have all elements as first-class members of the collection', () => {
      let data = [{foo:'bar'}, {'baz': 'bang'}];
      let before_write = collection.read().length;

      collection.write(data, {flatten:true});

      let contents = collection.read();

      expect(contents.length).to.equal(before_write+2);
    });

    it('If an array is written to the collection, without flatten specified it should simply nest the array', () => {
      let data = [{foo:'bar'}, {'baz': 'bang'}];
      let before_write = collection.read().length;

      collection.write(data);

      let contents = collection.read();

      expect(contents.length).to.equal(before_write+1);
    });
  });

  //
  // COLLECTION READ SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Read', () => {
    it('Should return members of the collection', () => {
      let contents = collection.read();
      expect(contents).to.have.lengthOf.above(0);
    });
  });

  //
  // COLLECTION REMOVE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Collection - Remove', () => {
    it('If a key is present, the collection member should be removed in place', () => {
      let member = collection.read()[4];
      collection.remove(member);
      let newMember = collection.read()[4];
      expect(member).to.not.equal(newMember);
    });
  });
});
