"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPortalRoot = exports.createPortalProvider = void 0;

var react_1 = __importStar(require("react"));

var react_dom_1 = __importStar(require("react-dom"));

var reactive_1 = require("@formily/reactive");

var react_2 = require("@formily/react");

var PortalMap = (0, reactive_1.observable)(new Map());

var createPortalProvider = function createPortalProvider(id) {
  var Portal = function Portal(props) {
    if (props.id && !PortalMap.has(props.id)) {
      PortalMap.set(props.id, null);
    }

    return react_1.default.createElement(react_1.Fragment, null, props.children, react_1.default.createElement(react_2.Observer, null, function () {
      if (!props.id) return null;
      var portal = PortalMap.get(props.id);
      if (portal) return (0, react_dom_1.createPortal)(portal, document.body);
      return null;
    }));
  };

  Portal.defaultProps = {
    id: id
  };
  return Portal;
};

exports.createPortalProvider = createPortalProvider;

function createPortalRoot(host, id) {
  function render(renderer) {
    if (PortalMap.has(id)) {
      PortalMap.set(id, renderer === null || renderer === void 0 ? void 0 : renderer());
    } else if (host) {
      react_dom_1.default.render(react_1.default.createElement(react_1.Fragment, null, renderer === null || renderer === void 0 ? void 0 : renderer()), host);
    }
  }

  function unmount() {
    var _a;

    if (PortalMap.has(id)) {
      PortalMap.set(id, null);
    } else if (host) {
      react_dom_1.default.unmountComponentAtNode(host);
      (_a = host.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(host);
    }
  }

  return {
    render: render,
    unmount: unmount
  };
}

exports.createPortalRoot = createPortalRoot;