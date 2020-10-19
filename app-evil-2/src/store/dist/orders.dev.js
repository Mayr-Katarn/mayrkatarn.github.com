"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  state: {
    oreders: []
  },
  matations: {
    createOrder: function createOrder(state, payload) {
      state.oreders.push(payload);
    }
  },
  actions: {
    createOrder: function createOrder() {
      return regeneratorRuntime.async(function createOrder$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                setTimeout(function () {
                  resolve();
                  console.log(reject);
                }, 3000);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  getters: {}
};
exports["default"] = _default;