import type { AppDispatch } from '../../store/store.ts';
import { removeActiveCard } from '../../store/activeCards.ts';
import { updateActiveMove } from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
export default function getOnClickForCard(idOfCard: number, webSocket: WebSocket, userId: number, dispatch: AppDispatch) {
  return (event: Event) => {
    if (webSocket.readyState == WebSocket.OPEN) {
      let arrayToSend: Uint8Array = new Uint8Array(2);
      arrayToSend[0] = userId;
      arrayToSend[1] = idOfCard;
      webSocket.send(arrayToSend);
    }
    dispatch(removeActiveCard(idOfCard));
    dispatch(updateActiveMove(idOfCard, USER_1));
  };
}