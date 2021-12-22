"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeClassName = exports.formatVideoTime = void 0;

var formatVideoTime = function formatVideoTime(time) {
  var allTimeStr = new Date(time * 1000).toISOString().substr(11, 8);
  var allTime = allTimeStr.split(':');
  var hours = allTime[0];
  var minutes = allTime[1];
  var seconds = allTime[2];
  var resultTime = [];

  if (parseInt(hours) > 0) {
    resultTime.push(parseInt(hours).toString());
  }

  if (parseInt(minutes) < 10 && parseInt(hours) > 0) {
    resultTime.push('0' + parseInt(minutes).toString());
  } else {
    resultTime.push(parseInt(minutes).toString());
  }

  resultTime.push(seconds);
  return resultTime.join(':');
};

exports.formatVideoTime = formatVideoTime;

var makeClassName = function makeClassName(classnames) {
  var array = Object.keys(classnames).filter(function (classname) {
    return classnames[classname];
  });
  return array.join(' ');
};

exports.makeClassName = makeClassName;