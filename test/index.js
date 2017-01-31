'use strict';

const {join} = require('path');
const test = require('tape');
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');
const map = 'a.js.map';

test('fly-imba', t => {
	t.plan(8);

	const fly = new Fly({
		plugins: [
			require('../'),
			require('fly-clear')
		],
		tasks: {
			* foo(f) {
				const read = () => f.$.read(`${tmp}/a.js`, 'utf8');
				const want = yield f.$.read(`${dir}/a.js`, 'utf8');

				t.ok('imba' in fly.plugins, 'attach `imba()` plugin to fly');

				// #1
				yield f.source(`${dir}/*.imba`).imba().target(tmp);
				const str1 = yield read();
				t.ok(str1, 'convert to `.js` file');
				t.equal(str1, want, 'compile imba code to correct javascript');

				// #2
				yield f.source(`${dir}/*.imba`).imba({bare: 1}).target(tmp);
				const str2 = yield read();
				t.false(str2.includes('(function(){\n'), 'via `bare`; compile without top-level func wrapper');

				// #3
				yield f.source(`${dir}/*.imba`).imba({sourceMap: 1}).target(tmp);
				const str3 = yield read();
				t.true(str3.includes(`sourceMappingURL=${map}`), 'via `sourceMap`; append url to external source map');
				t.true(yield f.$.find(`${tmp}/${map}`), 'via `sourceMap`; create an external source map');
				yield f.clear(tmp);

				// #4
				yield f.source(`${dir}/*.imba`).imba({sourceMap: 1, sourceMapInline: 1}).target(tmp);
				const str4 = yield read();
				t.true(str4.includes(`sourceMappingURL=data:application/json`), 'via `sourceMapInline`; append inline source map');
				t.false(yield f.$.find(`${tmp}/${map}`), 'via `sourceMapInline`; do not create an external source map');
				yield f.clear(tmp);
			}
		}
	});

	fly.start('foo');
});
