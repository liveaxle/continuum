'use strict';

/***********************************************************************************************************************************************
 * SYSTEM
 ***********************************************************************************************************************************************
 * @description
 */
import Router from './router';
import Settings from './settings';
import View from './view';
import Resource from './resource';
import Domain from './domain';
import Service from './service';
import Store from './store';
import Data from './data';
import Utils from './utils';
import Authentication from './authentication';
import Security from './security';
import Identity from './identity';
import Constants from './constants';
import Model from './model';

const exports = {
  Router, Settings, View, Resource,
  Authentication, Security, Identity,
  Domain, Service, Store, Data, Utils, Constants, Model};

export exports;

/**
 * System Export
 */
export default exports;
