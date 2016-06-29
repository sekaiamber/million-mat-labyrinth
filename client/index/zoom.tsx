import * as React from "react"
import {Client} from 'corona-client'
import {IPlayer} from './../../interface/IPlayer'
import {IPlayerController} from './../../interface/IPlayerController'

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
  controller: IPlayerController
  you: string

  zoom: HTMLDivElement
  
  constructor(props: {}, context?: any) {
    super(props, context);
    this.state = {
      initialized: false,
      players: {},
    };
  }
  componentDidMount() {
    var self = this;
    // 链接Corona
    var client = new Client('/players', function (controller) {
      controller.getModels('players', 'player').then(([players, player]) => {
        // 设置本身
        self.you = player.data._id;
        console.log(player.data);
        // 初始化已有鼠标
        self.state.players = players.dataMap;
        // 更新位置
        players.on('*.change', () => { self.updateMouses() })
        // 新增鼠标
        .on('add', () => { self.updateMouses() })
        // 删除鼠标
        .on('remove', () => { self.updateMouses() });
        // 初始化组件
        self.initialize();
      });
      self.controller = controller;
    });
    this.client = client;
  }
  initialize(callback?: () => void) {
    this.setState({
      initialized: true
    }, callback);
  }
  updateMouses(mouses?: PlayerMap, callback?: () => void) {
    mouses = mouses || this.state.players;
    this.setState({
      players: mouses
    }, callback)
  }
  handleMouseMove(e: React.MouseEvent) {
    if (this.state.initialized) {
      // TODO 向Corona更新自身位置
      this.controller.updatePosition(e.pageX, e.pageY);
    }
  }
  render() {
    return (
      <div className="mouse-pool" onMouseMove={this.handleMouseMove.bind(this) } ref={(c) => this.zoom = c}>
        {
          this.state.initialized ? null :
            <div className="loading">Loading...</div>
        }
        {
          Object.keys(this.state.players).map(key => {
            return <div className="mouse iconfont icon-shubiao" style={{ left: this.state.players[key].position.x, top: this.state.players[key].position.y, color: this.state.players[key].color }} key={key}></div>
          })
        }
      </div>
    );
  }
}