export interface IEventHandler {
  events: {
    [key: string]: Function[]
  }

  on(eventName: string, callback: Function): void
  fire(eventName: string): any
}

export function Events(...eventNames: string[]) {
  eventNames = eventNames.map((n) => n.toLowerCase());

  return function ExposedMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    for (var i = 0; i < eventNames.length; i++) {
      var e = eventNames[i];
      e = e.replace(/^\S/, (s) => s.toUpperCase());
      if (!target[propertyKey + e]) {
        target[propertyKey + e] = ((name) => function (...args) {
          this.on(name, ...args);
        })(e);
      }
    }

    return {
      value: function (...args) {
        let eventName = args[0].toLowerCase();
        if (eventNames.indexOf(eventName) == -1) {
          throw "This object have no event named " + eventName;
        }
        if (!this.events[eventName]) {
          this.events[eventName] = []
        }
        var result = descriptor.value.apply(this, args);
        return result;
      }
    }
  }
}
