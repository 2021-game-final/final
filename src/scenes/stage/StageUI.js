import { MAP_WIDTH, MAP_HEIGHT, STATUS_BAR_HEIGHT, TANK_BAR_HEIGHT, GRID_SIZE, COLOR_ENABLE, COLOR_DISABLE } from '../../Constants'

export default class StageUI {
  /**
   *
   *
   * @param {import('phaser').Scene} scene
   * @param {import('../../data/stages/Index').MapData} mapData
   * @param {import('../../data/tanks/Index').TankData[]} tanksData
   * @memberof StageUI
   */
  create (scene, mapData, tanksData) {
    this.scene = scene
    this.statusBar = this._createStatusBar()
    this.tanksBar = this._createTanksBar(tanksData)
    this.placingLayer = this._createPlacingLayer(mapData)
  }

  _createStatusBar () {
    const containerEl = document.createElement('div')
    const bodyEl = document.createElement('div')
    const stageEl = document.createElement('div')
    const moneyEl = document.createElement('div')
    const liveEl = document.createElement('div')

    containerEl.id = 'status-bar-container'
    containerEl.style.width = '100%'
    containerEl.style.height = `${STATUS_BAR_HEIGHT}px`
    bodyEl.id = 'status-bar'
    containerEl.appendChild(bodyEl)
    bodyEl.appendChild(stageEl)
    bodyEl.appendChild(moneyEl)
    bodyEl.appendChild(liveEl)
    this.scene.add.dom(0, 0, containerEl).setOrigin(0)
    return {
      updateStageText (stage) {
        stageEl.innerText = `第 ${stage} 關`
      },
      updateMoneyText (money) {
        moneyEl.innerText = `$: ${money}`
      },
      updateLiveText (live) {
        liveEl.innerText = `❤: ${live}`
      }
    }
  }

