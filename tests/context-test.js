import test from 'ava';
import Resolver from '../src/resolver';
import Context from '../src/context';
import HTTPScheme from '../src/http-scheme';

const { URL } = require('url');

test('context from resolver', t => {
  const resolver = new Resolver();

  const context = resolver.createContext(new URL('http://www.heise.de'));

  t.is(
    context.resolve('index.html').href,
    new URL('http://www.heise.de/index.html').href
  );
});

test.cb('context can get', t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext(new URL('http://www.heise.de'));

  t.plan(1);

  context.get(new URL('http://www.heise.de/index.html')).then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});
