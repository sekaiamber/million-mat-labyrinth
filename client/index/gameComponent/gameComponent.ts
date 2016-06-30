import {ModelProxy} from 'corona-client'
import {IEventHandler, Events} from './../utils/IEventHandler'

export default class GameComponent implements IEventHandler {
  name = ''
  initialized = false;
  events: {
    [key: string]: Function[]
  }

  constructor(private model: ModelProxy, private zoom: HTMLDivElement) {
    this.events = {}
  }

  @Events('click', 'Init')
  on(eventName: string, callback: Function) {
    console.log(eventName);
    this.events[eventName].push(callback);
  }
}