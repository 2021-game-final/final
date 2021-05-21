import { Scene } from 'phaser'
import { MAP_WIDTH, MAP_HEIGHT, STATUS_BAR_HEIGHT, TANK_BAR_HEIGHT, GRID_SIZE, GRASS, ROAD } from './Constants.js'
import { tankDatas } from './TankData.js'

class GameScene extends Scene {
  preload () {
    tankDatas.forEach((tank) => {
      this.load.image(tank.imageKey, tank.image)
      console.log(tank)
    })
  }

  create ({
    map
  }) {
    map.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const color = column === 0 ? GRASS : ROAD
        this.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE + 64,
          GRID_SIZE,
          GRID_SIZE,
          color
        ).setOrigin(0)
      })
    })

    this.createStatusBar()
    this.createTankBar()
    setInterval(() => {
      this.money -= 5
    }, 1000)
  }

  // TODO: 狀態列的更新
  createStatusBar () {
    this.statusBarContainerEl = document.createElement('div')
    this.statusBarContainerEl.id = 'status-bar-container'
    this.statusBarContainerEl.style.width = '100%'
    this.statusBarContainerEl.style.height = `${STATUS_BAR_HEIGHT}px`

    this.statusBarEl = document.createElement('div')
    this.statusBarEl.id = 'status-bar'
    this.statusBarContainerEl.appendChild(this.statusBarEl)
    this.stage = 1
    this.stageEl = document.createElement('div')
    this.stageEl.innerText = `第 ${this.stage} 關`
    this.statusBarEl.appendChild(this.stageEl)
    this.money = 300
    this.moneyEl = document.createElement('div')
    this.moneyEl.innerText = '$: 300'
    this.statusBarEl.appendChild(this.moneyEl)
    this.live = 10
    this.liveEl = document.createElement('div')
    this.liveEl.innerText = '❤: 10'
    this.statusBarEl.appendChild(this.liveEl)
    this.add.dom(0, 0, this.statusBarContainerEl).setOrigin(0)
  }

  // 砲台列表
  createTankBar () {
    const kuangKuangs = []
    for (let i = 0; i < 12; i++) {
      const x = 40 + i * 80
      const kuangKuang = this.add.container(x, 16, [
        this.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0x424242).setOrigin(0),
        ...i < tankDatas.length
          ? [
              this.add.image(0, 0, tankDatas[i].imageKey)
                .setInteractive({ useHandCursor: true })
                .on('pointerup', () => {
                  console.log('hi')
                })
                .on('pointerover', () => {
                  this.tankIntro.setVisible(true)
                  this.tankIntroContentEl.innerHTML = `${tankDatas[i].name}<br>射擊速度<br>攻擊力<br>特殊功能?緩速<br>價錢`
                })
                .on('pointermove', ({ x, y }) => {
                  this.tankIntro.setX(x).setY(y)
                })
                .on('pointerout', () => {
                  this.tankIntro.setVisible(false)
                })
                .setOrigin(0)
            ]
          : []
      ])
      kuangKuangs.push(kuangKuang)
    }
    this.add.container(0, STATUS_BAR_HEIGHT + MAP_HEIGHT, [
      this.add.rectangle(0, 0, MAP_WIDTH, TANK_BAR_HEIGHT, 0x5a5a5a).setOrigin(0),
      ...kuangKuangs
    ])

    this.tankIntroContainerEl = document.createElement('div')
    this.tankIntroContainerEl.id = 'tank-intro-container'
    this.tankIntroBgEl = document.createElement('div')
    this.tankIntroBgEl.id = 'tank-intro-bg'
    this.tankIntroContainerEl.appendChild(this.tankIntroBgEl)
    this.tankIntroContentEl = document.createElement('div')
    this.tankIntroContentEl.id = 'tank-intro-content'
    this.tankIntroBgEl.appendChild(this.tankIntroContentEl)
    this.tankIntro = this.add.dom(0, 0, this.tankIntroContainerEl).setOrigin(0, 1)
  }

  update () {
    this.moneyEl.innerText = `$: ${this.money}`
  }
}

export default GameScene
