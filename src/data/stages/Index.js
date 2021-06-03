import stage1 from './1'
import stage2 from './2'
import stage3 from './3'

/**
 *
 * @typedef {Object} MapData
 * @property {number[][]} matrix
 * @property {[number, number]} start
 * @property {[number, number]} end
 *
 */

/**
 *
 * @typedef {Object} StageData
 * @property {number} stage
 * @property {number} money
 * @property {number} live
 * @property {number} enemyAmount
 * @property {number} enemyPeriod
 * @property {MapData} mapData
 *
 */

export default [
  stage1,
  stage2,
  stage3
]
