# fly-imba [![][travis-badge]][travis-link]

> Compile [Imba](http://imba.io/home) files with Fly.


## Install

```
npm install --save-dev fly-imba
```

## Usage

```js
exports.default = function * (fly) {
  yield fly.source('app/**/*.imba')
    .imba({
      bare: true,
      sourceMap: true
    })
    .target('dist/js');
}
```

## API

### .imba(options)

#### options.bare

Type: `boolean`<br>
Default: `false`

Compile without a top-level function wrapper.

#### options.sourceMap

Type: `boolean`<br>
Default: `false`

Generate a source map per file. External source maps will be created unless `sourceMapInline` is specified.

```
\src
  |- app.imba
\dist
  |- app.js
  |- app.js.map
```

#### options.sourceMapInline

Type: `boolean`<br>
Default: `false`

Embed the file's source mapping as a `base64` string. You must set `sourceMap` to `true` in order for this setting to work.

## License

MIT © [Luke Edwards](https://lukeed.com)

[travis-link]:  https://travis-ci.org/lukeed/fly-imba
[travis-badge]: http://img.shields.io/travis/lukeed/fly-imba.svg?style=flat-square
