/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
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
