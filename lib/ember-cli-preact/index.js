/* jshint node: true */
'use strict';

var react = require('broccoli-react');

module.exports = {
  name: 'ember-cli-preact',

  isDevelopingAddon: function() {
    return true;
  },

  preprocessTree: function(type, tree) {
    if (type === 'js') {
      tree = react(tree, { transform: { es6module: true } } );
    }

    return tree;
  }
};
