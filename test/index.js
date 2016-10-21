'use strict';

const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');
const map = 'a.js.map';

test('fly-imba', t => {
	t.plan(8);

	const fly = new Fly({
		plugins: [{
			func: require('../')
		}],
		tasks: {
			a: function * () {
				const read = () => this.$.read(`${tmp}/a.js`, 'utf8');
				const want = yield this.$.read(`${dir}/a.js`, 'utf8');

				t.ok('imba' in fly, 'attach `imba()` plugin to fly');

				// #1
				yield this.source(`${dir}/*.imba`).imba().target(tmp);
				const str1 = yield read();
				t.ok(str1, 'convert to `.js` file');
				t.equal(str1, want, 'compile imba code to correct javascript');

				// #2
				yield this.source(`${dir}/*.imba`).imba({bare: 1}).target(tmp);
				const str2 = yield read();
				t.false(str2.includes('(function(){\n'), 'via `bare`; compile without top-level func wrapper');

				// #3
				yield this.source(`${dir}/*.imba`).imba({sourceMap: 1}).target(tmp);
				const str3 = yield read();
				t.true(str3.includes(`sourceMappingURL=${map}`), 'via `sourceMap`; append url to external source map');
				t.true(yield this.$.find(`${tmp}/${map}`), 'via `sourceMap`; create an external source map');
				yield this.clear(tmp);

				// #4
				yield this.source(`${dir}/*.imba`).imba({sourceMap: 1, sourceMapInline: 1}).target(tmp);
				const str4 = yield read();
				t.true(str4.includes(`sourceMappingURL=data:application/json`), 'via `sourceMapInline`; append inline source map');
				t.false(yield this.$.find(`${tmp}/${map}`), 'via `sourceMapInline`; do not create an external source map');
				yield this.clear(tmp);
			}
		}
	});

	fly.start('a');
});
