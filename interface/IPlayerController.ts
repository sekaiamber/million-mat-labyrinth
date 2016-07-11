import {Broker} from 'corona-client'

export interface IPlayerController extends Broker {
  updatePosition(x: number, y: number): void;
}