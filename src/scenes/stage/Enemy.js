import { GameObjects, Math as PMath } from 'phaser'
import { GRID_SIZE } from '../../Constants'

export default class Enemy extends GameObjects.Ellipse {
  /**
   * Creates an instance of Enemy.
   * @param {import('./StageMap').default} map
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @param {import('../../data/enemies').EnemyData} enemyData
   * @param {import('phaser').Curves.Path} path
   * @memberof Enemy
   */
  constructor (map, rowIndex, columnIndex, enemyData, path) {
    super(
      map.scene,
      columnIndex * GRID_SIZE + (GRID_SIZE / 2),
      rowIndex * GRID_SIZE + (GRID_SIZE / 2),
      GRID_SIZE * enemyData.size * 2,
      GRID_SIZE * enemyData.size * 2,
      enemyData.color
    )
    this.scene = map.scene
    this.enemyData = enemyData
    this.path = path
    this.setOrigin(0.5)
    this.follower = { t: 0, vec: new PMath.Vector2() }
    this.startOnPath()
  }

  startOnPath () {
    this.follower.t = 0
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }

  update (time, delta) {
    delta = delta / 1000
    this.follower.t += delta * this.enemyData.speed / (this.path.getLength() / GRID_SIZE)
    this.path.getPoint(this.follower.t, this.follower.vec)

    this.setPosition(this.follower.vec.x, this.follower.vec.y)

    if (this.follower.t >= 1) {
      this.setActive(false)
    }
  }
}
