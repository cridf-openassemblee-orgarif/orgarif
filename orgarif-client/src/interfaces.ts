import { SerializedStyles } from '@emotion/react';

export type EmotionStyles = SerializedStyles;

// TODO to-be-fetched-or-fetching === initial state OR is currently fetching
export type FetchingStatus = 'not-fetched' | 'fetching' | 'fetched';

export type SendLostPasswordMailResponse = 'UNKNOWN_LOGIN' | 'OK';
