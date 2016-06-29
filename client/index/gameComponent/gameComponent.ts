import {ModelProxy} from 'corona-client'

export default class GameComponent {
  static name: string

  constructor(private model: ModelProxy, private zoom: HTMLDivElement) {
    
  }

}