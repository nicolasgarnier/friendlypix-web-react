// @flow

declare type FirebaseActionType = 'SET_CURRENT_USER' | 'SET_AUTH_READY' | 'SET_ID_TOKEN' | 'SET_FIREBASE_INSTANCE';

declare type FirebaseActionT<A: FirebaseActionType, P> = {|
  type: A,
  payload: P
|};

export type FirebaseAction = FirebaseActionT<'SET_CURRENT_USER', Object>
  | FirebaseActionT<'SET_AUTH_READY', boolean>
  | FirebaseActionT<'SET_ID_TOKEN', string>
  | FirebaseActionT<'SET_FIREBASE_INSTANCE', Object>;
