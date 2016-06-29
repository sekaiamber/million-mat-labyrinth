import {Controller} from 'corona'

export function ExposedMethod(target: Controller, propertyKey: string, descriptor: PropertyDescriptor) {
  // target.expose(propertyKey);
  // console.log(target);
  let init = target.init;
  
  target.init = function (...args) {
    this.expose(propertyKey)
    return init.apply(this, args);
  }
  return {
    value: function (...args: any[]) {
      var result = descriptor.value.apply(this, args);
      return result;
    }
  }
}