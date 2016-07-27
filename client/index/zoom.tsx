import * as React from "react"
import {Client} from 'corona-client'
import {IPlayer} from './../../interface/IPlayer'
import PlayerControllerContainer from './controller/player'
import PlayerGameComponent from './gameComponent/player'
import ControllerContainer from './controller/controllerContainer'
import CharacterGameComponent from './gameComponent/character'
import {IReactComponents, IReactComponentsState} from './IReactComponents'
import Console from './console'

require('./zoom.scss');

type PlayerMap = {
  [id: string]: IPlayer
}

interface IZoomState extends IReactComponentsState {
  players?: PlayerMap,
  camera?: string
}

interface IZoomProps {
  console: Console
  // camera
  cameraMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraStartMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraFinishMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraChangeDirection?: (player: CharacterGameComponent, zoom: Zoom) => void
}

export default class Zoom extends React.Component<IZoomProps, IZoomState> implements IReactComponents {
  // Corona Client
  controller

  zoom: HTMLDivElement
  containers: {
    [id: string]: ControllerContainer
  }
  
  constructor(props, context?: any) {
    super(props, context);
    this.containers = {};
    this.state = {
      initialized: false,
      players: {},
      camera: 'translate3d(0px, 0px, 0px)'
    };
  }
  componentDidMount() {
  }
  initialize(controller, callback?: () => void) {
    let self = this;
    let CPlayer = new PlayerControllerContainer(controller, this.zoom);
    CPlayer.on('initialize', () => {
      let initialized = true;
      // console
      self.updateConsole({
        name: CPlayer.character.model.data.name
      });
      Object.keys(self.containers).map((k) => {
        initialized = initialized && self.containers[k].initialized;
      });
      if (initialized) {
        self.setState({
          initialized: initialized
        }, callback);
      } else {
        self.setState({
          initialized: initialized
        });
      }
    });
    // move
    CPlayer.on('characterMove', this.characterMove.bind(this));
    CPlayer.on('characterStartMove', this.characterStartMove.bind(this));
    CPlayer.on('characterFinishMove', this.characterFinishMove.bind(this));
    CPlayer.on('characterChangeDirection', this.characterChangeDirection.bind(this));
    // say
    CPlayer.on('characterSay', this.characterSay.bind(this));
    CPlayer.on('playerSay', this.playerSay.bind(this));
    // player
    CPlayer.on('playerEnterRoom', this.playerEnterRoom.bind(this));
    CPlayer.on('playerLeaveRoom', this.playerLeaveRoom.bind(this));
    this.controller = controller;
  }
  // console
  updateConsole(state) {
    this.props.console.setState(state);
  }
  // move
  characterMove(player: CharacterGameComponent) {
    this.props.cameraMove(player, this);
  }
  characterStartMove(player: CharacterGameComponent) {
    this.props.cameraStartMove(player, this);
  }
  characterFinishMove(player: CharacterGameComponent) {
    this.props.cameraFinishMove(player, this);
  }
  characterChangeDirection(player: CharacterGameComponent) {
    this.props.cameraChangeDirection(player, this);
  }
  // say
  characterSay(msg) {
    this.props.console.addHistory({
      time: new Date(),
      event: '房间',
      key: 'say character',
      content: msg,
      who: '你',
    });
  }
  playerSay(player: PlayerGameComponent, msg) {
    this.props.console.addHistory({
      time: new Date(player.model.data.say.time),
      event: '房间',
      key: 'say player',
      content: msg,
      who: player.model.data.name,
    });
  }
  // player
  playerEnterRoom(player: PlayerGameComponent) {
    this.props.console.addHistory({
      time: new Date(),
      event: '系统',
      key: 'system info',
      content: `${player.model.data.name} 进入了房间`,
      who: '消息',
    });
  }
  playerLeaveRoom(player: PlayerGameComponent) {
    this.props.console.addHistory({
      time: new Date(),
      event: '系统',
      key: 'system info',
      content: `${player.model.data.name} 离开了房间`,
      who: '消息',
    });
  }
  render() {
    return (
      <div className="space" ref={(c) => this.zoom = c} style={{transform: this.state.camera}}>
        {
          this.state.initialized ? null :
            <div className="loading">Loading...</div>
        }
      </div>
    );
  }
}