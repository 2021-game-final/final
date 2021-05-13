import { MAP_WIDTH, MAP_HEIGHT, STATUS_BAR_HEIGHT, TANK_BAR_HEIGHT, GRID_SIZE, GRASS, ROAD } from "./Constants.js"
import TankData from './TankData.js'
import tank_1 from '../images/tank_1.png'
import tank_2 from '../images/tank_2.png'
import tank_3 from '../images/tank_3.png'

class GameScene extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("tank-brown", tank_1);
    this.load.image("tank-red", tank_2);
    this.load.image("tank-blue", tank_3);
  }

  create({
    map
  }) {
    map.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const color = column === 0 ? GRASS : ROAD;
        this.add.rectangle(
          columnIndex * GRID_SIZE,
          rowIndex * GRID_SIZE + 64,
          GRID_SIZE,
          GRID_SIZE,
          color
        ).setOrigin(0);
      })
    });

    this.tanksData = [
      new TankData("一級砲台", "tank-brown"),
      new TankData("二級砲台", "tank-red"),
      new TankData("三級砲台", "tank-blue")
    ];

    this.createStatusBar();
    this.createTankBar();
    setInterval(() => {
      this.money -= 5;
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

  // 砲台列表
  createTankBar() {
    const kuangKuangs = []
    for (let i = 0; i < 12; i++) {
      const x = 40 + i * 80;
      const kuangKuang = this.add.container(x, 16, [
        this.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0x424242).setOrigin(0),
        ...i < this.tanksData.length
          ? [
            this.add.image(0, 0, this.tanksData[i].image)
              .setInteractive({ useHandCursor: true })
              .on('pointerup', () => {
                console.log("hi");
              })
              .setOrigin(0)
          ]
          : []
      ])
      kuangKuangs.push(kuangKuang);

    }
    this.add.container(0, STATUS_BAR_HEIGHT + MAP_HEIGHT, [
      this.add.rectangle(0, 0, MAP_WIDTH, TANK_BAR_HEIGHT, 0x5a5a5a).setOrigin(0),
      ...kuangKuangs
    ])
  }

  update() {
    this.moneyEl.innerText = `$: ${this.money}`;
  }
}

export default GameScene
