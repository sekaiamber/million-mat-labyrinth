import {Broker} from 'corona-client'
import GameComponent from './../gameComponent/gameComponent'

export default class ControllerContainer {
  name = ''

  components: {
    [key: string]: GameComponent
  }

  constructor(protected controller: Broker, protected zoom: HTMLDivElement) {
    this.components = {};
  }

  addComponent(key: string, comp: GameComponent) {
    this.components[key] = comp;
  }
}