type Say = {
    message: string,
    time: number,
    to?: number
}

export interface IPlayer {
    position: {
        x: number,
        y: number
    },
    color: string,
    _id?: number,
    name: string,
    say: Say
}