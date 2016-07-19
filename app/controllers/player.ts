import {Controller} from 'corona'
import {Player, PlayerRepository} from './../models/player'
import {IPlayerController} from './../../interface/IPlayerController'
import {ExposedMethod, RandomName} from './../utils/utils';

var playerRepo: PlayerRepository = new PlayerRepository(Player);
var players = playerRepo.toModel();

export class PlayerController extends Controller implements IPlayerController {
    private player: Player;
    private players: any;

    init(params, done) {
        return playerRepo.create({
            position: { x: 0, y: 0},
            color: `rgb(${parseInt((Math.random() * 255).toString())},${parseInt((Math.random() * 255).toString())},${parseInt((Math.random() * 255).toString())})`,
            name: RandomName()
        }).then((player) => {
            this.player = player;
            this.players = players;
            this.players.add(player);
            done();
        }).catch((e) => {
            console.log(e);
        }).timeout(1000);
    }

    @ExposedMethod
    updatePosition(x, y) {
        this.player.set('position.x', x)
        this.player.set('position.y', y);
    }

    @ExposedMethod
    updateName(name) {
        this.player.set('name', name);
    }

    onexit() {
        playerRepo.remove(this.player.id);
        players.remove(this.player);
        this.player.dispose();
        this.player = null;
        this.players = null;
    }
}
