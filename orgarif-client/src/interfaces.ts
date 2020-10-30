import { SerializedStyles } from '@emotion/core';
import { OrgarifId } from './domain/id';

export type EmotionStyles = SerializedStyles;

export type Dict<K extends OrgarifId | string, T> = Record<
  // @ts-ignore
  K,
  T | undefined
>;

// to-be-fetched-or-fetching === état initial OU fetching en cours. Pas d'intêrét de les séparer pour le moment, les
// choses concernées (objectif à l'écriture de ces lignes) sont fetchées directement au lancement de la vue qui les
// concerne
export type FetchingStatus = 'not-fetched' | 'fetching' | 'fetched';

export type SendLostPasswordMailResponse = 'UNKNOWN_LOGIN' | 'OK';
