import Phaser from 'phaser'

let platforms
let player
let stars
let bombs
let bullets
let explosions
let left
let right
let jump
let fire
let lastFired = 0
let side = 'right'
let scoreText
let gameOver
export let score

export class GameScene1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene1'
    })
  }

  preload() {
    this.load.image('sky', './src/assets/sky.png')
    this.load.image('ground', './src/assets/platform.png')
    this.load.image('ground2', './src/assets/platform2.png')
    this.load.image('ground3', './src/assets/platform3.png')
    this.load.image('star', './src/assets/star.png')
    this.load.image('bomb', './src/assets/bomb.png')
    this.load.image('bullet', './src/assets/bullet.png')
    this.load.spritesheet('dude', './src/assets/dude.png', {frameWidth: 32, frameHeight: 48})
    this.load.spritesheet('explosion', './src/assets/explosion.png', {frameWidth: 20, frameHeight: 20})
  }
  
  create() {
    gameOver = false

    // Background
    this.add.image(400, 300, 'sky')

    // Platforms
    platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    platforms.create(300, 440, 'ground2')
    platforms.create(80, 250, 'ground')
    platforms.create(720, 330, 'ground')
    platforms.create(400, 220, 'ground3')
    platforms.create(700, 170, 'ground2')

    // Player
    player = this.physics.add.sprite(100, 450, 'dude')
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player.body.setGravityY(300)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turnLeft',
      frames: [{ key: 'dude', frame: 2 }],
      frameRate: 10
    })

    this.anims.create({
      key: 'turnRight',
      frames: [{ key: 'dude', frame: 7 }],
      frameRate: 10
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    // Explosion
    explosions = this.physics.add.group({ allowGravity: false })
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: 0
    })
    
    // Stars
    stars = this.physics.add.group({
      key: 'star',
      repeat: 7,
      setXY: { x: 12, y: 0, stepX: 104}
    })

    stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    const collectStar = (player, star) => {
      star.disableBody(true, true)
      score += 1
      scoreText.setText('score: ' + score)

      if (stars.countActive(true) === 0) {
        stars.children.iterate(child => {
          child.enableBody(true, child.x, 0, true, true)
        })
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
        let bomb = bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
      }
    }

    // Bombs
    bombs = this.physics.add.group()

    const touchBomb = (player, bomb) => {
      let explosion = explosions.create(bomb.x, bomb.y, 'explosion')
      bomb.disableBody(true, true)
      explosion.anims.play('explosion')
      this.physics.pause()
      player.setTint(0xff0000)
      gameOver = true
    }

    // Bullets
    bullets = this.physics.add.group({ allowGravity: false })

    const hitPlatform = (bullets, platform) => {
      bullets.disableBody(true, true)
    }

    const hitBomb = (bullets, bombs) => {
      let explosion = explosions.create(bombs.x, bombs.y, 'explosion')
      explosion.anims.play('explosion')
      bullets.disableBody(true, true)
      bombs.disableBody(true, true)
    }

    // Contols
    left = this.input.keyboard.addKey('A')
    right = this.input.keyboard.addKey('D')
    jump = this.input.keyboard.addKey('W')
    fire = this.input.keyboard.addKey('SPACE')

    // Score
    score = 0
    scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' })

    // Collision
    this.physics.add.collider(player, platforms)
    this.physics.add.collider(stars, platforms)
    this.physics.add.overlap(player, stars, collectStar, null, this)
    this.physics.add.collider(bombs, platforms)
    this.physics.add.collider(player, bombs, touchBomb, null, this)
    this.physics.add.collider(bullets, platforms, hitPlatform, null, this)
    this.physics.add.collider(bullets, bombs, hitBomb, null, this)
  }

  update(time) {
    if (gameOver) {
      player.anims.play('turn')
      setTimeout(() => {
        this.scene.start('GameScene0')
      }, 1500)
    }

    if (left.isDown && !gameOver) {
      player.setVelocityX(-160)
      player.anims.play('left', true)
      side = 'left'
    } else if (right.isDown && !gameOver) {
      player.setVelocityX(160)
      player.anims.play('right', true)
      side = 'right'
    } else if (side === 'left' && !gameOver) {
      player.setVelocityX(0)
      player.anims.play('turnLeft')
    } else if (side === 'right' && !gameOver) {
      player.setVelocityX(0)
      player.anims.play('turnRight')
    }

    if (jump.isDown && player.body.touching.down) {
      player.setVelocityY(-400)
    }
    
    const fireBullet = () => {
      if (side === 'right') {
        let bullet = bullets.create(player.x + 18, player.y + 13, 'bullet')
        bullet.setVelocityX(400)
      } else if (side === 'left') {
        let bullet = bullets.create(player.x - 18, player.y + 13, 'bullet')
        bullet.setVelocityX(-400)
      }

      score -= 1
      scoreText.setText('score: ' + score)
    }

    if (fire.isDown && time > lastFired && score > 0) {
      fireBullet()
      lastFired = time + 300
    }
  }
}
