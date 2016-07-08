import {Broker} from 'corona-client'
import ControllerContainer from './controllerContainer'
import PlayerGameComponent from './../gameComponent/player'
import CharacterGameComponent from './../gameComponent/character'
import {IPlayerController} from './../../../interface/IPlayerController'

export default class PlayerControllerContainer extends ControllerContainer {
  name = 'player'
  character: CharacterGameComponent

  constructor(controller, zoom: HTMLDivElement) {
    super(controller, zoom);
    let self = this;
    controller.getModels('players', 'player')
      .then(([players, player]) => {
        // set character
        self.initCharacter(player, zoom);
        // set other players
        Object.keys(players.data).map((k) => {
          if (k != self.character.id.toString()) {
            let p = new CharacterGameComponent(players.data[k], zoom);
            self.addComponent(k, p);
          }
        });

        this.character.fire('move', 100, 200);
        self.fire('initialize');
      })
  }

  initCharacter(player, zoom) {
    let character = new CharacterGameComponent(player, zoom);
    this.character = character;
    this.addComponent(player.data._id, this.character);
  }


}