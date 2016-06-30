export interface IEventHandler {
  events: {
    [key: string]: Function[]
  }

  on(eventName: string, callback: Function): void
}

export function Events(...eventNames: string[]) {
  eventNames = eventNames.map((n) => n.toLowerCase());

  return function ExposedMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    for (var i = 0; i < eventNames.length; i++) {
      var e = eventNames[i];
      e = e.replace(/^\S/, (s) => s.toUpperCase());
      if (!target['on' + e]) {
        target['on' + e] = ((name) => function (callback: Function) {
          this.on(name, callback);
        })(e);
      }
    }

    return {
      value: function (eventName: string, callback: Function) {
        eventName = eventName.toLowerCase();
        if (eventNames.indexOf(eventName) == -1) {
          throw "This object have no event named " + eventName;
        }
        if (!this.events[eventName]) {
          this.events[eventName] = []
        }
        var result = descriptor.value.apply(this, [eventName, callback]);
        return result;
      }
    }
  }
}
