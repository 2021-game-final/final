import {STATUS_BAR_HEIGHT, GRID_SIZE, GRASS, ROAD} from "./Constants.js"

class GameScene extends Phaser.Scene {
  constructor() {
    super()
  }

  create({
    map
  }) {
    map.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const color = column === 0 ? GRASS : ROAD;
        this.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE +64,
          GRID_SIZE,
          GRID_SIZE,
          color
        ).setOrigin(0);
      })
    });

    this.createStatusBar();
    setInterval(() => {
      this.money-=5;
    }, 1000)
  }

  // TODO: 狀態列的更新
  createStatusBar() {
    this.statusBarContainerEl = document.createElement('div');
    this.statusBarContainerEl.id = "status-bar-container";
    this.statusBarContainerEl.style.width = "100%";
    this.statusBarContainerEl.style.height = `${STATUS_BAR_HEIGHT}px`;

    this.statusBarEl = document.createElement('div');
    this.statusBarEl.id = "status-bar"
    this.statusBarContainerEl.appendChild(this.statusBarEl);
    this.stage = 1;
    this.stageEl = document.createElement('div');
    this.stageEl.innerText = `第 ${this.stage} 關`;
    this.statusBarEl.appendChild(this.stageEl);
    this.money = 300;
    this.moneyEl = document.createElement('div');
    this.moneyEl.innerText = "$: 300";
    this.statusBarEl.appendChild(this.moneyEl);
    this.live = 10;
    this.liveEl = document.createElement('div');
    this.liveEl.innerText = "❤: 10";
    this.statusBarEl.appendChild(this.liveEl);
    const domElement = this.add.dom(0, 0, this.statusBarContainerEl).setOrigin(0);
  }

  update() {
    this.moneyEl.innerText = `$: ${this.money}`;
  }
}

export default GameScene
