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
    });

    // 绑定喊话
    this.character.on('say', (msg) => {
      this.controller.say(msg);
      this.fire('characterSay', msg);
    })
  }

  initPlayers(players, zoom) {
    Object.keys(players.data).map((k) => {
      if (k != this.character.id.toString()) {
        this.initNewPlayer(k, players.data[k], zoom);
      }
    });
    let self = this;
    players.on('*.change', (id, key: string) => {
      if (self.players[id]) {
        // 绑定移动
        if (key.indexOf('position') == 0) {
          self.players[id].updatePosition();
        } else if (key.indexOf('say') == 0) {
          self.players[id].saying();
        }
      }
    });
    // 新增玩家
    players.on('add', (id) => {
      players.getModel(id.toString()).then((model) => {
        if (self.components[id]) {
          let p = self.components[id];
          p.updateModel(model);
        } else {
          let p = self.initNewPlayer(id, model, zoom);
          self.fire('playerEnterRoom', p);
        }
      });
    });
    // 删除玩家
    players.on('remove', (id) => {
      self.removeComponent(id, (comp) => {
        self.fire('playerLeaveRoom', comp);
      });
    });

  }

  initNewPlayer(id, model, zoom) {
    let self = this;
    let p = new PlayerGameComponent(model, zoom);
    p.on('say', (msg) => {
      self.fire('playerSay', p, msg);
    })
    this.addComponent(id, p);
    this.players[id] = p;
    return p;
  }


}