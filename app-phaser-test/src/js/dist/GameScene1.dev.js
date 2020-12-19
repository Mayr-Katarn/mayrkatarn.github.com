"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene1 = exports.score = void 0;

var _phaser = _interopRequireDefault(require("phaser"));

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

var platforms;
var player;
var stars;
var bombs;
var bullets;
var explosions;
var left;
var right;
var jump;
var fire;
var lastFired = 0;
var side = 'right';
var scoreText;
var gameOver;
var score;
exports.score = score;

var GameScene1 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameScene1, _Phaser$Scene);

  function GameScene1() {
    _classCallCheck(this, GameScene1);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene1).call(this, {
      key: 'GameScene1'
    }));
  }

  _createClass(GameScene1, [{
    key: "preload",
    value: function preload() {
      this.load.image('sky', './src/assets/sky.png');
      this.load.image('ground', './src/assets/platform.png');
      this.load.image('ground2', './src/assets/platform2.png');
      this.load.image('ground3', './src/assets/platform3.png');
      this.load.image('star', './src/assets/star.png');
      this.load.image('bomb', './src/assets/bomb.png');
      this.load.image('bullet', './src/assets/bullet.png');
      this.load.spritesheet('dude', './src/assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
      });
      this.load.spritesheet('explosion', './src/assets/explosion.png', {
        frameWidth: 20,
        frameHeight: 20
      });
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      gameOver = false; // Background

      this.add.image(400, 300, 'sky'); // Platforms

      platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      platforms.create(300, 440, 'ground2');
      platforms.create(80, 250, 'ground');
      platforms.create(720, 330, 'ground');
      platforms.create(400, 220, 'ground3');
      platforms.create(700, 170, 'ground2'); // Player

      player = this.physics.add.sprite(100, 450, 'dude');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(300);
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'turnLeft',
        frames: [{
          key: 'dude',
          frame: 2
        }],
        frameRate: 10
      });
      this.anims.create({
        key: 'turnRight',
        frames: [{
          key: 'dude',
          frame: 7
        }],
        frameRate: 10
      });
      this.anims.create({
        key: 'turn',
        frames: [{
          key: 'dude',
          frame: 4
        }],
        frameRate: 20
      }); // Explosion

      explosions = this.physics.add.group({
        allowGravity: false
      });
      this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explosion', {
          start: 0,
          end: 16
        }),
        frameRate: 10,
        repeat: 0
      }); // Stars

      stars = this.physics.add.group({
        key: 'star',
        repeat: 7,
        setXY: {
          x: 12,
          y: 0,
          stepX: 104
        }
      });
      stars.children.iterate(function (child) {
        child.setBounceY(_phaser["default"].Math.FloatBetween(0.4, 0.8));
      });

      var collectStar = function collectStar(player, star) {
        star.disableBody(true, true);
        exports.score = score = score + 1;
        scoreText.setText('score: ' + score);

        if (stars.countActive(true) === 0) {
          stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
          });
          var x = player.x < 400 ? _phaser["default"].Math.Between(400, 800) : _phaser["default"].Math.Between(0, 400);
          var bomb = bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(_phaser["default"].Math.Between(-200, 200), 20);
        }
      }; // Bombs


      bombs = this.physics.add.group();

      var touchBomb = function touchBomb(player, bomb) {
        var explosion = explosions.create(bomb.x, bomb.y, 'explosion');
        bomb.disableBody(true, true);
        explosion.anims.play('explosion');

        _this.physics.pause();

        player.setTint(0xff0000);
        gameOver = true;
      }; // Bullets


      bullets = this.physics.add.group({
        allowGravity: false
      });

      var hitPlatform = function hitPlatform(bullets, platform) {
        bullets.disableBody(true, true);
      };

      var hitBomb = function hitBomb(bullets, bombs) {
        var explosion = explosions.create(bombs.x, bombs.y, 'explosion');
        explosion.anims.play('explosion');
        bullets.disableBody(true, true);
        bombs.disableBody(true, true);
      }; // Contols


      left = this.input.keyboard.addKey('A');
      right = this.input.keyboard.addKey('D');
      jump = this.input.keyboard.addKey('W');
      fire = this.input.keyboard.addKey('SPACE'); // Score

      exports.score = score = 0;
      scoreText = this.add.text(16, 16, 'score: ' + score, {
        fontSize: '32px',
        fill: '#000'
      }); // Collision

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);
      this.physics.add.collider(bombs, platforms);
      this.physics.add.collider(player, bombs, touchBomb, null, this);
      this.physics.add.collider(bullets, platforms, hitPlatform, null, this);
      this.physics.add.collider(bullets, bombs, hitBomb, null, this);
    }
  }, {
    key: "update",
    value: function update(time) {
      var _this2 = this;

      if (gameOver) {
        player.anims.play('turn');
        setTimeout(function () {
          _this2.scene.start('GameScene0');
        }, 1500);
      }

      if (left.isDown && !gameOver) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        side = 'left';
      } else if (right.isDown && !gameOver) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        side = 'right';
      } else if (side === 'left' && !gameOver) {
        player.setVelocityX(0);
        player.anims.play('turnLeft');
      } else if (side === 'right' && !gameOver) {
        player.setVelocityX(0);
        player.anims.play('turnRight');
      }

      if (jump.isDown && player.body.touching.down) {
        player.setVelocityY(-400);
      }

      var fireBullet = function fireBullet() {
        if (side === 'right') {
          var bullet = bullets.create(player.x + 18, player.y + 13, 'bullet');
          bullet.setVelocityX(400);
        } else if (side === 'left') {
          var _bullet = bullets.create(player.x - 18, player.y + 13, 'bullet');

          _bullet.setVelocityX(-400);
        }

        exports.score = score = score - 1;
        scoreText.setText('score: ' + score);
      };

      if (fire.isDown && time > lastFired && score > 0) {
        fireBullet();
        lastFired = time + 300;
      }
    }
  }]);

  return GameScene1;
}(_phaser["default"].Scene);

exports.GameScene1 = GameScene1;