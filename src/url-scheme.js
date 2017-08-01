function notImplementedError() {
  return Promise.reject(new Error('Not implemented'));
}

export default class URLScheme {
  /**
   * supported methods
   * @return {string[]} 'get', 'stat', 'put', 'delete', 'list', 'history'
   */
  static get methods() {
    return ['get', 'stat', 'put', 'delete', 'list', 'history'];
  }

  /**
   * @return {boolean} false
   */
  static get isSecure() {
    return false;
  }

  /**
   * @return {mumber} undefined by default
   */
  static get defaultPort() {
    return undefined;
  }

  /**
   * Should be overwritten to reflect the scheme name
   * @return {string} scheme name (defaults to the class name)
   */
  get name() {
    return this.constructor.name;
  }

  /**
   * @return {number} default from static defaultPort
   */
  get defaultPort() {
    return this.constructor.defaultPort;
  }

  /**
   * @return {boolean} default from static isSecure
   */
  get isSecure() {
    return this.constructor.isSecure;
  }

  toString() {
    return this.name;
  }

  /**
   * List collection (directory)
   * @param context {Context} execution context
   * @param url {URL}
   * @param options {object?}
   * @return {Promise} resolves to iterable entries
   */
  async *list(context, url, options) {
    return notImplementedError();
  }

  /**
   * Get content of a url
   * @param context {Context} execution context
   * @param url {URL}
   * @param options {object?}
   * @return {Promise} resolves to the content
   */
  async get(context, url, options) {
    return notImplementedError();
  }

  /**
   * Delivers meta information for a given url
   * @param context {Context} execution context
   * @param url {URL}
   * @param options {object?}
   * @return {Promise} resolves to one entry
   */
  async stat(context, url, options) {
    return notImplementedError();
  }

  /**
   * Put the content of a stream to a given url
   * @param context {Context} execution context
   * @param url {URL}
   * @param stream {Stream}
   * @param options {object?}
   * @return {Promise} resolves if stream has ben put to the url
   */
  async put(context, url, stream, options) {
    return notImplementedError();
  }

  /**
   * Deletes object at a given url
   * @param context {Context} execution context
   * @param url {URL}
   * @return {Promise} resolves to the history of the object at the given url
   */
  async delete(context, url) {
    return notImplementedError();
  }

  /**
   * Deliver history information for a given url
   * @param context {Context} execution context
   * @param url {URL}
   * @param options {object?}
   * @return {Promise} resolves to the history of the object at the given url
   */
  async *history(context, url, options) {
    return notImplementedError();
  }
}
