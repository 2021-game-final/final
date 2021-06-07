import { Game, AUTO } from 'phaser'
import WelcomeScene from './scenes/welcome/WelcomeScene'
import StageScene from './scenes/stage/StageScene'
import LoseScene from './scenes/stage/LoseScene'
import WinScene from './scenes/stage/WinScene'
import { MAP_WIDTH, MAP_HEIGHT, STATUS_BAR_HEIGHT, TANK_BAR_HEIGHT } from './Constants.js'

(function () {
  const config = {
    parent: 'game',
    dom: {
      createContainer: true
    },
    type: AUTO,
    width: MAP_WIDTH,
    height: MAP_HEIGHT + STATUS_BAR_HEIGHT + TANK_BAR_HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
  }
  const game = new Game(config)

  game.scene.add('welcomeScene', new WelcomeScene())
  game.scene.add('stageScene', new StageScene())
  game.scene.add('loseScene', new LoseScene())
  game.scene.add('winScene', new WinScene())

  game.scene.start('welcomeScene', true)
})()
