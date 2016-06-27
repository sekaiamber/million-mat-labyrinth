export default class GameComponent<C, D> {
  // members
  dataMap: {
    [id: string]: D
  }
  controller: C
  name: string

  constructor(controller: C) {
    
  }

  update(): void {

  }

  add(data: D): void {

  }

  remove(id: string): void {

  }
}