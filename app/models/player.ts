import {Model, Repository} from 'corona'
import {IPlayer} from './../../interface/IPlayer'


export class Player extends Model<IPlayer>{

}

export class PlayerRepository extends Repository<IPlayer, Player>{

}