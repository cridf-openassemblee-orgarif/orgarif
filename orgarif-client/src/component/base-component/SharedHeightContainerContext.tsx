/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { ClientUid } from '../../domain/client-ids';
import { compareByNumber } from '../../utils';
import { dict, Dict, dictValues, get, set } from '../../utils/nominal-class';

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
    const groupeHeights = get(heightsDict, groupId);
    if (!groupeHeights) {
      return {};
    }
    return {
      groupHeight: dictValues(groupeHeights).sort(compareByNumber(i => -i))[0],
      componentHeight: get(groupeHeights, componentId)
    };
  };
  const pushHeight = (
    groupId: ClientUid,
    componentId: ClientUid,
    height: number
  ) => {
    const groupHeights = set(
      get(heightsDict, groupId) ?? dict<ClientUid, number>(),
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
