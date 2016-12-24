[![npm](https://img.shields.io/npm/v/uri-resolver.svg)](https://www.npmjs.com/package/uri-resolver)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/uri-resolver)
[![Build Status](https://secure.travis-ci.org/arlac77/uri-resolver.png)](http://travis-ci.org/arlac77/uri-resolver)
[![bithound](https://www.bithound.io/github/arlac77/uri-resolver/badges/score.svg)](https://www.bithound.io/github/arlac77/uri-resolver)
[![codecov.io](http://codecov.io/github/arlac77/uri-resolver/coverage.svg?branch=master)](http://codecov.io/github/arlac77/uri-resolver?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/uri-resolver/badge.svg)](https://coveralls.io/r/arlac77/uri-resolver)
[![Code Climate](https://codeclimate.com/github/arlac77/uri-resolver/badges/gpa.svg)](https://codeclimate.com/github/arlac77/uri-resolver)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/uri-resolver/badge.svg)](https://snyk.io/test/github/arlac77/uri-resolver)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/uri-resolver.svg?style=flat-square)](https://github.com/arlac77/uri-resolver/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/uri-resolver.svg?label=ready&title=Ready)](http://waffle.io/arlac77/uri-resolver)
[![Dependency Status](https://david-dm.org/arlac77/uri-resolver.svg)](https://david-dm.org/arlac77/uri-resolver)
[![devDependency Status](https://david-dm.org/arlac77/uri-resolver/dev-status.svg)](https://david-dm.org/arlac77/uri-resolver#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/uri-resolver.svg?branch=master)](http://inch-ci.org/github/arlac77/uri-resolver)
[![downloads](http://img.shields.io/npm/dm/uri-resolver.svg?style=flat-square)](https://npmjs.org/package/uri-resolver)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

uri-resolver
-------------------
resolves uris and provides fs like access

# API Reference

* <a name="get"></a>

## get(url) ⇒ <code>Promise</code>
Creates a readable stream for the content of th file associated to a given file URL

**Kind**: global function  
**Fulfil**: <code>ReadableStream</code> - of the file content  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="stat"></a>

## stat(url) ⇒ <code>Promise</code>
Read stat of a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Object</code> - as delivered by fs.stat()  
**Reject**: <code>Error</code> - if url is not a file url or fs.stat() error  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="put"></a>

## put(url) ⇒ <code>Promise</code>
Put content of a stream to a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Void</code> - undefined  
**Reject**: <code>Error</code> - if url is not a file url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="delete"></a>

## delete(url) ⇒ <code>Promise</code>
Deletes the file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Void</code> - undefined  
**Reject**: <code>Error</code> - as delivered by fs.unlink()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="list"></a>

## list(url) ⇒ <code>Promise</code>
List content of a directory

**Kind**: global function  
**Fulfil**: <code>String[]</code> - file names  
**Reject**: <code>Error</code> - as delivered by fs.readdir()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a directory |


* <a name="schemeForURI"></a>

## schemeForURI(uri) ⇒ <code>URIScheme</code>
get URIScheme for a given uri

**Kind**: global function  
**Returns**: <code>URIScheme</code> - for a given uri  

| Param | Type |
| --- | --- |
| uri | <code>String</code> | 


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install uri-resolver
```

license
=======

BSD-2-Clause
