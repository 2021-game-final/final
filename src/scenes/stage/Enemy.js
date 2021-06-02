import { GameObjects } from 'phaser'
import { GRID_SIZE } from '../../Constants'

export default class Enemy extends GameObjects.Ellipse {
  constructor (scene, rowIndex, columnIndex) {
    super(scene, columnIndex * GRID_SIZE + (GRID_SIZE / 2), rowIndex * GRID_SIZE + (GRID_SIZE / 2), GRID_SIZE / 2, GRID_SIZE / 2, 0xff0000)
    this.scene = scene
    this.setOrigin(0.5)
  }
}
