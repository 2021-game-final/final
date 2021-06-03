import { Scene } from 'phaser'
import StageUI from './StageUI'
import StageMap from './StageMap'
import tanksData from '../../data/tanks/Index'
import enemiesData from '../../data/enemies/Index'

export default class StageScene extends Scene {
  preload () {
    tanksData.forEach((tank) => {
      this.load.image(tank.imageKey, tank.image)
    })
  }

  create (stageData) {
    this._stage = 0
    this._money = 0
    this._live = 0
    this._previewTankData = null

    this.stageMap = new StageMap()
    this.ui = new StageUI()

    this.stageMap.create(this, stageData.mapData)
    this.ui.create(this, stageData.mapData, tanksData)

    // this.stage 是 setter (像function)
    this.stage = stageData.stage
    this.money = stageData.money
    this.live = stageData.live

    const onTankClickListener = (tankData) => {
      if (this.previewTankData === tankData) {
        this.ui.placingLayer.setVisible(false)
        this.previewTankData = null
        return
      }
      if (this.money < tankData.price) return
      this.previewTankData = tankData
      this.ui.placingLayer.updatePlacingGridMap(this.stageMap.placingMatrix)
      this.ui.placingLayer.setVisible(true)
    }
    this.ui.tanksBar.onTankClick(onTankClickListener)

    const onPlacingGridClickListener = ({ rowIndex, columnIndex }) => {
      if (!this.stageMap.canPlaceAt(rowIndex, columnIndex)) return
      this.money -= this.previewTankData.price
      this.stageMap.addTank(this.previewTankData, rowIndex, columnIndex)
      this.ui.placingLayer.setVisible(false)
      this.previewTankData = null
    }
    this.ui.placingLayer.onPlacingGridClick(onPlacingGridClickListener)

    // TODO 玩家按「START」即開放敵人進入地圖 (不能再新增砲台)
    const onStartClickListener = () => {
      this.stageMap.addEnemies(
        enemiesData[this.stage - 1],
        stageData.mapData.start[0],
        stageData.mapData.start[1],
        stageData.enemyAmount,
        stageData.enemyPeriod
      )
    }
    this.ui.tanksBar.onStartClick(onStartClickListener)
  }

  update (time, delta) {
    this.stageMap.update(time, delta)
  }

  get stage () {
    return this._stage
  }

  set stage (value) {
    this._stage = value
    this.ui.statusBar.updateStageText(this._stage)
  }

  get money () {
    return this._money
  }

  set money (value) {
    this._money = value
    this.ui.statusBar.updateMoneyText(this._money)
  }

  get live () {
    return this._live
  }

  set live (value) {
    this._live = value
    this.ui.statusBar.updateLiveText(this._live)
  }

  get previewTankData () {
    return this._previewTankData
  }

  set previewTankData (value) {
    this._previewTankData = value
    if (value === null) return
    this.ui.placingLayer.updatePreviewTank(this._previewTankData)
  }
}
