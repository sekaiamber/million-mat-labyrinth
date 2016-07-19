import {ModelProxy} from 'corona-client'
import GameComponent from './gameComponent'
import * as $ from 'jquery'
import {IPlayer} from './../../../interface/IPlayer'

export default class PlayerGameComponent extends GameComponent {
  name = 'player'
  id: number
  $dom: JQuery
  $player: JQuery
  $name: JQuery
  $messageBox: JQuery
  position = {
    x: 0,
    y: 0,
  }

  constructor(model: ModelProxy, zoom: HTMLDivElement) {
    super(model, zoom);
    this.id = model.data._id;
    let dom = this.getDom(model.data);
    // init data
    this.updatePosition();
    this.updateName();
    $(zoom).append(dom);
    // initialized
    this.initialized = true;
    this.fire('initialize');
  }

  protected deg_v1 = 0
  protected deg_v2 = 0
  protected deg = 0
  updateDegree(v1: number, v2: number) {
    if (this.deg_v1 == v1 && this.deg_v2 == v2) {
      return;
    } else {
      this.deg_v1 = v1;
      this.deg_v2 = v2;
    }
    let deg = -1;
    if (v1 == 0 && v2 == -1) { deg = 0; }
    else if (v1 == 1 && v2 == -1) { deg = 45; }
    else if (v1 == 1 && v2 == 0) { deg = 90; }
    else if (v1 == 1 && v2 == 1) { deg = 135; }
    else if (v1 == 0 && v2 == 1) { deg = 180; }
    else if (v1 == -1 && v2 == 1) { deg = 225; }
    else if (v1 == -1 && v2 == 0) { deg = 270; }
    else if (v1 == -1 && v2 == -1) { deg = 315; }
    if (deg == -1) return;
    let selfdeg = this.deg % 360;
    let diff = Math.abs(selfdeg - deg);
    if (diff <= 180) {
      this.deg = this.deg + (deg - selfdeg);
    } else {
      if (deg > selfdeg) {
        this.deg = this.deg + (deg - 360 - selfdeg);
      } else {
        this.deg = this.deg + (deg + 360 - selfdeg);
      }
    }
  }

  updatePosition(
    x: number = this.model.data.position.x,
    y: number = this.model.data.position.y
  ) {
    this.updateDegree(x - this.position.x, y - this.position.y);
    this.position.x = x;
    this.position.y = y;
    this.$dom.css({
      top: y,
      left: x,
    });
    this.$player.css({
      transform: `rotateZ(${this.deg}deg)`
    })
  }

  updatePositionBy(offestX: number, offsetY: number) {
    this.updatePosition(this.position.x + offestX, this.position.y + offsetY);
  }

  updateName(name: string = this.model.data.name) {
    this.$name.html(name);
  }

  saying(
    message: string = this.model.data.say.message,
    time: number = this.model.data.say.time,
    to: number = this.model.data.say.to
  ) {
    if ($(`.player-message[ts=${time}]`, this.$messageBox).length > 0) {
      return;
    } 
    let $msg = $(`<div class="player-message" ts="${time}">${message}</div>`);
    this.$messageBox.append($msg);
    setTimeout(() => {
      $msg.remove();
    }, 4000);
  }

  getDom(data: IPlayer) {
    if (this.$dom) {
      return this.$dom
    }
    let dom = $('<div class="player"></div>');
    let player = $('<div class="obj iconfont icon-player"></div>');
    let name = $('<div class="player-name"></div>');
    let msgbox = $('<div class="player-messagebox"></div>');
    dom.append(player).append(name).append(msgbox);
    this.$dom = dom;
    this.$player = player;
    this.$name = name;
    this.$messageBox = msgbox;
    player.css('color', data.color);
    return dom;
  }

  destroy() {
    super.destroy();
    this.$dom.remove();
  }
}