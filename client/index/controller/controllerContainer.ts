import {Broker} from 'corona-client'
import GameComponent from './../gameComponent/gameComponent'
import {IEventHandler, Events} from './../utils/IEventHandler'

export default class ControllerContainer implements IEventHandler {
  name = ''
  initialized = false;
  events: {
    [key: string]: Function[]
  } = {}

  components: {
    [key: string]: GameComponent
  } = {}

  constructor(protected controller: Broker, protected zoom: HTMLDivElement) {

  }

  addComponent(key: string, comp: GameComponent) {
    this.components[key] = comp;
    comp.on('initialize', this.handleInitialize);
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

  // events
  @Events('initialize')
  on(eventName: string, callback: Function) {
    this.events[eventName].push(callback);
  }

  @Events('initialize')
  fire(eventName: string, ...args) {
    for (var i = 0; i < this.events[eventName].length; i++) {
      this.events[eventName][i](...args);
    }
  }
}