import * as React from "react"
import * as $ from 'jquery'
import Zoom from "./zoom";
import CharacterGameComponent from './gameComponent/character'

require('./camera.scss');

interface ICameraState {
  place?: string
}

export default class Camera extends React.Component<Object, ICameraState> {
  camera: HTMLDivElement
  place: HTMLDivElement
  lens: HTMLDivElement
  $camera: JQuery
  $place: JQuery
  $lens: JQuery

  constructor(props: Object, context?: any) {
    super(props, context);
    this.state = {
      place: 'translate3d(0px, 0px, 0px)'
    }
  }
  // move
  private vectorScale = 10
  handleMove(player: CharacterGameComponent, zoom: Zoom) {
    this.$place.css('transform', `translate3d(${-player.position.x}px, ${-player.position.y}px, 0px)`);
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
          <Zoom
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