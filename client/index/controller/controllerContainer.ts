import {Broker} from 'corona-client'
import GameComponent from './../gameComponent/gameComponent'
import { EventHandler} from './../utils/EventHandler'

export default class ControllerContainer extends EventHandler {
  name = ''
  initialized = false;

  components: {
    [key: string]: GameComponent
  } = {}

  constructor(protected controller: Broker, protected zoom: HTMLDivElement) {
    super();
  }

  addComponent(key: string, comp: GameComponent) {
    this.components[key] = comp;
    comp.on('initialize', this.handleInitialize);
  }

  removeComponent(key: string, callback?: (comp: GameComponent) => void) {
    if (this.components[key]) {
      let comp = this.components[key];
      if (callback) {
        callback(comp);
      }
      comp.destroy();
      delete this.components[key];
    }
  }

  // initialize
  protected handleInitialize() {
    let self = this;
    this.initialized = true;
    Object.keys(this.components).map((k) => {
      self.initialized = self.initialized && self.components[k].initialized;
    });
    if (this.initialized) {
      this.fire('initialize');
    }
  }

}