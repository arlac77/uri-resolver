import { URLScheme } from './url-scheme';
import { URL } from 'url';

function generate(name) {
  return function(context, url, ...args) {
    return this.baseScheme[name](context, this.remap(url), ...args);
  };
}

/**
 * Remap url
 * brs:some/path  -> https://myserver.com/repo/some/path
 * name: brs
 * baseScheme: https
 * prefix: https://myserver.com/repo/
 * @param {URLScheme} baseScheme
 * @param {string} name of the newly created scheme
 * @param {string} prefix urls will be prefixed by this value
 *
 * @property {URLScheme} baseScheme
 * @property {string} name of the newly created scheme
 * @property {string} prefix urls will be prefixed by this value
 */
export class URLMapperScheme extends URLScheme {
  constructor(baseScheme, name, prefix) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });

    Object.defineProperty(this, 'name', {
      value: name
    });

    Object.defineProperty(this, 'prefix', {
      value: prefix
    });

    this.constructor.methods.forEach(name =>
      Object.defineProperty(this, name, {
        value: generate(name)
      })
    );
  }

  /**
   * Remapps url by separating scheme (and direct following '/') from suffix
   * and appending the suffix (in front)
   * @param {URL} url to be remapped
   * @return {URL} remapped url
   */
  remap(url) {
    const m = url.href.match(/^[^:]+:(\/\/)?(.*)/);
    return m ? new URL(this.prefix + m[2]) : url;
  }
}
