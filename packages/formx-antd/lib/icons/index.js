"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadOutlined = exports.InboxOutlined = exports.CheckOutlined = exports.MessageOutlined = exports.CloseOutlined = exports.EditOutlined = exports.MenuOutlined = exports.PlusOutlined = exports.UpOutlined = exports.DownOutlined = exports.DeleteOutlined = exports.LoadingOutlined = exports.ExclamationCircleOutlined = exports.CheckCircleOutlined = exports.CloseCircleOutlined = exports.QuestionCircleOutlined = void 0;

var react_1 = __importDefault(require("react"));

var antd_1 = require("antd");

var QuestionCircleOutlined = function QuestionCircleOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "question-circle"
  }));
};

exports.QuestionCircleOutlined = QuestionCircleOutlined;

var CloseCircleOutlined = function CloseCircleOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "close-circle"
  }));
};

exports.CloseCircleOutlined = CloseCircleOutlined;

var CheckCircleOutlined = function CheckCircleOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "check-circle"
  }));
};

exports.CheckCircleOutlined = CheckCircleOutlined;

var ExclamationCircleOutlined = function ExclamationCircleOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "exclamation-circle"
  }));
};

exports.ExclamationCircleOutlined = ExclamationCircleOutlined;

var LoadingOutlined = function LoadingOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "loading"
  }));
};

exports.LoadingOutlined = LoadingOutlined;

var DeleteOutlined = function DeleteOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "delete"
  }));
};

exports.DeleteOutlined = DeleteOutlined;

var DownOutlined = function DownOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "down"
  }));
};

exports.DownOutlined = DownOutlined;

var UpOutlined = function UpOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "up"
  }));
};

exports.UpOutlined = UpOutlined;

var PlusOutlined = function PlusOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "plus"
  }));
};

exports.PlusOutlined = PlusOutlined;
exports.PlusOutlined.type = "plus";

var MenuOutlined = function MenuOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "menu"
  }));
};

exports.MenuOutlined = MenuOutlined;

var EditOutlined = function EditOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "edit"
  }));
};

exports.EditOutlined = EditOutlined;

var CloseOutlined = function CloseOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "close"
  }));
};

exports.CloseOutlined = CloseOutlined;

var MessageOutlined = function MessageOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "message"
  }));
};

exports.MessageOutlined = MessageOutlined;

var CheckOutlined = function CheckOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "check"
  }));
};

exports.CheckOutlined = CheckOutlined;

var InboxOutlined = function InboxOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "check"
  }));
};

exports.InboxOutlined = InboxOutlined;

var UploadOutlined = function UploadOutlined(props) {
  return react_1.default.createElement(antd_1.Icon, __assign({}, props, {
    type: "check"
  }));
};

exports.UploadOutlined = UploadOutlined;