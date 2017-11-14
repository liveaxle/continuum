'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - SECURITY
 ***********************************************************************************************************************************************
 * @description
 */
import jwt from 'jsonwebtoken';

/**
 *
 */
export default {encrypt, decrypt};

/**
 * [encrypt description]
 * @param  {[type]} creds [description]
 * @return {[type]}       [description]
 */
export function encrypt(data) {
  return jwt.sign(data, process.env.KEY);
}

/**
 * [decrypt description]
 * @return {[type]} [description]
 */
export function decrypt(token) {
  let decrypted = null;

  try {
    decrypted = jwt.verify(token, process.env.KEY);
  } catch(e) {
    console.warn(`Could not decrypt: ${token}`);
  }

  return decrypted;
}
