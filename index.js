const imba = require('imba/compiler')

module.exports = function () {
  this.filter('imba', function(data) {
    return {code: imba.compile(data.toString()), ext: '.js'}
  });
};
