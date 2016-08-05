import * as React from "react"
import * as $ from 'jquery'
import Zoom from "../zoom/zoom";
import CharacterGameComponent from '../../gameComponent/character'
import {IReactComponents, IReactComponentsState} from '../IReactComponents'

require('./camera.scss');

interface ICameraProps {
  console: React.Component<Object, Object>
}

interface ICameraState extends IReactComponentsState {
  place?: string
}

export default class Camera extends React.Component<ICameraProps, ICameraState> implements IReactComponents {
  camera: HTMLDivElement
  place: HTMLDivElement
  lens: HTMLDivElement
  $camera: JQuery
  $place: JQuery
  $lens: JQuery

  zoom: Zoom

  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      place: 'translate3d(0px, 0px, 0px)'
    }
  }
  initialize(controller, callback?: () => void) {
    let initialized = true;
    let self = this;
    this.zoom.initialize(controller, () => {
      self.setState({
        initialized: initialized
      }, callback);
    });
  }
  // move
  private vectorScale = 10
  handleMove(player: CharacterGameComponent, zoom: Zoom) {
    this.$place.css('transform', `translate3d(${-player.position.x}px, ${-player.position.y}px, 0px)`);
    this.props.console.setState({
      position: {
        x: player.position.x,
        y: player.position.y
      }
    })
  }
  handleStartMove(player: CharacterGameComponent, zoom: Zoom) {
    this.$lens.css('transform', `scale(.9) translate3d(${-player.movingVector[0] * this.vectorScale}px, ${-player.movingVector[1] * this.vectorScale}px, 0px)`);
  }
  handleFinishMove(player: CharacterGameComponent, zoom: Zoom) {
    this.$lens.css('transform', 'scale(1)');
  }
  handleChangeDirection(player: CharacterGameComponent, zoom: Zoom) {
    this.$lens.css('transform', `scale(.9) translate3d(${-player.movingVector[0] * this.vectorScale}px, ${-player.movingVector[1] * this.vectorScale}px, 0px)`);
  }
  render() {
    return (
      <div id="camera" className="lens" ref={(c) => { this.lens = c; this.$lens = $(c) }}>
        <div className="place" ref={(c) => { this.place = c; this.$place = $(c) }} >
          <Zoom ref={(c) => { this.zoom = c }}
            console={this.props.console}
            cameraMove={this.handleMove.bind(this)}
            cameraStartMove={this.handleStartMove.bind(this)}
            cameraFinishMove={this.handleFinishMove.bind(this)}
            cameraChangeDirection={this.handleChangeDirection.bind(this)}
          />
        </div>
      </div>
    );
  }
}