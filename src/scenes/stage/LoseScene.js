import { Scene } from 'phaser'

class LoseScene extends Scene {
  create () {
    const { width: w, height: h } = this.game.config
    this.add.rectangle(w / 2, h / 2, w, h, 0x3e3e3e)

    this.add.text(w / 2, h / 2 - 100, '你輸了！ : (', {
      fontFamily: '"Noto Sans TC", sans-serif',
      fontSize: '72px'
    }).setOrigin(0.5)

    this.add.container(w / 2, h / 2, [
      this.add.rectangle(0, 0, 100, 50, 0x202020)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
          this.scene.start('welcomeScene')
        }),
      this.add.text(0, 0, '回到主畫面').setOrigin(0.5)
    ])
  }
}

export default LoseScene
