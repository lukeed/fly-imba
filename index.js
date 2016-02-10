const imba = require('imba')

module.exports = function () {
  this.filter('imba', function() {
    return imba.compile()
  });
};
