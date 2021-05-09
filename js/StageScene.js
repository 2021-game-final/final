const GRID_SIZE = 64;
const GRASS = 0x98cc6e;
const ROAD = 0xf2d279;

class GameScene extends Phaser.Scene {
  constructor({
    map
  }) {
    super()
    this.map = map;
  }

  create() {
    this.map.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const color = column === 0 ? GRASS : ROAD;
        this.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE,
          color
        ).setOrigin(0);
      })
    });
  }
}

export default GameScene
