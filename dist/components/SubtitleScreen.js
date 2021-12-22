"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./SubtitleScreen.css");

function SubtitleScreen(_ref) {
  var cue = _ref.cue;

  if (cue.length === 0) {
    return null;
  }

  var text = cue[0].text;
  var textList = text.split('\n');
  return /*#__PURE__*/React.createElement("div", {
    className: "subtitle-screen"
  }, textList.map(function (text, index) {
    return /*#__PURE__*/React.createElement("span", {
      key: index,
      className: "subtitle-text"
    }, /*#__PURE__*/React.createElement("span", {
      className: "subtitle-visual-line"
    }, text));
  }));
}

var _default = SubtitleScreen;
exports.default = _default;