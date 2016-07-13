import * as React from "react"
import {Client} from 'corona-client'
import {IPlayer} from './../../interface/IPlayer'
import PlayerControllerContainer from './controller/player'
import ControllerContainer from './controller/controllerContainer'

require('./zoom.scss');

type PlayerMap = {
  [id: string]: IPlayer
}

interface IZoomState {
  players?: PlayerMap,
  initialized?: boolean
}

export default class Zoom extends React.Component<{}, IZoomState> {
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
    };
  }
  componentDidMount() {
    var self = this;
    // 链接Corona
    var client = new Client('/players', function (controller) {
      let CPlayer = new PlayerControllerContainer(controller, self.zoom);
      CPlayer.on('initialize', self.initialize.bind(self));
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
  render() {
    return (
      <div className="mouse-pool" ref={(c) => this.zoom = c}>
        {
          this.state.initialized ? null :
            <div className="loading">Loading...</div>
        }
      </div>
    );
  }
}