// @flow

declare type ActionType = 'SET_PROFILE_SEARCH_TERM' | 'SET_FIREBASE_CUSTOM_AUTH_TOKEN';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action = ActionT<'SET_PROFILE_SEARCH_TERM', string> | ActionT<'SET_FIREBASE_CUSTOM_AUTH_TOKEN', string>;
