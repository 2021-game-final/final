import { GameObjects, Math as PMath } from 'phaser'
import { GRID_SIZE } from '../../Constants'

const flyingSpeed = 1.7

export default class Bullet extends GameObjects.Ellipse {
  constructor (map, tank, enemy) {
    super(map.scene, tank.x, tank.y, 7, 7, 0x000000)
    this.scene = map.scene
    this.tank = tank
    this.enemy = enemy
  }

  update (time, delta) {
    delta = delta / 1000
    const unitVector = (new PMath.Vector2(this.enemy.x - this.x, this.enemy.y - this.y)).normalize()
    const x = this.x + delta * flyingSpeed * GRID_SIZE * unitVector.x
    const y = this.y + delta * flyingSpeed * GRID_SIZE * unitVector.y
    this.setPosition(x, y)
  }
}
