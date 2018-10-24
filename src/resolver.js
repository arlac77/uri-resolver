import { URLScheme } from "./url-scheme";
import { Context } from "./context";
import { URLMapperScheme } from "./url-mapper-scheme";

/**
 * Holds a map of url-schemes and dispatches requests
 * @param {Object} config
 * @param {URLScheme[]} predefinedConstructors schemes to start with
 * @param {Object} env environment variables as present in process.env
 *
 * @property {Map<string,URLScheme>} schemes
 * @property {Object[]} authProviders
 */
export class Resolver extends URLScheme {
  constructor(config = {}, predefinedConstructors = [], env = {}) {
    super(config);

    Object.defineProperties(this, {
      schemes: {
        value: new Map()
      },
      authProviders: { value: [] }
    });

    predefinedConstructors.forEach(schemeConstructor => {
      const scheme = new schemeConstructor(
        schemeConstructor.options(schemeConstructor.optionsFromEnvironment(env))
      );
      this.registerScheme(scheme);
    });

    if (config.schemes !== undefined) {
      Object.keys(config.schemes).forEach(name => {
        const schemeConfig = config.schemes[name];

        const scheme =
          schemeConfig.options === undefined
            ? this.schemes.get(schemeConfig.base)
            : new (predefinedConstructors.find(
                pc => pc.name === schemeConfig.base
              ))(schemeConfig.options);

        this.registerScheme(
          schemeConfig.prefix === undefined
            ? scheme
            : new URLMapperScheme(
                scheme,
                name,
                schemeConfig.prefix,
                schemeConfig.options
              )
        );
      });
    }
  }

  /**
   * Register a scheme for later lookup
   * @param {URLScheme} scheme
   */
  registerScheme(scheme) {
    this.schemes.set(scheme.name, scheme);
  }

  /**
   * Get URLScheme for a given url
   * @param {URL} url
   * @return {URLScheme} for a given url or undefined if nothing found
   */
  schemeForURL(url) {
    const protocol = url.protocol;

    if (protocol === undefined) {
      return undefined;
    }

    return this.schemes.get(protocol.replace(/:/, ""));
  }

  /**
   * Resolve for a given url.
   * Passes url to the registered scheme for remapping
   * @param {URL} url to be resolved
   * @return {URL} resolved url or original URL if no remapping found
   */
  resolve(url) {
    const scheme = this.schemeForURL(url);
    return scheme === undefined ? url : scheme.remap(url);
  }

  /**
   * Create a new context
   * @param {Object} options context
   * @return {Context} newly created context
   */
  createContext(options) {
    return new Context(this, options);
  }

  /**
   * Called when authorization is required.
   * Forwards the request to the registered auth providers
   * @param {string} realm requested realm
   * @return {Object} credentials as given by one of the registered auth providers
   */
  async provideCredentials(realm) {
    for (const provider of this.authProviders) {
      const credentials = await provider.provideCredentials(realm);
      if (credentials !== undefined) {
        return credentials;
      }
    }

    return undefined;
  }

  async *list(context, url, options) {
    const scheme = this.schemeForURL(url);
    if (scheme === undefined) {
      throw new Error(`Unknown scheme ${url}`);
    }

    return scheme.list(context, url, ...args);
  }

  async *history(context, url, options) {
    const scheme = this.schemeForURL(url);
    if (scheme === undefined) {
      throw new Error(`Unknown scheme ${url}`);
    }

    return scheme.history(context, url, ...args);
  }
}

function generate(name) {
  return function(context, url, ...args) {
    const scheme = this.schemeForURL(url);
    return scheme === undefined
      ? Promise.reject(new Error(`Unknown scheme ${url}`))
      : scheme[name](context, url, ...args);
  };
}

Resolver.methods.forEach(name =>
  Object.defineProperty(Resolver.prototype, name, {
    value: generate(name)
  })
);
