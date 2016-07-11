import PlayerGameComponent from './player'
import * as $ from 'jquery'

export default class CharacterGameComponent extends PlayerGameComponent {
  name = 'character'

  constructor(model, zoom) {
    super(model, zoom);
    // 绑定动作
    this.on('move', this.updatePosition.bind(this));
    // 初始化
    this._init();
  }

  private _init() {
    let self = this;
    $(this.zoom).mousemove((e) => {
      self.fire('move', e.pageX, e.pageY);
    });
  }
}