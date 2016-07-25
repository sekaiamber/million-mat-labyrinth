import PlayerGameComponent from './player'
import * as $ from 'jquery'

export default class CharacterGameComponent extends PlayerGameComponent {
  name = 'character'
  $say: JQuery
  $input: JQuery

  // controll
  lock = false;

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
    if (!this.lock && this.moving) {
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

  stopMoving() {
    Object.keys(this.moveDirection).map((e) => {
      this.moveDirection[e].active = false;
      this.movingVector[0] = 0;
      this.movingVector[1] = 0;
      this.moving = false;
      this.fire('finishMove', this);
    })
  }

  private _init() {
    let self = this;
    // dom
    let say = $('<div class="say hidden"><input /></div>');
    this.$dom.append(say);
    this.$say = say;
    this.$input = $('input', say);
    // start move
    $(window).keydown((e) => {
      if (this.lock) return;
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
      if (this.lock) return;
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
    // say
    $(window).keypress((e) => {
      if (e.which == 13) {
        this.lock = !this.lock;
        if (this.lock) {
          // say
          this.stopMoving();
          this.$input.val('');
          this.$say.removeClass('hidden');
          this.$input.focus();
        } else {
          // move
          let msg: string = this.$input.val();
          if (msg.length != 0) {
            this.saying(msg, (new Date()).getTime());
          }
          this.$say.addClass('hidden');
        }
      }
    })
  }
}