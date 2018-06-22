/*!
 * helpers
 */

"use strict";

/*!
 * Module dependencies
 */
var contentstack = require('contentstack-express');

  module.exports = function Helpers() {

  var options = Helpers.options;

  Helpers.templateExtends = function(engine) {};

  Helpers.serverExtends = function(app) {
    app.locals.helpers = {
        checkTarget: function(new_tab) {
            return new_tab ? 'target="_blank"' : "";
        },
        MathCeil: function(num) {
            return Math.ceil(num)
        },

        truncateString: function(data, length, ellipsis) {
            return data.substring(0, length) + ((data.length >= length) ? ellipsis : "");
        },
    } // end helpers 

    app.locals.appendBlogUrl = function(url) {
      return '/blog' + url
    },
    app.locals.increment = function(cnt) {
      return ++cnt;
    },
    app.locals.SeoUrl = function(url) {
      return app.locals.host + url
    },
    app.locals.AssetUrl = function(asset) {
      if (asset && asset._internal_url) {
          return app.locals.host + asset._internal_url;
      }
    },
    app.locals.Astrick = function(value) {
        var str = "*";
        return str.repeat(value);
    }
  };

  Helpers.beforePublish = function(data, next) {
      next();
  };

  Helpers.beforeUnpublish = function(data, next) {
    next();
  };
};