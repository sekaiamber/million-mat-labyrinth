import {Broker} from 'corona-client'
import ControllerContainer from './controllerContainer'
import PlayerGameComponent from './../gameComponent/player'
import CharacterGameComponent from './../gameComponent/character'

export default class PlayerControllerContainer extends ControllerContainer {
  character: CharacterGameComponent

  constructor(controller: Broker, zoom: HTMLDivElement) {
    super(controller, zoom);
    let self = this;
    controller.getModels('players', 'player')
      .then(([players, player]) => {
        // set character
        this.character = new CharacterGameComponent(player, zoom);
        // this.addComponent(player.data.)
        // set other players
        
      })
  }


}