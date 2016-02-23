/* jslint node: true, esnext: true */

"use strict";

const rgm = require('registry-mixin');

class Resolver {
  constructor() {
    rgm.defineRegistryProperties(this, 'scheme', {});
  }

  schemeForURI(uri) {
    const m = uri.match(/^([^:]+):/);
    return this.schemes[m[1]];
  }

  fetch(uri, options) {
    return this.schemeForURI(uri).fetch(uri, options);
  }

  list(uri, options) {
    return this.schemeForURI(uri).list(uri, options);
  }

  history(uri, options) {
    return this.schemeForURI(uri).history(uri, options);
  }
}

exports.Resolver = Resolver;
const urs = require('./uri-scheme');
exports.URIScheme = urs.URIScheme;
exports.URIMapperScheme = urs.URIMapperScheme;

const hs = require('./http-scheme');
exports.HTTPScheme = hs.HTTPScheme;
