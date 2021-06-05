import { GameObjects, Math as PMath } from 'phaser'
import { GRID_SIZE } from '../../Constants'

export default class Tank extends GameObjects.Sprite {
  /**
   * Creates an instance of Tank.
   * @param {import('./StageMap').default} map
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @param {import('../../data/tanks/Index').TankData} tankData
   * @memberof Tank
   */
  constructor (map, rowIndex, columnIndex, tankData) {
    super(map.scene, columnIndex * GRID_SIZE + (GRID_SIZE / 2), rowIndex * GRID_SIZE + (GRID_SIZE / 2), tankData.imageKey)
    this.setOrigin(0.5)
    this.map = map
    this.scene = map.scene
    this.data = tankData
    this.lastAttackTime = -1
    this.rangeDistance = tankData.range * GRID_SIZE
    this.lockedOnEnemy = undefined
  }

  update (time) {
    if (this.lockedOnEnemy === undefined) return
    const angle = PMath.Angle.Between(this.x, this.y, this.lockedOnEnemy.x, this.lockedOnEnemy.y)
    this.setRotation(angle + PMath.PI2 * 1 / 4)

    if (time - this.lastAttackTime > 1000 / this.data.speed) {
      this.attack(this.lockedOnEnemy)
      this.lastAttackTime = time
    }
  }

  /**
   *
   *
   * @param {import('phaser').GameObjects.Group} enemies
   * @memberof Tank
   */
  lockOnEnemy (enemies) {
    this.lockedOnEnemy = enemies.getChildren().find((enemy) => {
      const distance = PMath.Distance.Between(this.x, this.y, enemy.x, enemy.y)
      return this.rangeDistance + enemy.enemyData.size * GRID_SIZE >= distance
    })
  }

  attack (enemy) {
    console.log(this.data.name, 'attack')
    this.map.addBullet(this, enemy)
  }
}
