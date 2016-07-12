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
      this.fire('moveBy', this.movingVector[0] * this.speed, this.movingVector[1] * this.speed);
      window.requestAnimationFrame((() => { this.move() }).bind(this))
    }
  }

  constructor(model, zoom) {
    super(model, zoom);
    // 绑定动作
    this.on('moveTo', this.updatePosition.bind(this));
    this.on('moveBy', this.updatePositionBy.bind(this));
    // 初始化
    this._init();
  }

  private _init() {
    let self = this;
    $(window).keydown((e) => {
      this.moving = true;
      let direction = this.moveDirection[e.which];
      if (!direction.active) {
        direction.active = true;
        let vector = direction.vector;
        this.movingVector[0] += vector[0];
        this.movingVector[1] += vector[1];
        this.move();
      }
    });

    $(window).keyup((e) => {
      let direction = this.moveDirection[e.which];
      if (direction.active) {
        direction.active = false;
        let vector = direction.vector;
        this.movingVector[0] -= vector[0];
        this.movingVector[1] -= vector[1];
        if (this.movingVector[0] == 0 && this.movingVector[1] == 0) {
          this.moving = false;
        }
      }
    });

  }
}