'use strict';

const imba = require('imba/compiler');

module.exports = function () {
	this.plugin('imba', {}, function * (file, opts) {
		opts = Object.assign({bare: false, sourceMap: false}, opts);

		// update file type
		file.base = file.base.replace('.imba', '.js');

		// compile data
		const out = imba.compile(file.data.toString());

		// set data
		file.data = new Buffer(out);
	});
};
