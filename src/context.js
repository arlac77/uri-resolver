import URLScheme from './url-scheme';

const { URL } = require('url');

/**
 * Holds context information
 * base - the current base URL
 *
 */
export default class Context {
  constructor(resolver, base) {
    Object.defineProperty(this, 'resolver', {
      value: resolver
    });

    this._base = base;
  }

  get base() {
    return this._base;
  }

  set base(url) {
    this._base = url;
  }

  resolve(url) {
    return this.resolver.resolve(new URL(url, this.base));
  }
}

URLScheme.methods.forEach(name =>
  Object.defineProperty(Context.prototype, name, {
    value: function(url, ...args) {
      return this.resolver[name](this, new URL(url, this.base), ...args);
    }
  })
);
