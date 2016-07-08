export interface IEventHandler {
  events: {
    [key: string]: Function[]
  }

  on(eventName: string, callback: Function): void
  fire(eventName: string): any
}

export class EventHandler implements IEventHandler {
  events: {
    [key: string]: Function[]
  } = {}

  on(eventName: string, callback: Function) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  fire(eventName: string, ...args) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        let cb = this.events[eventName][i]
        cb(...args);
      }
    } else {
      console.warn(`There is no event named '${eventName}'`);
    }
  }
}