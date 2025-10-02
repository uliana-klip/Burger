import { getAccessToken } from '@/utils/auth-tokens';

import {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} from './web-socket/feed-slice';
import {
  wsProfileClose,
  wsProfileConnect,
  wsProfileDisconnect,
  wsProfileError,
  wsProfileMessage,
  wsProfileOpen,
} from './web-socket/profile-slice';

import type { Middleware } from '@reduxjs/toolkit';

import type { AppDispatch } from './store';

let feedWS: WebSocket | null = null;
let profileWS: WebSocket | null = null;
const WsURL = 'wss://norma.nomoreparties.space/orders';

const connectFeedEvent = (ws: WebSocket, dispatch: AppDispatch): void => {
  ws.onopen = (): void => {
    dispatch(wsFeedOpen());
  };
  ws.onmessage = (event): void => {
    const wsData = JSON.parse(event.data);
    const { orders, total, totalToday } = wsData;
    dispatch(wsFeedMessage({ orders, total, totalToday }));
  };
  ws.onerror = (): void => {
    dispatch(wsFeedError('ws error'));
  };
  ws.onclose = (): void => {
    dispatch(wsFeedClose());
  };
};

const connectProfileEvent = (ws: WebSocket, dispatch: AppDispatch): void => {
  ws.onopen = (): void => {
    dispatch(wsProfileOpen());
  };
  ws.onmessage = (event): void => {
    const wsData = JSON.parse(event.data);
    if (
      wsData?.success === false &&
      typeof wsData?.message === 'string' &&
      wsData.message.toLowerCase().includes('invalid or missing token')
    ) {
      dispatch(wsProfileError(wsData.message));
      ws.close();
      return;
    }
    dispatch(wsProfileMessage(wsData));
  };
  ws.onerror = (): void => {
    dispatch(wsProfileError('ws error'));
  };
  ws.onclose = (): void => {
    dispatch(wsProfileClose());
  };
};

const customMiddleware: Middleware =
  (store) =>
  (next) =>
  (action: unknown): unknown => {
    const { dispatch } = store;

    const _action = action as { type: string };

    switch (_action.type) {
      case wsFeedConnect.type: {
        if (feedWS) {
          try {
            feedWS.close();
          } catch (err) {
            console.log(err);
          }
          feedWS = null;
        }
        const url = `${WsURL}/all`;
        feedWS = new WebSocket(url);
        connectFeedEvent(feedWS, dispatch);
        break;
      }
      case wsFeedDisconnect.type: {
        if (feedWS) {
          try {
            feedWS.close();
          } catch (err) {
            console.log(err);
          }
          feedWS = null;
        }
        break;
      }

      case wsProfileConnect.type: {
        if (profileWS) {
          try {
            profileWS.close();
          } catch (err) {
            console.log(err);
          }
          profileWS = null;
        }
        const token = getAccessToken();
        if (!token) {
          dispatch(wsProfileError('no access token'));
          break;
        }
        const url = `${WsURL}?token=${encodeURIComponent(token)}`;
        profileWS = new WebSocket(url);
        connectProfileEvent(profileWS, dispatch);
        break;
      }
      case wsProfileDisconnect.type: {
        if (profileWS) {
          try {
            profileWS.close();
          } catch (err) {
            console.log(err);
          }
          profileWS = null;
        }
        break;
      }
    }
    return next(action);
  };
export default customMiddleware;
