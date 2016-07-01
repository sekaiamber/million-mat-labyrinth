import {ModelProxy} from 'corona-client'
import GameComponent from './gameComponent'
import * as $ from 'jquery'
import {IPlayer} from './../../../interface/IPlayer'

export default class PlayerGameComponent extends GameComponent {
  name = 'player'
  id: number
  dom: JQuery

  constructor(model: ModelProxy, zoom: HTMLDivElement) {
    super(model, zoom);
    this.id = model.data._id;
    let dom = this.getDom(model.data);
    $(zoom).append(dom);
    // initialized
    this.initialized = true;
    this.fire('initialize');
  }

  updatePosition(x: number, y: number) {
    this.dom.css({
      top: y,
      left: x
    });
  }

  getDom(data: IPlayer) {
    if (this.dom) {
      return this.dom
    }
    let dom = $('<div class="mouse iconfont icon-shubiao"></div>');
    this.dom = dom;
    return dom;
  }
}