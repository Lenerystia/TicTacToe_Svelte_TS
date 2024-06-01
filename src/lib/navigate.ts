import { goto } from "$app/navigation";

export function toMenu(){
    goto('/');
}
export function toTwoPlay(){
    goto('twoPlayers')
}
export function toVsComp(){
    goto('vsComp')
}