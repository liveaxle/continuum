'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - DOMAIN
 ***********************************************************************************************************************************************
 * @description
 */
const chai = require('chai');
const Domain = using('src/domain');
const Users = new Domain('users', {type:Array});
const user = {first_name: 'Captain', last_name: 'Spacetime', age: Infinity};

 //
 // Chai constants
 //------------------------------------------------------------------------------------------//
 // @description
 //
 const expect = chai.expect;
 const assert = chai.assert;

 describe('Continuum - Domains', () => {
   describe('Continuum - Domains - CREATE', () => {
     it('Should Create a user', runner.stub);
   });

   describe('Continuum - Domains - UPDATE', () => {

   });

   describe('Continuum - Domains - GET', () => {

   });

   describe('Continuum - Domains - DELETE', () => {

   });
 });
