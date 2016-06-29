import {ModelProxy} from 'corona-client'
import GameComponent from './gameComponent';

export default class PlayerGameComponent extends GameComponent {
  static name = 'player';

  constructor(model: ModelProxy, zoom: HTMLDivElement) {
    super(model, zoom);
  }


}