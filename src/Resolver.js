/* jslint node: true, esnext: true */

'use strict';

import {
  defineRegistryProperties
} 
from 'registry-mixin';

export default class Resolver {
  constructor() {
    defineRegistryProperties(this, 'scheme', {});
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
