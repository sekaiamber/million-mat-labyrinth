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
    layerCount: 1
  }

  dom: HTMLDivElement
  layers: HTMLDivElement[] = []

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
      let $layer = $(`<div class="background-layer" style="transform: perspective(500px) translate3d(0px, 0px, -${300 * i}px); opacity: ${(this.props.layerCount - 1 * i) / this.props.layerCount / 2}"></div>`);
      $(this.dom).append($layer);
      this.layers.push($layer[0] as HTMLDivElement);
    }
  }

  // interface
  updatePosition(x: number, y: number) {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].style.backgroundPosition = `${-x}px ${-y}px`;
    }
  }

  render() {
    return (
      <div id="background" ref={(c) => this.dom = c }>
      </div>
    );
  }
}