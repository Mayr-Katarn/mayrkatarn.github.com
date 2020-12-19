import Phaser from 'phaser'
import { score } from './GameScene1'

let startBtn
let firstRun = true
let scoreText

export class GameScene0 extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene0'
    })
  }

  preload() {
    this.load.image('start', './src/assets/startscreen.png')
  }

  create() {
    this.add.image(400, 300, 'start')

    startBtn = this.input.keyboard.addKey('SPACE')

    if (!firstRun) {
      scoreText = this.add.text(400, 40, 'RESULT: ' + score, { fontSize: 'bold 48px', fill: '#000', align: 'center' }).setOrigin(0.5)
    }
  }

  update() {
    if (startBtn.isDown) {
      this.scene.start('GameScene1')
      firstRun = false
    }
  }
}