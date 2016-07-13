import {ModelProxy} from 'corona-client'
import GameComponent from './gameComponent'
import * as $ from 'jquery'
import {IPlayer} from './../../../interface/IPlayer'

export default class PlayerGameComponent extends GameComponent {
  name = 'player'
  id: number
  dom: JQuery
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
    $(zoom).append(dom);
    // initialized
    this.initialized = true;
    this.fire('initialize');
  }

  updatePosition(
    x: number = this.model.data.position.x,
    y: number = this.model.data.position.y
  ) {
    this.position.x = x;
    this.position.y = y;
    this.dom.css({
      top: y,
      left: x
    });
  }

  updatePositionBy(offestX: number, offsetY: number) {
    this.updatePosition(this.position.x + offestX, this.position.y + offsetY);
  }

  getDom(data: IPlayer) {
    if (this.dom) {
      return this.dom
    }
    let dom = $('<div class="mouse iconfont icon-shubiao"></div>');
    this.dom = dom;
    return dom;
  }

  destroy() {
    super.destroy();
    this.dom.remove();
  }
}