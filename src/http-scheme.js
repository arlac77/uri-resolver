import { URLScheme } from './url-scheme';
import { parseAuthenticate } from './util';

import fetch from 'node-fetch';
import btoa from 'btoa';

import HttpProxyAgent from 'http-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';

/**
 * URLScheme for http requests
 * @param {Object} options
 * @param {string} options.proxy
 * @param {Object} options.credentials
 * @param {string} options.credentials.user
 * @param {string} options.credentials.password
 *
 * @property {Object} options
 */
export class HTTPScheme extends URLScheme {
  /**
   * @return {string} 'http'
   */
  static get name() {
    return 'http';
  }

  /**
   * @return {number} 80 the http default port
   */
  static get defaultPort() {
    return 80;
  }

  /**
   * Extract options suitable for the constructor
   * form the given set of environment variables
   * @param {Object} env
   * @return {Object} undefined if no suitable environment variables have been found
   */
  static optionsFromEnvironment(env) {
    if (env !== undefined) {
      if (env.HTTP_PROXY !== undefined) {
        return { proxy: env.HTTP_PROXY };
      }
      if (env.HTTPS_PROXY !== undefined) {
        return { proxy: env.HTTPS_PROXY };
      }
    }

    return undefined;
  }

  setOptions(options = {}) {
    Object.defineProperty(this, 'httpOptions', { value: { headers: {} } });

    if (options.proxy !== undefined) {
      this.httpOptions.agent = this.isSecure
        ? new HttpsProxyAgent(options.proxy)
        : new HttpProxyAgent(options.proxy);
    }

    super.setOptions(options);
  }

  /**
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} fetch result
   */
  async fetch(context, url, options = {}) {
    options = Object.assign({}, options, this.httpOptions, {
      headers: Object.assign({}, this.httpOptions.headers, options.headers)
    });

    let response;

    for (let n = 1; n <= 2; n++) {
      response = await fetch(url, options);

      if (response.status < 200 || response.status >= 300) {
        switch (response.status) {
          case 401:
            const credentials = await this.provideCredentials(
              context,
              parseAuthenticate(response.headers.get('WWW-Authenticate'))
            );
            if (credentials !== undefined) {
              this.addAuthorizationHeader(options.headers, credentials);
              break;
            }
          default:
            throw new Error(response);
        }
      } else {
        return response;
      }
    }
    return response;
  }

  /**
   * Execute a GET request
   * @param {Context} context execution context
   * @param {URL} url source
   * @param {Object} options
   * @return {Promise} body of the response
   */
  async get(context, url, options) {
    const response = await this.fetch(context, url, options);
    return response.body;
  }

  /**
   * Execute a PUT request
   * @param {Context} context execution context
   * @param {URL} url destination
   * @param {Stream} stream content to be put to the url
   * @param {Object} options
   */
  async put(context, url, stream, options) {
    return this.fetch(
      context,
      url,
      Object.assign(
        {
          method: 'put',
          data: stream
        },
        options
      )
    );
  }

  /**
   * Execute a HEAD request
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @param {string} options.method
   * @return {Object} response object
   */
  async stat(context, url, options) {
    return this.fetch(
      context,
      url,
      Object.assign(
        {
          method: 'head'
        },
        options
      )
    );
  }

  /**
   * inserts the authorization data into the reguest header
   * @param {Object} headers http credentials will be inserted into
   * @param {Object} credentials
   *
   * @return {boolean} true if auth info has been written into headers
   */
  addAuthorizationHeader(headers, credentials) {
    if (credentials !== undefined) {
      if (
        credentials.user !== undefined &&
        credentials.password !== undefined
      ) {
        headers.authorization =
          'Basic ' + btoa(credentials.user + ':' + credentials.password);
        return true;
      }
    }

    return false;
  }
}
