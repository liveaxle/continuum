'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UNIT - MODEL
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Model = using('src/model');
const Composite = using('src/structs/composite');
const Joi = require('joi');
const Constants = using('src/constants');

//
// Chai constants
//------------------------------------------------------------------------------------------//
// @description
//
const expect = chai.expect;
const assert = chai.assert;

const model = new Model('User', Joi.object({
  name: Joi.string(),
  age: Joi.number()
}));

let user = model({name: 'Punchface McRadical'});
const composite = new Composite(user);

//
// TESTS
// ------------------------------------------------------------------------------------------//
// @description
//
describe('Continuum - Models', () => {
  it('Should preserve the struct key when using the model factory', () => {
    composite.write({age: 30}, {merge: true})
    let data = composite.read();
    let cloned = model(data);
    
    expect(cloned['continuum.key']).equal(data['continuum.key']);
    expect(user.age).equal(undefined);
  });
})
