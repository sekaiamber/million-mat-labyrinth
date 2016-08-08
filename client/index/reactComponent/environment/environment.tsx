import * as React from "react"
import * as $ from 'jquery'
import {IReactComponents, IReactComponentsState} from '../IReactComponents'
import Background from './background'

require('./environment.scss');

interface IEnvironmentProps {
  initialized?: boolean
}

interface IEnvironmentState extends IReactComponentsState {
}


export default class Environment extends React.Component<IEnvironmentProps, IEnvironmentState> implements IReactComponents {

  background: Background

  static defaultProps = {
    initialized: false
  }

  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      initialized: false,
    }
  }

  initialize(controller, callback?: () => void) { }

  componentDidMount() {
  }
  // interface
  updatePlayerPosition(x: number, y: number) {
    this.background.updatePosition(x, y);
  }

  render() {
    return (
      <div id="environment">
        <Background ref={(c) => this.background = c }/>
      </div>
    );
  }
}