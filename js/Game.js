import WelcomeScene from './WelcomeScene.js'
import stage1 from './stages/Stage1.js'
import stage2 from './stages/Stage2.js'
import stage3 from './stages/Stage3.js'

(function () {
  const welcomeScene = new WelcomeScene()
  const stages = [
    stage1,
    stage2,
    stage3
  ]

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
  stages.forEach((scene, i) => {
    game.scene.add(`stage-${i}`, scene);
  })  

  game.scene.start('welcomeScene');
})()