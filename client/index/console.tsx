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
  position?: {
    x: number,
    y: number
  }
  history?: IHistory[]
}

export interface IHistory {
  time: Date,
  event: string,
  key: string,
  content: string,
  who: string,
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
      },
      history: []
    }
  }

  initialize(controller, callback?: () => void) { }

  componentDidMount() {
  }

  addHistory(history: IHistory) {
    let s = this.state.history;
    s.push(history);
    this.setState({
      history: s
    })
  }

  render() {
    return (
      <div id="console">
        <div className="name"><div>{this.state.name}</div></div>
        <div className="position" style={{ display: 'none' }}>x: {this.state.position.x} y: {this.state.position.y}</div>
        <MessageContainer data={this.state.history} />
      </div>
    );
  }
}

interface IMessageContainerProps {
  data: IHistory[]
}

interface IMessageContainerState extends IReactComponentsState {
  hover?: boolean
}


class MessageContainer extends React.Component<IMessageContainerProps, IMessageContainerState> implements IReactComponents {
  dom: HTMLDivElement

  static defaultProps = {
    data: []
  }

  constructor(props, context?: any) {
    super(props, context);
    this.state = {
      initialized: false,
      hover: false,
    }
  }

  initialize(controller, callback?: () => void) { }

  componentDidMount() {
  }

  componentDidUpdate() {
    $(this.dom).scrollTop(Number.MAX_VALUE)
  }

  timeFormat(date: Date) {
    let h = `${date.getHours()}`;
    let m = `${date.getMinutes()}`;
    let s = `${date.getSeconds()}`;
    h = (h.length == 1 ? '0' : '') + h;
    m = (m.length == 1 ? '0' : '') + m;
    s = (s.length == 1 ? '0' : '') + s;
    return `${h}:${m}:${s}`
  }

  render() {
    let classes = 'history' + (this.state.hover ? ' hover' : '');
    return (
      <div className={classes} onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})} ref={(c) => this.dom = c}>
        <div className="container">{
          this.props.data.map((v, i) => (
            <div key={i} className={'message ' + v.key}><span className="time">[{this.timeFormat(v.time) }]</span><span className="event">[{v.event}]</span><span className="who">[{v.who}]</span><span className="content">{v.content}</span></div>
          ))
        }
        </div>
      </div>
    );
  }
}