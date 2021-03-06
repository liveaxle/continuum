'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM
 ***********************************************************************************************************************************************
 * @description
 */
const Domain = require('./domain');
const Resource = require('./resource');
const Service = require('./service');
const Store = require('./store');
const Data = require('./data');
const Structs = require('./structs');
const Utils = require('./utils');
const Security = require('./security');
const Model = require('./model');
const Router = require('./router');
const Route = require('./route');
const View = require('./view');

/**
 * API
 * @type {Object}
 */
module.exports = {
  Security, Domain, Service,
  Store, Data, Utils, Model, View, Router, Resource, Structs, Route};
