'use strict';

var createError = require('errno').create;

var PioncoreNodeError = createError('PioncoreNodeError');

var RPCError = createError('RPCError', PioncoreNodeError);

module.exports = {
  Error: PioncoreNodeError,
  RPCError: RPCError
};
