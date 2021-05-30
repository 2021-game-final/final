import { Scene } from 'phaser'
import { MAP_WIDTH, MAP_HEIGHT, STATUS_BAR_HEIGHT, TANK_BAR_HEIGHT, GRID_SIZE, COLOR_GRASS, COLOR_ROAD, COLOR_ENABLE, COLOR_DISABLE, GRASS_MAP_OBJ_ID, BLANK_MAP_OBJ_ID } from './Constants.js'
import { tankDatas } from './TankData.js'

class GameScene extends Scene {
  preload () {
    tankDatas.forEach((tank) => {
      this.load.image(tank.imageKey, tank.image)
    })
  }

  create ({
    map
  }) {
    this.isPlacingMode = false
    this.createMapBgLayer(map)
    this.createMapBuildingLayer(map)
    this.createMapPlacingLayer(map)
    this.createStatusBar()
    this.createTankBar()
    this.createPreviewTank()
  }

  update () {
    this.updateMapBuildingLayer()
    this.updateMapPlacingLayer()
    this.updateStatusBar()
    this.updateTankBar()
    this.updatePreviewTank()
  }

  createMapLayer (map) {
    const mapClone = JSON.parse(JSON.stringify(map))
    const layer = {
      mapData: mapClone,
      container: this.add.container(0, 0),
      gridMap: mapClone.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          const grid = this.add.rectangle(
            columnIndex * GRID_SIZE,
            rowIndex * GRID_SIZE + STATUS_BAR_HEIGHT,
            GRID_SIZE,
            GRID_SIZE
          )
            .setOrigin(0)
          return grid
        })
      })
    }
    layer.container.add(layer.gridMap.flat())
    return layer
  }

  createMapBgLayer (map) {
    const layer = this.createMapLayer(map)
    layer.mapData.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const color = column === GRASS_MAP_OBJ_ID ? COLOR_GRASS : COLOR_ROAD
        const grid = layer.gridMap[rowIndex][columnIndex]
        grid.setFillStyle(color)
      })
    })
    this.bgLayer = layer
  }

  createMapBuildingLayer (map) {
    const layer = this.createMapLayer(map)
    layer.mapData = layer.mapData.map((row) => {
      return row.map(() => BLANK_MAP_OBJ_ID)
    })
    this.buildingLayer = layer
  }

  updateMapBuildingLayer () {
    // const { mapData, gridMap, container } = this.buildingLayer
  }

  createMapPlacingLayer (map) {
    const layer = this.createMapLayer(map)
    layer.container.setVisible(false)
    layer.gridMap.forEach((row, rowIndex) => {
      row.forEach((grid, columnIndex) => {
        grid
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            if (!(this.bgLayer.mapData[rowIndex][columnIndex] === GRASS_MAP_OBJ_ID && this.buildingLayer.mapData[rowIndex][columnIndex] === BLANK_MAP_OBJ_ID)) return
            this.isPlacingMode = false

            const tankData = this.previewTank.data.tank
            this.statusBar.data.money -= tankData.price
            this.buildingLayer.mapData[rowIndex][columnIndex] = tankData.mapObjId
            const oldGrid = this.buildingLayer.gridMap[rowIndex][columnIndex]
            const newGrid = this.add.image(oldGrid.x, oldGrid.y, tankData.imageKey).setOrigin(0)
            this.buildingLayer.gridMap[rowIndex][columnIndex] = newGrid
            this.buildingLayer.container.replace(oldGrid, newGrid, true)
          })
        grid.setSize(GRID_SIZE - 4)
        grid.setStrokeStyle(4)
        grid.setDisplayOrigin(-2, -2)
      })
    })
    this.placingLayer = layer
  }

  updateMapPlacingLayer () {
    const { mapData: mapBgData } = this.bgLayer
    const { mapData: mapBuildingData } = this.buildingLayer
    const { gridMap, container } = this.placingLayer
    gridMap.forEach((row, rowIndex) => {
      row.forEach((grid, columnIndex) => {
        const color = (mapBgData[rowIndex][columnIndex] === GRASS_MAP_OBJ_ID && mapBuildingData[rowIndex][columnIndex] === BLANK_MAP_OBJ_ID) ? COLOR_ENABLE : COLOR_DISABLE
        grid.setStrokeStyle(4, color)
      })
    })
    container.setVisible(this.isPlacingMode)
  }

  createStatusBar () {
    this.statusBar = {
      data: {
        stage: 1,
        money: 300,
        live: 10
      },
      view: {
        containerEl: document.createElement('div'),
        bodyEl: document.createElement('div'),
        stageEl: document.createElement('div'),
        moneyEl: document.createElement('div'),
        liveEl: document.createElement('div')
      }
    }

    this.statusBar.view.containerEl.id = 'status-bar-container'
    this.statusBar.view.containerEl.style.width = '100%'
    this.statusBar.view.containerEl.style.height = `${STATUS_BAR_HEIGHT}px`

    this.statusBar.view.bodyEl.id = 'status-bar'
    this.statusBar.view.containerEl.appendChild(this.statusBar.view.bodyEl)
    this.statusBar.view.stageEl.innerText = `第 ${this.statusBar.data.stage} 關`
    this.statusBar.view.bodyEl.appendChild(this.statusBar.view.stageEl)
    this.statusBar.view.moneyEl.innerText = `$: ${this.statusBar.data.money}`
    this.statusBar.view.bodyEl.appendChild(this.statusBar.view.moneyEl)
    this.statusBar.view.liveEl.innerText = `❤: ${this.statusBar.data.live}`
    this.statusBar.view.bodyEl.appendChild(this.statusBar.view.liveEl)
    this.add.dom(0, 0, this.statusBar.view.containerEl).setOrigin(0)
  }

  updateStatusBar () {
    this.statusBar.view.stageEl.innerText = `第 ${this.statusBar.data.stage} 關`
    this.statusBar.view.moneyEl.innerText = `$: ${this.statusBar.data.money}`
    this.statusBar.view.liveEl.innerText = `❤: ${this.statusBar.data.live}`
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
                  const tank = tankDatas[i]
                  if (tank.price > this.statusBar.data.money) return
                  this.isPlacingMode = true
                  this.previewTank.data.tank = tank
                })
                .on('pointerover', () => {
                  this.tankIntro.data.tank = tankDatas[i]
                  this.tankIntro.data.visible = true
                })
                .on('pointermove', ({ x, y }) => {
                  this.tankIntro.data.position = { x, y }
                })
                .on('pointerout', () => {
                  this.tankIntro.data.visible = false
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

    this.createTankIntro()
  }

  updateTankBar () {
    this.updateTankIntro()
  }

  createTankIntro () {
    this.tankIntro = {
      view: {
        containerEl: document.createElement('div'),
        bgEl: document.createElement('div'),
        contentEl: document.createElement('div'),
        body: null
      },
      data: {
        visible: false,
        tank: null,
        position: {
          x: 0,
          y: 0
        }
      }
    }
    this.tankIntro.view.containerEl.id = 'tank-intro-container'
    this.tankIntro.view.bgEl.id = 'tank-intro-bg'
    this.tankIntro.view.containerEl.appendChild(this.tankIntro.view.bgEl)
    this.tankIntro.view.contentEl.id = 'tank-intro-content'
    this.tankIntro.view.bgEl.appendChild(this.tankIntro.view.contentEl)
    this.tankIntro.view.body = this.add.dom(0, 0, this.tankIntro.view.containerEl).setOrigin(0, 1)
  }

  updateTankIntro () {
    const tankData = this.tankIntro.data.tank
    const { x, y } = this.tankIntro.data.position
    if (this.tankIntro.data.visible && tankData) {
      this.tankIntro.view.body.setX(x).setY(y)
      this.tankIntro.view.contentEl.innerHTML = `${tankData.name}<br>射擊速度<br>攻擊力<br>特殊功能?緩速<br>價錢: ${tankData.price}`
    }
    this.tankIntro.view.body.setVisible(this.tankIntro.data.visible)
  }

  createPreviewTank () {
    this.previewTank = {
      view: {
        container: this.add.container(0, 0),
        rangeCircle: this.add.ellipse(0, 0, 0, 0, 0xed8c91, 0.3),
        image: this.add.image(0, 0)
      },
      data: {
        position: {
          x: 0,
          y: 0
        },
        tank: null
      }
    }
    this.previewTank.view.container.add([
      this.previewTank.view.rangeCircle,
      this.previewTank.view.image
    ])
    this.input.on('pointermove', ({ x, y }) => {
      this.previewTank.data.position = { x, y }
    })
  }

  updatePreviewTank () {
    if (this.previewTank.data.tank === null) {
      this.previewTank.view.container.setVisible(false)
      return
    }
    this.previewTank.view.image.setTexture(this.previewTank.data.tank.imageKey)
    this.previewTank.view.rangeCircle.setSize(this.previewTank.data.tank.range * 64 * 0.45, this.previewTank.data.tank.range * 64 * 0.45).setOrigin(0.5)
    this.previewTank.view.container.setPosition(this.previewTank.data.position.x, this.previewTank.data.position.y)
    this.previewTank.view.container.setVisible(this.isPlacingMode)
  }
}

export default GameScene
