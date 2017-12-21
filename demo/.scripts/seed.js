'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - SEED
 ***********************************************************************************************************************************************
 * @description
 */
const fs = require('fs');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const faker = require('faker');

//
// SEED CONFIG
//------------------------------------------------------------------------------------------//
// @description
//
const entries = args.entries || 100;
const outfile = path.join(process.cwd(), 'demo', '.data', 'db.json');
const data = {users: []};

//
// USER MODEL
//------------------------------------------------------------------------------------------//
// @description
//
class User {
  constructor() {
    this.first_name = faker.name.firstName();
    this.last_name = faker.name.lastName();
    this.age = faker.random.number({min: 15, max: 100});
    this.phone = faker.phone.phoneNumber();
    this.address = faker.address.streetAddress();
    this.city = faker.address.city();
  }
}

Array.apply(null, Array(entries)).forEach(idx => {
  data.users.push(new User);
});

// write to db.
fs.writeFile(outfile, JSON.stringify(data), {encoding: 'UTF-8'}, (err) => {
  console.log(`${entries} entries added to ${outfile}`);
});
