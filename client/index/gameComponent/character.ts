import PlayerGameComponent from './player'
import * as $ from 'jquery'

export default class CharacterGameComponent extends PlayerGameComponent {
  name = 'character'
  // moving
  speed = 1
  moving = false
  movingVector = [0, 0]
  moveDirection = {
    37: { name: 'Left', vector: [-1, 0], active: false },
    38: { name: 'Up', vector: [0, -1], active: false },
    39: { name: 'Right', vector: [1, 0], active: false },
    40: { name: 'Down', vector: [0, 1], active: false },
  }
  
  move() {
    if (this.moving) {
      this.updatePositionBy(this.movingVector[0] * this.speed, this.movingVector[1] * this.speed);
      window.requestAnimationFrame((() => { this.move() }).bind(this))
    }
  }

  constructor(model, zoom) {
    super(model, zoom);
    // 初始化
    this._init();
  }

  updatePosition(x: number, y: number) {
    super.updatePosition(x, y);
    this.fire('move', x, y, this);
  }

  private _init() {
    let self = this;
    // start move
    $(window).keydown((e) => {
      let direction = this.moveDirection[e.which];
      if (direction && !direction.active) {
        direction.active = true;
        let vector = direction.vector;
        this.movingVector[0] += vector[0];
        this.movingVector[1] += vector[1];
        if (!this.moving) {
          this.moving = true;
          this.fire('startMove', this);
          this.move();
        }
        this.fire('changeDirection', this);
      }
    });
    // stop move
    $(window).keyup((e) => {
      let direction = this.moveDirection[e.which];
      if (direction && direction.active) {
        direction.active = false;
        let vector = direction.vector;
        this.movingVector[0] -= vector[0];
        this.movingVector[1] -= vector[1];
        if (this.movingVector[0] == 0 && this.movingVector[1] == 0) {
          this.moving = false;
          this.fire('finishMove', this);
        }
      }
    });
    
  }
}