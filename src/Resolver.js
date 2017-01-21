/* jslint node: true, esnext: true */

'use strict';

import URLScheme from './URLScheme';

function generate(name) {
  return function (url, ...args) {
    const scheme = this.schemeForURL(url);
    return scheme ? scheme[name](url, ...args) : Promise.reject(new Error(`Unknwon scheme ${url}`));
  };
}


/**
 *
 */
export default class Resolver extends URLScheme {
  constructor(config = {}) {
    super();

    Object.defineProperty(this, 'schemes', {
      value: new Map()
    });

    /*
        Object.keys(config.schemes).fotEach(name => {
          const s = config.schemes[name];
          this.registerScheme();
        });
    */

    this.constructor.methods.forEach(name =>
      Object.defineProperty(this, name, {
        value: generate(name)
      }));
  }

  /**
   * register a scheme for later lookup
   * @param {URLScheme} scheme
   */
  registerScheme(scheme) {
    this.schemes.set(scheme.name, scheme);
  }

  /**
   * get URLScheme for a given url
   * @param {string} url
   * @return {URLScheme} for a given url
   */
  schemeForURL(url) {
    const m = url.match(/^([^:]+):/);
    return this.schemes.get(m[1]);
  }
}
