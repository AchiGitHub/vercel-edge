import { AddSpecialMovePlayer, Player, SetSpecialMovePlayerTimer } from "types/store-types";

interface InputParams {
    player?: Player;
    time: number;
    addPlayer: (params: AddSpecialMovePlayer) => void;
    setTimer: (params: SetSpecialMovePlayerTimer) => void;
}

export const startTimer = ({ player, time, addPlayer, setTimer }: InputParams) => {

    let timer = 300;

    const id = setInterval(() => {
        setTimer({ playerId: player?.personId, time: timer })
        if (timer === 0 || timer < 0) clearInterval(id);
        timer = timer - 1;
    }, 1000);
    addPlayer({
        player: player,
        timerId: id,
        quarterTime: time
    });

}