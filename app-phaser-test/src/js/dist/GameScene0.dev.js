"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene0 = void 0;

var _phaser = _interopRequireDefault(require("phaser"));

var _GameScene = require("./GameScene1");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var startBtn;
var firstRun = true;
var scoreText;

var GameScene0 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameScene0, _Phaser$Scene);

  function GameScene0() {
    _classCallCheck(this, GameScene0);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene0).call(this, {
      key: 'GameScene0'
    }));
  }

  _createClass(GameScene0, [{
    key: "preload",
    value: function preload() {
      this.load.image('start', './src/assets/startscreen.png');
    }
  }, {
    key: "create",
    value: function create() {
      this.add.image(400, 300, 'start');
      startBtn = this.input.keyboard.addKey('SPACE');

      if (!firstRun) {
        scoreText = this.add.text(400, 40, 'RESULT: ' + _GameScene.score, {
          fontSize: 'bold 48px',
          fill: '#000',
          align: 'center'
        }).setOrigin(0.5);
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (startBtn.isDown) {
        this.scene.start('GameScene1');
        firstRun = false;
      }
    }
  }]);

  return GameScene0;
}(_phaser["default"].Scene);

exports.GameScene0 = GameScene0;