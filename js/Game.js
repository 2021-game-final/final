import WelcomeScene from './WelcomeScene.js'
import StageScene from "./StageScene.js"

(function () {
  const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 640,
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