import * as React from "react"
import * as $ from 'jquery'
import {IReactComponents, IReactComponentsState} from '../IReactComponents'

interface IBackgroundProps {
  initialized?: boolean,
  layerCount?: number,
}

interface IBackgroundState extends IReactComponentsState {
  layers?: Layer[],
}

type Layer = {
  backgroundPositionX: number,
  backgroundPositionY: number
}


export default class Background extends React.Component<IBackgroundProps, IBackgroundState> implements IReactComponents {

  static defaultProps = {
    initialized: false,
    layerCount: 2
  }

  dom: HTMLDivElement
  layers: HTMLDivElement[] = []
  backgroundImageSize = 1000
  backgroundImagePerspective = 0.8

  constructor(props, context?: any) {
    super(props, context);
    let layers: Layer[] = [];
    for (var i = 0; i < this.props.layerCount; i++) {
      layers.push({
        backgroundPositionX: 0,
        backgroundPositionY: 0
      });
    }
    this.state = {
      initialized: false,
      layers: layers,
    }
  }

  initialize(controller, callback?: () => void) { }

  componentDidMount() {
    let $dom = $(this.dom);
    for (var i = 0; i < this.props.layerCount; i++) {
      let bgsize = Math.pow(this.backgroundImagePerspective, i) * this.backgroundImageSize;
      let $layer = $(`<div class="background-layer" style="opacity: ${(this.props.layerCount - 1 * i) / this.props.layerCount / 2};background-size: ${bgsize}px ${bgsize}px;"></div>`);
      $(this.dom).append($layer);
      this.layers.push($layer[0] as HTMLDivElement);
    }
  }

  // interface
  updatePosition(x: number, y: number) {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].style.backgroundPosition = `${-x * Math.pow(this.backgroundImagePerspective, i)}px ${-y * Math.pow(this.backgroundImagePerspective, i)}px`;
    }
  }

  render() {
    return (
      <div id="background" ref={(c) => this.dom = c }>
      </div>
    );
  }
}