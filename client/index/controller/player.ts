import {Broker} from 'corona-client'
import ControllerContainer from './controllerContainer'
import PlayerGameComponent from './../gameComponent/player'
import CharacterGameComponent from './../gameComponent/character'
import {IPlayerController} from './../../../interface/IPlayerController'

export default class PlayerControllerContainer extends ControllerContainer {
  // base infor
  name = 'player'
  // private members
  character: CharacterGameComponent

  constructor(protected controller: IPlayerController, zoom: HTMLDivElement) {
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

        self.fire('initialize');
      })
  }

  initCharacter(player, zoom) {
    let character = new CharacterGameComponent(player, zoom);
    this.character = character;
    this.addComponent(player.data._id, this.character);
    // 绑定移动
    this.character.on('move', this.controller.updatePosition);
  }


}