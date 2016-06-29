import {Broker} from 'corona-client'
import GameComponent from './../gameComponent/gameComponent'

export default class ControllerContainer {
  static name: string
  components: {
    [key: string]: GameComponent
  }

  constructor(private controller: Broker, private zoom: HTMLDivElement) {
    this.components = {};
  }

  addComponent(key: string, comp: GameComponent) {
    this.components[key] = comp;
  }
}