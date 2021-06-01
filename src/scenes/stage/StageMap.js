import { STATUS_BAR_HEIGHT, GRID_SIZE, COLOR_ROAD, COLOR_GRASS, ROAD, GRASS } from '../../Constants'

export default class StageMap {
  /**
   *
   *
   * @param {import('phaser').Scene} scene
   * @param {import('../../data/stages/Index').MapData} mapData
   * @memberof StageMap
   */
  create (scene, mapData) {
    this.scene = scene
    this.placingMatrix = mapData.matrix.map((row, rowIndex) => {
      return row.map((column, columnIndex) => {
        return column === GRASS
      })
    })
    this.tanks = this.scene.add.group()

    this.mainContainer = this.scene.add.container(0, STATUS_BAR_HEIGHT)
    this._createBackground(mapData)
  }

  /**
   *
   *
   * @param {import('../../data/stages/Index').MapData} mapData
   * @memberof StageMap
   */
  _createBackground (mapData) {
    const container = this.scene.add.container(0, 0)
    const gridMap = mapData.matrix.map((row, rowIndex) => {
      return row.map((column, columnIndex) => {
        const colorsMap = {
          [GRASS]: COLOR_GRASS,
          [ROAD]: COLOR_ROAD
        }
        const grid = this.scene.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE,
          colorsMap[column]
        )
          .setOrigin(0)
        return grid
      })
    })
    container.add(gridMap.flat())
    this.mainContainer.add(container)
  }

  /**
   *
   * @param {import('../../data/tanks/Index').TankData} tankData
   * @param {number} rowIndex
   * @param {number} columnIndex
   */
  addTank (tankData, rowIndex, columnIndex) {
    const x = columnIndex * GRID_SIZE
    const y = rowIndex * GRID_SIZE
    const tank = this.scene.add.image(x, y, tankData.imageKey).setOrigin(0)
    this.mainContainer.add(tank)
    this.tanks.add(tank)
    this.placingMatrix[rowIndex][columnIndex] = false
  }

  canPlaceAt (rowIndex, columnIndex) {
    return this.placingMatrix[rowIndex][columnIndex]
  }
}
