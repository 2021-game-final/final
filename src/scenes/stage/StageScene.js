import { Scene } from 'phaser'
import StageUI from './StageUI'
import StageMap from './StageMap'
import tanksData from '../../data/tanks/Index'
import enemiesData from '../../data/enemies/Index'
import stagesData from '../../data/stages/Index'

export default class StageScene extends Scene {
  preload () {
    tanksData.forEach((tank) => {
      this.load.image(tank.imageKey, tank.image)
    })
  }

  /**
   *
   *
   * @param {import('../../data/stages/Index').StageData} stageData
   * @memberof StageScene
   */
  create (stageData) {
    // 放置模式：placing
    // 戰鬥模式：battling
    // 遊戲失敗：gameLoser
    // 遊戲成功：gameWinner
    this._status = 'placing'

    this._stage = 1
    this._money = 1
    this._live = 1
    this._previewTankData = null
    this.stageData = stageData

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

    // TODO 玩家按「START」切換 status: battling
    // 即開放敵人進入地圖 (不能再新增砲台)
    const onStartClickListener = () => {
      this.status = 'battling'
    }

    this.ui.tanksBar.onStartClick(onStartClickListener)
  }

  update (time, delta) {
    this.stageMap.update(time, delta)
  }

  get status () {
    return this._status
  }

  set status (value) {
    this._status = value
    if (value === 'placing') {
      // 砲台可以放
      this.ui.unlock()
    } else if (value === 'battling') {
      // 敵人開始進地圖
      this.stageMap.addEnemies(
        enemiesData[this.stage - 1],
        this.stageData.mapData.start[0],
        this.stageData.mapData.start[1],
        this.stageData.enemyAmount,
        this.stageData.enemyPeriod
      )
      // 砲台跟START都不能按
      this.ui.lock()
    } else if (value === 'gameLoser') {
      this.scene.start('loseScene')
      console.log('you are loser')
    } else if (value === 'gameWinner') {
      if (stagesData.length === this.stage) {
        this.scene.start('winScene')
      } else {
        const nextStageData = stagesData[this.stage]
        this.scene.start('stageScene', {
          ...nextStageData,
          money: nextStageData.money + this.money
        })
      }
    }
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
    if (this.live <= 0) {
      return
    }
    this._live = value
    this.ui.statusBar.updateLiveText(this._live)
    if (value <= 0) {
      this.status = 'gameLoser'
    }
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
