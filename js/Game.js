import WelcomeScene from './WelcomeScene.js'
import StageScene from "./StageScene.js"
import {STATUS_BAR_HEIGHT} from "./Constants.js"

(function () {
  const config = {
    parent: "game",
    dom: {
        createContainer: true
    },
    type: Phaser.AUTO,
    width: 1024,
    height: 640 + STATUS_BAR_HEIGHT,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };
  const game = new Phaser.Game(config);

  game.scene.add('welcomeScene', new WelcomeScene());
  game.scene.add('stageScene', new StageScene());
  

  game.scene.start('welcomeScene');
})()