import { SerializedStyles } from '@emotion/react';

export type EmotionStyles = SerializedStyles;

// TODO[tmpl] to-be-fetched-or-fetching === initial state OR is currently fetching
// export type FetchingStatus = 'not-fetched' | 'fetching' | 'fetched';
export type LoadingState = 'Idle' | 'Loading' | 'Error';

export type SendLostPasswordMailResponse = 'UnknownLogin' | 'Ok';
