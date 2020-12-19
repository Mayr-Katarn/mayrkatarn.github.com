import Phaser from 'phaser'
import { GameScene0 } from './js/GameScene0'
import { GameScene1 } from './js/GameScene1'

const config = {
  title: "TestGame",
  width: 800,
  height: 600,
  parent: "game",
  scene: [GameScene0, GameScene1],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}

export class TestGame extends Phaser.Game {
  constructor(config) {
    super(config)
  }
}

window.onload = () => {
  new TestGame(config)
}