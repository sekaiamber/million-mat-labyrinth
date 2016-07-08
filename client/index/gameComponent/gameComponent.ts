import {ModelProxy} from 'corona-client'
import { EventHandler } from './../utils/EventHandler'

export default class GameComponent extends EventHandler {
  name = ''
  initialized = false;

  constructor(protected model: ModelProxy, protected zoom: HTMLDivElement) {
    super()
  }

}