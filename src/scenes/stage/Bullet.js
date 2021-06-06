import { GameObjects, Math as PMath } from 'phaser'
import { GRID_SIZE } from '../../Constants'

const flyingSpeed = 1.7
const bulletSize = 3.5

export default class Bullet extends GameObjects.Ellipse {
  /**
   * Creates an instance of Bullet.
   * @param {import('./StageMap').default} map
   * @param {import('./Tank').default} tank
   * @param {import('./Enemy').default} enemy
   * @memberof Bullet
   */
  constructor (map, tank, enemy) {
    super(map.scene, tank.x, tank.y, bulletSize * 2, bulletSize * 2, 0x000000)
    this.scene = map.scene
    this.map = map
    this.tank = tank
    this.enemy = enemy
  }

  update (time, delta) {
    if (!this.active) return
    delta = delta / 1000
    const unitVector = (new PMath.Vector2(this.enemy.x - this.x, this.enemy.y - this.y)).normalize()
    const x = this.x + delta * flyingSpeed * GRID_SIZE * unitVector.x
    const y = this.y + delta * flyingSpeed * GRID_SIZE * unitVector.y
    this.setPosition(x, y)

    const distance = PMath.Distance.Between(this.x, this.y, this.enemy.x, this.enemy.y)
    if (distance <= bulletSize + this.enemy.enemyData.size * GRID_SIZE) {
      this.setActive(false)
      this.setVisible(false)
      this.enemy.live -= 1
    }
  }
}
