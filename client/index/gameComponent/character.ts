import PlayerGameComponent from './player'

export default class CharacterGameComponent extends PlayerGameComponent {
  name = 'character'

  constructor(model, zoom) {
    super(model, zoom);
    this.on('move', this.move.bind(this));
  }

  move(x: number, y: number) {
    this.updatePosition(x, y);
  }
}