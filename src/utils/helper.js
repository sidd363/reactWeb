(function () {
  var _ = require('lodash');
  var requestlib = require('./../../controllers/request.js');
  var moment = require('moment');

  module.exports = {
    removeEmpty: function(obj) {
      Object.keys(obj).forEach(function(key) {
        (obj[key] && typeof obj[key] === 'object') ||
        (obj[key] === '' || obj[key] === null) && delete obj[key]
      });
      return obj;
    },
    nthOccurrence: function (string, char, nth) {
      var first_index = string.indexOf(char);
      var length_up_to_first_index = first_index + 1;

      if (nth == 1) {
        return first_index;
      } else {
        var string_after_first_occurrence = string.slice(length_up_to_first_index);
        var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);

        if (next_occurrence === -1) {
          return -1;
        } else {
          return length_up_to_first_index + next_occurrence;
        }
      }
    },
    isLoggedIn: function () {
      var isLoggedIn = false;
      if (typeof (Storage) !== "undefined" && localStorage.getItem("shtoken")) {
        isLoggedIn = true;
      }
      return isLoggedIn;
    },
    fullTextSearch: function (data, query, objKey) {
      const results = _.filter(data, function (item) {
        return item.objKey.toLowerCase() === query.toLowerCase();
      });
      return results;
    },
    getAutoCompleteData: function () {
      var url = 'https://s3.ap-south-1.amazonaws.com/shrofile-imageassets/location.json';
      var data = [];
      requestlib.get(url, function (response) {
        data = response;
      });
      return data;
    },

    getCurrentTimeDifference: function (input, format) {
      var now = moment();
      var diff = now.diff(input, format.toString());
      return diff === 0 ? "Today" : diff;
    },

    checkNested: function (obj /*, level1, level2, ... levelN*/ ) {
      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
          return false;
        }
        obj = obj[args[i]];
      }
      return true;
    },

    getParameterByName: function (name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  };
})();
