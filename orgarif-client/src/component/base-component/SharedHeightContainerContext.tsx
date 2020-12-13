/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { ClientUid } from '../../domain/client-id';
import { Dict, dictValues, getOrNull, set } from '../../utils/nominal-class';
import { compareByNumber } from '../../utils';

export interface SharedHeightContextInterface {
  getHeights: (
    groupId: ClientUid,
    componentId: ClientUid
  ) => {
    groupHeight?: number;
    componentHeight?: number;
  };
  pushHeight: (
    groupId: ClientUid,
    componentId: ClientUid,
    height: number
  ) => void;
}

export const HeightContext = React.createContext<SharedHeightContextInterface>({
  getHeights: (groupId: ClientUid, componentId: ClientUid) => ({}),
  pushHeight: (groupId: ClientUid, componentId: ClientUid, height: number) => {}
});

export const SharedHeightContainerContext = (props: PropsWithChildren<{}>) => {
  const [heightsDict, setHeightsDict] = useState(
    {} as Dict<ClientUid, Dict<ClientUid, number>>
  );
  const getHeights = (groupId: ClientUid, componentId: ClientUid) => {
    const groupeHeights = getOrNull(heightsDict, groupId);
    if (!groupeHeights) {
      return {};
    }
    return {
      groupHeight: dictValues(groupeHeights).sort(compareByNumber(i => -i))[0],
      componentHeight: getOrNull(groupeHeights, componentId)
    };
  };
  const pushHeight = (
    groupId: ClientUid,
    componentId: ClientUid,
    height: number
  ) => {
    const groupHeights = set(
      getOrNull(heightsDict, groupId) ?? ({} as Dict<ClientUid, number>),
      componentId,
      height
    );
    setHeightsDict(set(heightsDict, groupId, groupHeights));
  };
  return (
    <HeightContext.Provider value={{ getHeights, pushHeight }}>
      {props.children}
    </HeightContext.Provider>
  );
};
