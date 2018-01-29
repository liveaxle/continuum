'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UNIT - COMPOSITE
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Composite = using('src/structs/composite');
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

const data =  {
  id: faker.random.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  age: faker.random.number({min: 1, max: 120}),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  created: faker.date.recent()
};

let composite = new Composite(data, {});


/**
 * Composite Spec
 */
describe('Continuum - Structs - Composite', () => {

  //
  // COMPOSITE WRITE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Composite - Write', () => {

    it('If I initialize a Composite with data, it should write it.', () => {
      let obj = composite.read();

      expect(obj).to.include.all.keys(Object.keys(data));
    });

    it('Should decorate the saved data with a key', () => {
      let obj = composite.read();
      expect(obj).to.have.own.property(key);
    });

    it('The key should not be changeable', () => {
      let obj = composite.read();
      expect(()=>{obj[key] = 'iThinkICanChangeTheKeyButICant'}).to.throw();
    });

    it('I should be able to overwrite Composite properties.', () => {

      data.first_name = "Punchface";
      data.last_name = "McRadical";

      composite.write(data);

      let obj = composite.read();

      expect(obj.first_name).to.equal(data.first_name);
      expect(obj.last_name).to.equal(data.last_name);
    });

    it('I should be able to add properties to the Composite by setting config.merge to true', () => {
      let newProps = {
        jobType: faker.name.jobType(),
        jobTitle: faker.name.jobType()
      };

      composite.write(newProps, {merge: true});

      let obj = composite.read();

      expect(obj).to.include(Object.assign({}, data, newProps));
    });

    it('Should prevent me from overwritting properties if mutable is false', (done) => {
      let protectedData = {first_name: 'Bedrock', last_name: 'Manshadow'};
      let protectedComposite = new Composite(protectedData, {mutable: false});
      protectedComposite.write({first_name: 'foo', last_name: 'bar'});
      let obj = protectedComposite.read();

      expect(obj.last_name).to.equal(protectedData.last_name);

      done();
    });
  });

  //
  // COMPOSITE READ SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Composite - Read', () => {
    it('Composite should have all the correct properties and values', () => {
      let obj = composite.read();
      expect(obj).to.include(data);
    });
  });

  //
  // COMPOSITE REMOVE SPEC
  //------------------------------------------------------------------------------------------//
  // @description
  //
  describe('Continuum - Structs - Composite - Remove', () => {
    it('Remove should empty the object', () => {
      composite.remove();
      let obj = composite.read();
      expect(obj).to.be.empty;
    });
  });
});
