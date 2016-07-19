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
  players: {
    [id: string]: PlayerGameComponent
  } = {}

  constructor(protected controller: IPlayerController, zoom: HTMLDivElement) {
    super(controller, zoom);
    let self = this;
    controller.getModels('players', 'player')
      .then(([players, player]) => {
        // set character
        self.initCharacter(player, zoom);
        // set other players
        self.initPlayers(players, zoom);

        self.fire('initialize', self);
      })
  }

  initCharacter(player, zoom) {
    let character = new CharacterGameComponent(player, zoom);
    this.character = character;
    this.addComponent(player.data._id, this.character);
    // 绑定移动
    this.character.on('move', (x, y, p) => {
      this.controller.updatePosition(x, y)
      this.fire('characterMove', p)
    });
    this.character.on('startMove', (p) => {
      this.fire('characterStartMove', p);
    });
    this.character.on('finishMove', (p) => {
      this.fire('characterFinishMove', p);
    });
    this.character.on('changeDirection', (p) => {
      this.fire('characterChangeDirection', p);
    })
  }

  initPlayers(players, zoom) {
    Object.keys(players.data).map((k) => {
      if (k != this.character.id.toString()) {
        let p = new PlayerGameComponent(players.data[k], zoom);
        this.addComponent(k, p);
        this.players[k] = p;
      }
    });
    let self = this;
    // 绑定移动
    players.on('*.change', (id) => {
      if (self.players[id]) {
        self.players[id].updatePosition();
      }
    });
    // 新增玩家
    players.on('add', (id) => {
      players.getModel(id.toString()).then((model) => {
        if (self.components[id]) {
          let p = self.components[id];
          p.updateModel(model);
        } else {
          let p = new PlayerGameComponent(model, zoom);
          self.addComponent(id, p);
          self.players[id] = p;
        }
      })
    });
    // 删除玩家
    players.on('remove', (id) => {
      self.removeComponent(id);
    });

  }


}