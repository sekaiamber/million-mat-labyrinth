import {Controller} from 'corona'
import {Player, PlayerRepository} from './../models/player'
import {IPlayerController} from './../../interface/IPlayerController'

var playerRepo: PlayerRepository = new PlayerRepository(Player);
var players = playerRepo.toModel();

export class PlayerController extends Controller implements IPlayerController {
    private player: Player;
    private players: any;

    init(params, done) {
        this.expose('updatePosition');
        return playerRepo.create({
            position: { x: 0, y: 0},
            color: `rgb(${parseInt((Math.random() * 255).toString())},${parseInt((Math.random() * 255).toString())},${parseInt((Math.random() * 255).toString())})`
        }).then((player) => {
            this.player = player;
            this.players = players;
            this.players.add(player);
            done();
        }).catch((e) => {
            console.log(e);
        }).timeout(1000);
    }

    updatePosition(x, y) {
        this.player.set('position.x', x)
        this.player.set('position.y', y);
    }

    onexit() {
        playerRepo.remove(this.player.id);
        players.remove(this.player);
        this.player.dispose();
        this.player = null;
        this.players = null;
    }
}
