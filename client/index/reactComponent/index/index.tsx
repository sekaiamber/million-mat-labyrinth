import * as React from "react"
import * as $ from 'jquery'
import {Client} from 'corona-client'
import {IReactComponents, IReactComponentsState} from '../IReactComponents'

import Camera from "../camera/camera"
import Console from "../console/console"

require('./index.scss');

interface IIndexState extends IReactComponentsState {
  console?: Console
}

export default class Index extends React.Component<Object, IIndexState> implements IReactComponents {
  // corona
  client: Client

  // components
  camera: Camera
  console: Console

  constructor(props: Object, context?: any) {
    super(props, context);
    this.state = {
      initialized: false
    }
  }

  initialize(controller, callback?: () => void) {}

  componentDidMount() {
    var self = this;
    // 链接Corona
    var client = new Client('/players', function (controller) {
      self.camera.initialize(controller, () => {
        self.setState({
          initialized: true
        })
      });
    });
    this.setState({
      console: this.console
    })
    this.client = client;
  }
  render() {
    return (
      <div id="index">
        <Console ref={(c) => this.console = c} initialized={this.state.initialized}/>
        <Camera ref={(c) => this.camera = c} console={this.state.console}/>
      </div>
    );
  }
}