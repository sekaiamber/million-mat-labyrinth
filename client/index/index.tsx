import * as React from "react"
import * as $ from 'jquery'
import {Client} from 'corona-client'

import Camera from "./camera";

require('./index.scss');

export default class Index extends React.Component<Object, Object> {
  // corona
  client: Client

  // components
  camera: Camera

  constructor(props: Object, context?: any) {
    super(props, context);
    this.state = {}
  }
  componentDidMount() {
    var self = this;
    // 链接Corona
    var client = new Client('/players', function (controller) {
      self.camera.initialize(controller);
      // let CPlayer = new PlayerControllerContainer(controller, self.zoom);
      // CPlayer.on('initialize', self.initialize.bind(self));
      // // move
      // CPlayer.on('characterMove', self.characterMove.bind(self));
      // CPlayer.on('characterStartMove', self.characterStartMove.bind(self));
      // CPlayer.on('characterFinishMove', self.characterFinishMove.bind(self));
      // CPlayer.on('characterChangeDirection', self.characterChangeDirection.bind(self));
      // self.controller = controller;
    });
    this.client = client;
  }
  render() {
    return (
      <div id="index">
        <Camera ref={(c) => this.camera = c}/>
      </div>
    );
  }
}