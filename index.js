'use strict';

const {format} = require('path');
const imba = require('imba/compiler');

module.exports = {
	name: 'imba',
	* func(file, opts) {
		opts = Object.assign({bare: false, sourceMap: false}, opts);

		// modify options for source mapping
		if (opts.sourceMap) {
			opts.sourcePath = format(file);
			opts.targetPath = '.'; // `path.dirname()` throws in 6.x
		}

		// update file type
		file.base = file.base.replace('.imba', '.js');

		// compile data
		const out = imba.compile(file.data.toString(), opts);

		// if had sourcemap content
		if (out.sourcemap) {
			let add;
			const map = new Buffer(JSON.stringify(out.sourcemap));

			// if was `inline`
			if (opts.sourceMapInline) {
				add = `data:application/json;base64,${map.toString('base64')}`;
			} else {
				add = file.base.concat('.map');
				// add to `fly._.files`
				this._.files.push({
					base: add,
					dir: file.dir,
					data: map
				});
			}

			// add sourcemap reference to output
			out.js += `\n//# sourceMappingURL=${add}`;
		}

		// set data
		file.data = new Buffer(out.js);
	}
};
