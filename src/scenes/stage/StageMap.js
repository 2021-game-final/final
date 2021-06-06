import { STATUS_BAR_HEIGHT, GRID_SIZE, COLOR_ROAD, COLOR_GRASS, ROAD, GRASS } from '../../Constants'
import Tank from './Tank'
import Enemy from './Enemy'
import Bullet from './Bullet'

function delay (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default class StageMap {
  /**
   *
   *
   * @param {import('./StageScene').default} scene
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
    this.enemies = this.scene.add.group()
    this.bullets = this.scene.add.group()

    this.mainContainer = this.scene.add.container(0, STATUS_BAR_HEIGHT)
    this._createBackground(mapData)
    this.path = this._createPath(mapData)
  }

  update (time, delta) {
    this.enemies.children.iterate((enemy) => {
      enemy.update(time, delta)
    })
    this.tanks.children.iterate((tank) => {
      tank.lockOnEnemy(this.enemies)
      tank.update(time)
    })
    this.bullets.children.iterate((bullet) => {
      bullet.update(time, delta)
    })
    const hasAliveEnemy = this.enemies.getChildren().some((enemy) => {
      return enemy.active
    })
    if (!hasAliveEnemy && this.enemies.getLength() === this.scene.stageData.enemyAmount) {
      this.scene.status = 'gameWinner'
    }
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
    container.add([
      ...gridMap.flat(),
      this.scene.add.container(mapData.start[1] * GRID_SIZE, mapData.start[0] * GRID_SIZE, [
        this.scene.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0xe6c773).setOrigin(0),
        this.scene.add.text(GRID_SIZE / 2, GRID_SIZE / 2, 'START', {
          fontFamily: '"Noto Sans TC", sans-serif',
          fontSize: '15px',
          color: '#6e5e31'
        }).setOrigin(0.5)
      ]),
      this.scene.add.container(mapData.end[1] * GRID_SIZE, mapData.end[0] * GRID_SIZE, [
        this.scene.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0xe6c773).setOrigin(0),
        this.scene.add.text(GRID_SIZE / 2, GRID_SIZE / 2, 'END', {
          fontFamily: '"Noto Sans TC", sans-serif',
          fontSize: '15px',
          color: '#6e5e31'
        }).setOrigin(0.5)
      ])
    ])
    this.mainContainer.add(container)
  }

  /**
   *
   *
   * @param {import('../../data/stages/Index').MapData} mapData
   * @return {[number, number][]}
   * @memberof StageMap
   */
  _findPath ({ matrix, start }) {
    const allCoords = matrix
      .flatMap((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          return [column, rowIndex, columnIndex]
        })
      })
      .filter((tuple) => {
        return tuple[0] === ROAD
      })
      .map((tuple) => {
        const [, ...coord] = tuple
        return coord
      })

    const path = []
    while (allCoords.length > 0) {
      if (path.length === 0) {
        const index = allCoords.findIndex((coord) => start[0] === coord[0] && start[1] === coord[1])
        path.push(...allCoords.splice(index, 1))
      }
      const last = path.slice(-1)[0]
      const index = [
        allCoords.findIndex((coord) => (last[0] + 1) === coord[0] && last[1] === coord[1]),
        allCoords.findIndex((coord) => (last[0] - 1) === coord[0] && last[1] === coord[1]),
        allCoords.findIndex((coord) => last[0] === coord[0] && (last[1] - 1) === coord[1]),
        allCoords.findIndex((coord) => last[0] === coord[0] && (last[1] + 1) === coord[1])
      ].find((i) => i !== -1)
      path.push(...allCoords.splice(index, 1))
    }
    return path
  }

  /**
   *
   *
   * @param {import('../../data/stages/Index').MapData} mapData
   * @memberof StageMap
   */
  _createPath (mapData) {
    const pathData = this._findPath(mapData)
    const graphics = this.scene.add.graphics()
    const path = this.scene.add.path(0, 0)
    pathData.map(([rowIndex, columnIndex]) => {
      return [columnIndex * GRID_SIZE, rowIndex * GRID_SIZE]
    })
      .forEach(([_x, _y], index) => {
        const x = _x + (GRID_SIZE / 2)
        const y = _y + (GRID_SIZE / 2)
        if (index === 0) {
          path.moveTo(x, y)
          return
        }
        path.lineTo(x, y)
      })
    graphics.lineStyle(3, 0xffffff, 0)
    path.draw(graphics)
    this.mainContainer.add(graphics)
    return path
  }

  /**
   *
   * @param {import('../../data/tanks/Index').TankData} tankData
   * @param {number} rowIndex
   * @param {number} columnIndex
   */
  addTank (tankData, rowIndex, columnIndex) {
    const tank = new Tank(this, rowIndex, columnIndex, tankData)
    this.mainContainer.add(tank)
    this.tanks.add(tank)
    this.placingMatrix[rowIndex][columnIndex] = false
  }

  canPlaceAt (rowIndex, columnIndex) {
    return this.placingMatrix[rowIndex][columnIndex]
  }

  /**
   *
   * @param {import('../../data/enemies').EnemyData} enemyData
   * @param {number} rowIndex
   * @param {number} columnIndex
   */
  addEnemy (enemyData, rowIndex, columnIndex) {
    const enemy = new Enemy(this, rowIndex, columnIndex, enemyData, this.path)
    this.mainContainer.add(enemy)
    this.enemies.add(enemy)
  }

  async addEnemies (enemyData, rowIndex, columnIndex, amount, period) {
    this.addEnemy(enemyData, rowIndex, columnIndex)
    for (let i = 1; i < amount; i++) {
      await delay(period)
      this.addEnemy(enemyData, rowIndex, columnIndex)
    }
  }

  addBullet (tank, enemy) {
    const bullet = new Bullet(this, tank, enemy)
    this.mainContainer.add(bullet)
    this.bullets.add(bullet)
  }
}
