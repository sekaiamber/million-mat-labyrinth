import * as React from "react"
import * as $ from 'jquery'
import {Client} from 'corona-client'
import {IReactComponents, IReactComponentsState} from './IReactComponents'

require('./console.scss');

interface IConsoleProps {
  initialized?: boolean
}

interface IConsoleState extends IReactComponentsState {
  name?: string,
  position: {
    x: number,
    y: number
  }
}

export default class Console extends React.Component<IConsoleProps, IConsoleState> implements IReactComponents {

  static defaultProps = {
    initialized: false
  }

  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      initialized: false,
      name: '',
      position: {
        x: 0,
        y: 0
      }
    }
  }

  initialize(controller, callback?: () => void) {}

  componentDidMount() {
  }

  render() {
    return (
      <div id="console">
        <div className="name">{this.state.name}</div>
        <div className="position">x: {this.state.position.x} y: {this.state.position.y}</div>
      </div>
    );
  }
}
