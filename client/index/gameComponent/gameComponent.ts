import {ModelProxy} from 'corona-client'
import {IEventHandler, Events} from './../utils/IEventHandler'

export default class GameComponent implements IEventHandler {
  name = ''
  initialized = false;
  events: {
    [key: string]: Function[]
  } = {}

  constructor(private model: ModelProxy, private zoom: HTMLDivElement) {
  }

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