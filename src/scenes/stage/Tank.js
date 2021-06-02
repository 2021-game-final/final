import { GameObjects } from 'phaser'
import { GRID_SIZE } from '../../Constants'

export default class Tank extends GameObjects.Sprite {
  /**
   * Creates an instance of Tank.
   * @param {import('phaser').Scene} scene
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @param {import('../../data/tanks/Index').TankData} tankData
   * @memberof Tank
   */
  constructor (scene, rowIndex, columnIndex, tankData) {
    super(scene, columnIndex * GRID_SIZE, rowIndex * GRID_SIZE, tankData.imageKey)
    this.scene = scene
    this.data = tankData
    this.setOrigin(0)
  }
}
