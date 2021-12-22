"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Button.css");

function Button(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("button", {
    className: className,
    onClick: onClick
  }, children);
}

var _default = Button;
exports.default = _default;