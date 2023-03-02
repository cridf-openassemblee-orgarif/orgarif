import { SerializedStyles } from '@emotion/react';

export type EmotionStyles = SerializedStyles;

// TODO[tmpl] to-be-fetched-or-fetching === initial state OR is currently fetching
// export type FetchingStatus = 'not-fetched' | 'fetching' | 'fetched';
export type LoadingState = 'idle' | 'loading' | 'error';

export type SendLostPasswordMailResponse = 'UNKNOWN_LOGIN' | 'OK';