  /**
   *
   *
   * @param {import('../../data/tanks/Index').TankData[]} tanksData
   * @memberof StageUI
   */
  _createTanksBar (tanksData) {
    const tankIntro = this._createTankIntro()
    /**
     * @callback OnTankClickListener
     * @param {import('../../data/tanks/Index').TankData} tankData
     */
    /**
     * @type {OnTankClickListener[]}
     */
    const onTankClickListeners = []
    /**
     * @callback OnStartClickListener
     */
    /**
     * @type {OnStartClickListener[]}
     */
    const onStartClickListeners = []
    const kuangKuangs = []
    for (let i = 0; i < 10; i++) {
      const x = 40 + i * 80
      const kuangKuang = this.scene.add.container(x, 16, [
        this.scene.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0x424242).setOrigin(0),
        ...i < tanksData.length
          ? [
              this.scene.add.image(0, 0, tanksData[i].imageKey)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => {
                  tankIntro.updateTankIntroText(tanksData[i])
                  tankIntro.setVisible(true)
                })
                .on('pointerout', () => {
                  tankIntro.setVisible(false)
                })
                .on('pointermove', (pointer) => {
                  tankIntro.updateTankIntroPosition(pointer)
                })
                .on('pointerup', () => {
                  onTankClickListeners.forEach((listener) => {
                    listener(tanksData[i])
                  })
                })
                .setOrigin(0)
            ]
          : []
      ])
      kuangKuangs.push(kuangKuang)
    }

    const startButton = this.scene.add.container(840, 16, [
      this.scene.add.rectangle(0, 0, GRID_SIZE * 2 + 40, GRID_SIZE, 0xe34d4d)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
          onStartClickListeners.forEach((listener) => {
            listener()
          })
        }),
      this.scene.add.text((GRID_SIZE * 2 + 40) / 2, GRID_SIZE / 2, 'START', {
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: '30px'
      }).setOrigin(0.5)
    ])

    this.scene.add.container(0, STATUS_BAR_HEIGHT + MAP_HEIGHT, [
      this.scene.add.rectangle(0, 0, MAP_WIDTH, TANK_BAR_HEIGHT, 0x5a5a5a).setOrigin(0),
      ...kuangKuangs,
      startButton
    ])

    return {
      /**
       *
       * @param {OnTankClickListener} listener
       */
      onTankClick (listener) {
        onTankClickListeners.push(listener)
      },
      /**
       *
       * @param {OnStartClickListener} listener
       */
      onStartClick (listener) {
        onStartClickListeners.push(listener)
      }
    }
  }

  _createTankIntro () {
    const containerEl = document.createElement('div')
    const bgEl = document.createElement('div')
    const contentEl = document.createElement('div')

    containerEl.id = 'tank-intro-container'
    bgEl.id = 'tank-intro-bg'
    containerEl.appendChild(bgEl)
    contentEl.id = 'tank-intro-content'
    bgEl.appendChild(contentEl)
    const body = this.scene.add.dom(0, 0, containerEl).setOrigin(0, 1)
    body.setVisible(false)

    return {
      setVisible (bool) {
        body.setVisible(bool)
      },
      /**
       *
       *
       * @param {import('../../data/tanks/Index').TankData} tankData
       */
      updateTankIntroText (tankData) {
        contentEl.innerHTML = `${tankData.name}<br>射擊速度：<br>攻擊力：<br>特殊功能：緩速<br>價錢：${tankData.price}`
      },
      updateTankIntroPosition ({ x, y }) {
        body.setPosition(x, y)
      }
    }
  }

  /**
   *
   * @param {import('../../data/stages/Index').MapData} mapData
   * @memberof StageUI
   */
  _createPlacingLayer (mapData) {
    /**
     * @callback OnPlacingGridClickListener
     * @param {{rowIndex: number; columnIndex: number}} gridPosition
     */
    /**
     * @type {OnPlacingGridClickListener[]}
     */
    const onPlacingGridClickListeners = []
    const body = this.scene.add.container(0, STATUS_BAR_HEIGHT)
    const gridMap = mapData.matrix.map((row, rowIndex) => {
      return row.map((column, columnIndex) => {
        const grid = this.scene.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE
        )
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            onPlacingGridClickListeners.forEach((listener) => {
              listener({ rowIndex, columnIndex })
            })
          })
          .setOrigin(0)
          .setSize(GRID_SIZE - 4)
          .setStrokeStyle(4)
          .setDisplayOrigin(-2, -2)
        return grid
      })
    })
    body.add(gridMap.flat())
    body.setVisible(false)

    const previewTank = this._createPreviewTank()

    return {
      setVisible (bool) {
        body.setVisible(bool)
        previewTank.setVisible(bool)
      },
      updatePreviewTank: previewTank.updatePreviewTank,
      /**
       *
       * @param {boolean[][]} placingMatrix
       */
      updatePlacingGridMap (placingMatrix) {
        gridMap.forEach((row, rowIndex) => {
          row.forEach((grid, columnIndex) => {
            const color = placingMatrix[rowIndex][columnIndex] ? COLOR_ENABLE : COLOR_DISABLE
            grid.setStrokeStyle(4, color)
          })
        })
      },
      /**
       *
       * @param {OnPlacingGridClickListener} listener
       */
      onPlacingGridClick (listener) {
        onPlacingGridClickListeners.push(listener)
      }
    }
  }

  _createPreviewTank () {
    const body = this.scene.add.container(0, 0)
    const rangeCircle = this.scene.add.ellipse(0, 0, 0, 0, 0xed8c91, 0.3)
    const image = this.scene.add.image(0, 0)
    body.add([rangeCircle, image])
    body.setVisible(false)
    this.scene.input.on('pointermove', ({ x, y }) => {
      body.setPosition(x, y)
    })

    return {
      setVisible (bool) {
        body.setVisible(bool)
      },
      /**
       * @param {import('../../data/tanks/Index').TankData} tankData
       */
      updatePreviewTank (tankData) {
        image.setTexture(tankData.imageKey)
        rangeCircle.setSize(tankData.range * 0.5 * GRID_SIZE, tankData.range * 0.5 * GRID_SIZE).setOrigin(0.5)
      }
    }
  }
}
