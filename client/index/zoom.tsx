import * as React from "react"
import {Client} from 'corona-client'
import {IPlayer} from './../../interface/IPlayer'
import PlayerControllerContainer from './controller/player'
import ControllerContainer from './controller/controllerContainer'
import CharacterGameComponent from './gameComponent/character'

require('./zoom.scss');

type PlayerMap = {
  [id: string]: IPlayer
}

interface IZoomState {
  players?: PlayerMap,
  initialized?: boolean,
  camera?: string
}

interface IZoomProps {
  // camera
  cameraMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraStartMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraFinishMove?: (player: CharacterGameComponent, zoom: Zoom) => void
  cameraChangeDirection?: (player: CharacterGameComponent, zoom: Zoom) => void
}

export default class Zoom extends React.Component<IZoomProps, IZoomState> {
  // Corona Client
  client: Client
  controller

  zoom: HTMLDivElement
  containers: {
    [id: string]: ControllerContainer
  }
  
  constructor(props: {}, context?: any) {
    super(props, context);
    this.containers = {};
    this.state = {
      initialized: false,
      players: {},
      camera: 'translate3d(0px, 0px, 0px)'
    };
  }
  componentDidMount() {
    var self = this;
    // 链接Corona
    var client = new Client('/players', function (controller) {
      let CPlayer = new PlayerControllerContainer(controller, self.zoom);
      CPlayer.on('initialize', self.initialize.bind(self));
      // move
      CPlayer.on('characterMove', self.characterMove.bind(self));
      CPlayer.on('characterStartMove', self.characterStartMove.bind(self));
      CPlayer.on('characterFinishMove', self.characterFinishMove.bind(self));
      CPlayer.on('characterChangeDirection', self.characterChangeDirection.bind(self));
      self.controller = controller;
    });
    this.client = client;
  }
  initialize(callback?: () => void) {
    let initialized = true;
    Object.keys(this.containers).map((k) => {
      initialized = initialized && this.containers[k].initialized;
    })
    this.setState({
      initialized: initialized
    }, callback);
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