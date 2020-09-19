// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSystem = require('../../../app/controller/system');

declare module 'egg' {
  interface IController {
    system: ExportSystem;
  }
}
