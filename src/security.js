'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - SECURITY
 ***********************************************************************************************************************************************
 * @description
 */
const jwt = require('jsonwebtoken');

/**
 *
 */
module.exports = {encrypt, decrypt};

/**
 * [encrypt description]
 * @param  {[type]} creds [description]
 * @return {[type]}       [description]
 */
function encrypt(data) {
  return jwt.sign(data, process.env.KEY);
}

/**
 * [decrypt description]
 * @return {[type]} [description]
 */
function decrypt(token) {
  let decrypted = null;

  try {
    decrypted = jwt.verify(token, process.env.KEY);
  } catch(e) {
    console.warn(`Could not decrypt: ${token}`);
  }

  return decrypted;
}
