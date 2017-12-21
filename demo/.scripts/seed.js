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
const uuid = require('uuid/v4');

//
// SEED CONFIG
//------------------------------------------------------------------------------------------//
// @description
//
const entries = args.entries || 25;
const outdir = path.join(process.cwd(), 'demo', '.data');
const outfile = 'db.json';
const data = {users: []};

//
// USER MODEL
//------------------------------------------------------------------------------------------//
// @description
//
class User {
  constructor() {
    this.id = uuid();
    this.first_name = faker.name.firstName();
    this.last_name = faker.name.lastName();
    this.age = faker.random.number({min: 15, max: 100});
    this.phone = faker.phone.phoneNumber();
    this.address = faker.address.streetAddress();
    this.city = faker.address.city();
    this.created = faker.date.past();
  }
}

Array.apply(null, Array(entries)).forEach(idx => {
  data.users.push(new User);
});

try {
  fs.lstatSync(outdir);
} catch(e) {
  fs.mkdirSync(outdir);
}

// write to "db."
fs.writeFile(path.join(outdir, outfile), JSON.stringify(data), {encoding: 'UTF-8'}, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log(`${entries} entries added to ${outfile}`);
});
