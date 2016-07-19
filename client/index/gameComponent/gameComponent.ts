import {ModelProxy} from 'corona-client'
import { EventHandler } from './../utils/EventHandler'

export default class GameComponent extends EventHandler {
  name = ''
  initialized = false;

  constructor(public model: ModelProxy, public zoom: HTMLDivElement) {
    super()
  }

  updateModel(model: ModelProxy) {
    this.model = model;
  }

  destroy() {
    this.fire('destroy');
  }

}