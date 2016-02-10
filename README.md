<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> Compile [Imba](http://imba.io/home) files with Fly.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]

> Note: This plugin depends on a Imba PR. It will be published as `1.0.0` when the PR is accepted.

## Install

```a
npm install -D fly-imba
```

## Example

```js
export default function* () {
  yield this.source('app/**/*.imba')
    .imba()
    .target('dist/js');
}
```

## License

MIT © [Luke Edwards](https://lukeed.com) et [al][contributors]

[contributors]: https://github.com/lukeed/fly-imba/graphs/contributors
[releases]:     https://github.com/lukeed/fly-imba/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-imba
[npm-ver-link]: https://img.shields.io/npm/v/fly-imba.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-imba.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-imba
[travis-badge]: http://img.shields.io/travis/lukeed/fly-imba.svg?style=flat-square
