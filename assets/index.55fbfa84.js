import{p as e}from"./vendor.6400bf0f.js";var t=[{stage:1,money:300,live:2,enemyAmount:10,enemyPeriod:1200,mapData:{matrix:[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]],start:[0,3],end:[9,10]}},{stage:2,money:100,live:3,enemyAmount:14,enemyPeriod:1200,mapData:{matrix:[[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]],start:[0,9],end:[9,5]}},{stage:3,money:100,live:5,enemyAmount:18,enemyPeriod:1500,mapData:{matrix:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0],[0,0,1,0,1,0,0,0,0,1,1,1,1,1,0,0],[0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0],[0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]],start:[1,0],end:[9,2]}}];class i extends e.exports.Scene{create(){const{width:e,height:i}=this.game.config;this.add.rectangle(e/2,i/2,e,i,4079166),this.add.text(e/2,i/2-100,"塔防遊戲",{fontFamily:'"Noto Sans TC", sans-serif',fontSize:"72px"}).setOrigin(.5),this.add.container(e/2,i/2,[this.add.rectangle(0,0,100,50,2105376).setInteractive({useHandCursor:!0}).on("pointerup",(()=>{this.scene.start("stageScene",t[0])})),this.add.text(0,0,"開始").setOrigin(.5)])}}class a{create(e,t,i){this.scene=e,this.statusBar=this._createStatusBar(),this.tanksBar=this._createTanksBar(i),this.placingLayer=this._createPlacingLayer(t)}_createStatusBar(){const e=document.createElement("div"),t=document.createElement("div"),i=document.createElement("div"),a=document.createElement("div"),s=document.createElement("div");return e.id="status-bar-container",e.style.width="100%",e.style.height="64px",t.id="status-bar",e.appendChild(t),t.appendChild(i),t.appendChild(a),t.appendChild(s),this.scene.add.dom(0,0,e).setOrigin(0),{updateStageText(e){i.innerText=`第 ${e} 關`},updateMoneyText(e){a.innerText=`$: ${e}`},updateLiveText(e){s.innerText=`❤: ${e}`}}}_createTanksBar(e){const t=this._createTankIntro(),i=[],a=[],s=[];for(let r=0;r<10;r++){const a=40+80*r,n=this.scene.add.container(a,16,[this.scene.add.rectangle(0,0,64,64,4342338).setOrigin(0),...r<e.length?[this.scene.add.image(0,0,e[r].imageKey).setInteractive({useHandCursor:!0}).on("pointerover",(()=>{t.updateTankIntroText(e[r]),t.setVisible(!0)})).on("pointerout",(()=>{t.setVisible(!1)})).on("pointermove",(e=>{t.updateTankIntroPosition(e)})).on("pointerup",(()=>{i.forEach((t=>{t(e[r])}))})).setOrigin(0)]:[]]);s.push(n)}const n=this.scene.add.container(840,16,[this.scene.add.rectangle(0,0,168,64,14896461).setOrigin(0).setInteractive({useHandCursor:!0}).on("pointerup",(()=>{a.forEach((e=>{e()}))})),this.scene.add.text(84,32,"START",{fontFamily:'"Noto Sans TC", sans-serif',fontSize:"30px"}).setOrigin(.5)]);return this.scene.add.container(0,704,[this.scene.add.rectangle(0,0,1024,96,5921370).setOrigin(0),...s,n]),{onTankClick(e){i.push(e)},onStartClick(e){a.push(e)}}}_createTankIntro(){const e=document.createElement("div"),t=document.createElement("div"),i=document.createElement("div");e.id="tank-intro-container",t.id="tank-intro-bg",e.appendChild(t),i.id="tank-intro-content",t.appendChild(i);const a=this.scene.add.dom(0,0,e).setOrigin(0,1);return a.setVisible(!1),{setVisible(e){a.setVisible(e)},updateTankIntroText(e){i.innerHTML=`${e.name}<br>射擊速度：${e.speed}<br>射程範圍：${e.range}<br>特殊功能：${e.ability}<br>價錢：${e.price}`},updateTankIntroPosition({x:e,y:t}){a.setPosition(e,t)}}}_createPlacingLayer(e){const t=[],i=this.scene.add.container(0,64),a=e.matrix.map(((e,i)=>e.map(((e,a)=>this.scene.add.rectangle(64*a,64*i,64,64).setInteractive({useHandCursor:!0}).on("pointerup",(()=>{t.forEach((e=>{e({rowIndex:i,columnIndex:a})}))})).setOrigin(0).setSize(60).setStrokeStyle(4).setDisplayOrigin(-2,-2)))));i.add(a.flat()),i.setVisible(!1);const s=this._createPreviewTank();return{setVisible(e){i.setVisible(e),s.setVisible(e)},updatePreviewTank:s.updatePreviewTank,updatePlacingGridMap(e){a.forEach(((t,i)=>{t.forEach(((t,a)=>{const s=e[i][a]?3135122:16723513;t.setStrokeStyle(4,s)}))}))},onPlacingGridClick(e){t.push(e)}}}_createPreviewTank(){const e=this.scene.add.container(0,0),t=this.scene.add.ellipse(0,0,0,0,15568017,.3),i=this.scene.add.image(0,0);return e.add([t,i]),e.setVisible(!1),this.scene.input.on("pointermove",(({x:t,y:i})=>{e.setPosition(t,i)})),{setVisible(t){e.setVisible(t)},updatePreviewTank(e){i.setTexture(e.imageKey),t.setSize(.5*e.range*64,.5*e.range*64).setOrigin(.5)}}}}class s extends e.exports.GameObjects.Sprite{constructor(e,t,i,a){super(e,64*i,64*t,a.imageKey),this.scene=e,this.data=a,this.setOrigin(0)}}class n extends e.exports.GameObjects.Ellipse{constructor(t,i,a,s,n){super(t,64*a+32,64*i+32,64*s.size,64*s.size,s.color),this.scene=t,this.enemyData=s,this.path=n,this.setOrigin(.5),this.follower={t:0,vec:new e.exports.Math.Vector2},this.startOnPath()}startOnPath(){this.follower.t=0,this.path.getPoint(this.follower.t,this.follower.vec),this.setPosition(this.follower.vec.x,this.follower.vec.y)}update(e,t){t/=1e3,this.follower.t+=t*this.enemyData.speed/(this.path.getLength()/64),this.path.getPoint(this.follower.t,this.follower.vec),this.setPosition(this.follower.vec.x,this.follower.vec.y),this.follower.t>=1&&this.setActive(!1)}}class r{create(e,t){this.scene=e,this.placingMatrix=t.matrix.map(((e,t)=>e.map(((e,t)=>0===e)))),this.tanks=this.scene.add.group(),this.enemies=this.scene.add.group(),this.mainContainer=this.scene.add.container(0,64),this._createBackground(t),this.path=this._createPath(t)}update(e,t){this.enemies.children.iterate((i=>{i.update(e,t)}))}_createBackground(e){const t=this.scene.add.container(0,0),i=e.matrix.map(((e,t)=>e.map(((e,i)=>{const a={0:10013806,1:15913593};return this.scene.add.rectangle(64*i,64*t,64,64,a[e]).setOrigin(0)}))));t.add([...i.flat(),this.scene.add.container(64*e.start[1],64*e.start[0],[this.scene.add.rectangle(0,0,64,64,15124339).setOrigin(0),this.scene.add.text(32,32,"START",{fontFamily:'"Noto Sans TC", sans-serif',fontSize:"15px",color:"#6e5e31"}).setOrigin(.5)]),this.scene.add.container(64*e.end[1],64*e.end[0],[this.scene.add.rectangle(0,0,64,64,15124339).setOrigin(0),this.scene.add.text(32,32,"END",{fontFamily:'"Noto Sans TC", sans-serif',fontSize:"15px",color:"#6e5e31"}).setOrigin(.5)])]),this.mainContainer.add(t)}_findPath({matrix:e,start:t}){const i=e.flatMap(((e,t)=>e.map(((e,i)=>[e,t,i])))).filter((e=>1===e[0])).map((e=>{const[,...t]=e;return t})),a=[];for(;i.length>0;){if(0===a.length){const e=i.findIndex((e=>t[0]===e[0]&&t[1]===e[1]));a.push(...i.splice(e,1))}const e=a.slice(-1)[0],s=[i.findIndex((t=>e[0]+1===t[0]&&e[1]===t[1])),i.findIndex((t=>e[0]-1===t[0]&&e[1]===t[1])),i.findIndex((t=>e[0]===t[0]&&e[1]-1===t[1])),i.findIndex((t=>e[0]===t[0]&&e[1]+1===t[1]))].find((e=>-1!==e));a.push(...i.splice(s,1))}return a}_createPath(e){const t=this._findPath(e),i=this.scene.add.graphics(),a=this.scene.add.path(0,0);return t.map((([e,t])=>[64*t,64*e])).forEach((([e,t],i)=>{const s=e+32,n=t+32;0!==i?a.lineTo(s,n):a.moveTo(s,n)})),i.lineStyle(3,16777215,0),a.draw(i),this.mainContainer.add(i),a}addTank(e,t,i){const a=new s(this.scene,t,i,e);this.mainContainer.add(a),this.tanks.add(a),this.placingMatrix[t][i]=!1}canPlaceAt(e,t){return this.placingMatrix[e][t]}addEnemy(e,t,i){const a=new n(this.scene,t,i,e,this.path);this.mainContainer.add(a),this.enemies.add(a)}addEnemies(e,t,i,a,s){let n=0;const r=setInterval((()=>{this.addEnemy(e,t,i),n+=1,n===a&&clearInterval(r)}),s)}}var o=[{name:"黃金一級獵犬砲台",image:"/final/assets/tank_1.ca2959c3.png",imageKey:"tank-brown",range:6,speed:1,ability:"無",price:50},{name:"金剛二級鸚鵡砲台",image:"/final/assets/tank_2.181a4c2d.png",imageKey:"tank-red",range:8,speed:1.5,ability:"無",price:100},{name:"殺人鯨三級砲台",image:"/final/assets/tank_3.af59195d.png",imageKey:"tank-blue",range:10,speed:2,ability:"無",price:150}],d=[{live:3,speed:.6,color:9393302,size:.3,money:25},{live:6,speed:.8,color:3108034,size:.4,money:30},{live:10,speed:.8,color:10228756,size:.5,money:35}];class c extends e.exports.Scene{preload(){o.forEach((e=>{this.load.image(e.imageKey,e.image)}))}create(e){this._stage=0,this._money=0,this._live=0,this._previewTankData=null,this.stageMap=new r,this.ui=new a,this.stageMap.create(this,e.mapData),this.ui.create(this,e.mapData,o),this.stage=e.stage,this.money=e.money,this.live=e.live;this.ui.tanksBar.onTankClick((e=>{if(this.previewTankData===e)return this.ui.placingLayer.setVisible(!1),void(this.previewTankData=null);this.money<e.price||(this.previewTankData=e,this.ui.placingLayer.updatePlacingGridMap(this.stageMap.placingMatrix),this.ui.placingLayer.setVisible(!0))}));this.ui.placingLayer.onPlacingGridClick((({rowIndex:e,columnIndex:t})=>{this.stageMap.canPlaceAt(e,t)&&(this.money-=this.previewTankData.price,this.stageMap.addTank(this.previewTankData,e,t),this.ui.placingLayer.setVisible(!1),this.previewTankData=null)}));this.ui.tanksBar.onStartClick((()=>{this.stageMap.addEnemies(d[this.stage-1],e.mapData.start[0],e.mapData.start[1],e.enemyAmount,e.enemyPeriod)}))}update(e,t){this.stageMap.update(e,t)}get stage(){return this._stage}set stage(e){this._stage=e,this.ui.statusBar.updateStageText(this._stage)}get money(){return this._money}set money(e){this._money=e,this.ui.statusBar.updateMoneyText(this._money)}get live(){return this._live}set live(e){this._live=e,this.ui.statusBar.updateLiveText(this._live)}get previewTankData(){return this._previewTankData}set previewTankData(e){this._previewTankData=e,null!==e&&this.ui.placingLayer.updatePreviewTank(this._previewTankData)}}!function(){const t={parent:"game",dom:{createContainer:!0},type:e.exports.AUTO,width:1024,height:800,physics:{default:"arcade",arcade:{debug:!1}}},a=new e.exports.Game(t);a.scene.add("welcomeScene",new i),a.scene.add("stageScene",new c),a.scene.start("welcomeScene")}();
