import WelcomeScene from './WelcomeScene.js'
import GameScene from './GameScene.js'

(function () {
  const welcomeScene = new WelcomeScene()
  const gameScene = new GameScene()

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

  game.scene.add('welcomeScene', welcomeScene);
  game.scene.add('gameScene', gameScene);

  game.scene.start('welcomeScene');
})()